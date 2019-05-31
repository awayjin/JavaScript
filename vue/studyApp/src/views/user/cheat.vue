<template>
    <div class="box">
         <app-header :title='title' :rightObj="rightObj" :listFinish="finish"></app-header>
         <!-- 点确定按钮提交成功后显示遮罩层 -->
         <cheat-layer v-if="CheatLayer"></cheat-layer>


         <div class="boxCenter">
            <div class="name">
               <p class="name-line"><img class="user-img" src="../../assets/images/cheat/icon-errer.png" alt="">
                    <input class="cheat-user"  type="text" v-model="cheatUser" @input="checkUserLength" @compositionend="checkUserLength" @change="checkUserLength" placeholder="请输入作弊人姓名">
                </p>
            </div>

            <div class="say">
                <textarea class="cheat-desc" v-model="cheatDesc" @input="checkDescLength" @compositionend="checkDescLength" placeholder="说点什么吧！"></textarea>
            </div>
            <div class="potoho"><p>上传照片<span>&nbsp;&nbsp;(选填，可添加作弊现场图片,最多可选5张)</span></p></div>
            <div class="uploadImage">
                <div class="upload" v-for="(item,key) in imgList">
                    <img class="upload-img" :src="item.image" alt="" @click="previewImg(key)">
                    <img :src="deletepohto" class="del-img" @click="removeImg(key)">
                </div>
                <div class="upload addImg" @click="showChooseImg" v-show="imgList.length<5">
                    <input type="file" name="img" id="fimg" @change="addImage" accept="image/*" style="display:none">
                    <img src="../../assets/images/cheat/icon-addimges.png" alt="">
                    <!-- <span><img src="./imges/u1184.png" alt="" class="img1"><img src="./imges/u1186.png" alt="" class="img2"></span> -->
                    <span></span>
                </div>
            </div>
            <div></div>
            <div style=""></div>
            <div class="prompt">
                <p><span class="prompt-conter"><span>*</span><span>匿名举报，我们会对您的个人信息严格保密</span></span></p>
            </div>
            <div class="submit" @click="submit">
                <mt-button type="primary" size="large" class="submit-btn" style="font-size:0.34rem;
                font-weight:400;
                color:#fff;
                line-height:0.34rem;">提交</mt-button>
            </div>

         </div>


        <!-- 作弊举报遮罩层 -->
        <div v-if="showCheat">
            <div class="mint-msgbox cheat-bigbox" style="z-index: 999;" >
                <div class="mint-msgbox-header cheat-name">
                    <div class="mint-msgbox-title">{{showName}}</div>
                </div> <!---->
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " style="display: none;">取消</button>
                    <button class="mint-msgbox-btn mint-msgbox-confirm " @click="hiddenCheat">确定</button>
                </div>
            </div>
            <div class="v-modal" style="z-index: 998;"></div>
        </div>

         <div class="img-preview-wrap" v-show="showPreview" @click="hidePreview">
             <img id="img-preview" src="">
         </div>
    </div>
</template>
<script>

import AppHeader from "@/components/appHeader/AppHeader";
// 点确定按钮提交成功后显示遮罩层
import CheatLayer from "@/components/cheatlayer/CheatLayer";

import { Button } from 'mint-ui';
import { Toast, MessageBox } from 'mint-ui';
import request from "@/api/request";
import imgResizer from '@/utils/imgResizer';
//删除图片的照片。
import deletepohto from '../../assets/images/cheat/icon-deletepohto.png';
const IMG_RESIZE_QUALITY = 0.2; // 图片压缩质量因子
const TARGET_IMG_SIZE = 200 * 1024; // 图片大于200K需要压缩
const SCALE_RATIO = 2;

window.dealWithAndroidCapture = function(results) {
    //Toast("从android获取图片");
    //Toast(results.slice(0, 50));
    results = JSON.parse(results);
    let imgSrc = results.content;
    let base64DataLen = imgSrc.length - 22;
    let realDataLen = base64DataLen/3 * 4;
    if (realDataLen > window.cheatVueObj.$data.imgMaxSize) {
        Toast("图片大小不能超过5M");
        return;
    }

    /*let startIdx = results.indexOf('data')
    let replaceResult = results.slice(startIdx, -1)
    let endIdx = replaceResult.indexOf('\'') // eslint-disable-line
    let imgSrc = replaceResult.slice(0, endIdx)*/

    if (imgSrc.length > TARGET_IMG_SIZE) { // 大于200K需要压缩
        imgResizer.resize(imgSrc, {quality: IMG_RESIZE_QUALITY, maxLen: TARGET_IMG_SIZE}, function(base64Data){
            // console.log("压缩后:", base64Data.length/1024);
            let imgList = window.cheatVueObj.$data.imgList;
            if (window.cheatVueObj.checkImgExists(base64Data)) {
                return false;
            }

            window.cheatVueObj.$data.imgList.push({
                image: base64Data,
                showClose: false
            });
        });
    } else {
        if (window.cheatVueObj.checkImgExists(imgSrc)) {
            return false;
        }
        window.cheatVueObj.$data.imgList.push({
            image: imgSrc,
            showClose: false
        });
    }

    // window.cheatVueObj.$data.imgList.push({
    //     image: imgSrc,
    //     showClose: false
    // });
};

window.dealWithAndroidCaptureError = function() {
    Toast("选择图片失败");
};

export default {
    data(){
        return {
            title:'作弊举报',
            cheatUser: '',
            cheatDesc: '',

            imgMaxSize: 5 * 1024 * 1024, // 单张图片最大5M
            imgList: [],
            isSaving: false,

            // 需要添加图片的目标
            targetObj: '',

            deletepohto: deletepohto,
            CheatLayer:false, // 点确定按钮提交成功后显示遮罩层
            showPreview: false, // 是否显示图片预览

            showCheat:false,//遮罩层显示
            showName:'',//z遮罩名字
            rightObj: {
                isMore: false,
                icon: ''
            }
         }
    },
    components : {
      AppHeader,
      CheatLayer
    },
    mounted() {
        window.cheatVueObj = this;
        this.init();
    },
    destroyed() {
        window.cheatVueObj = null;
    },
    // beforeRouteLeave (to, from, next) {
    //   if (to.name == 'Home') {
    //     to.meta.isUseCache = true;
    //   }
    //   next();
    // },
    methods:{
        hiddenCheat(){
            this.showCheat=false;
        },
        init() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        },
        checkDescLength() {
            if (this.cheatDesc.length > 200) { // 不超过200个字
                this.cheatDesc = this.cheatDesc.substr(0, 200);
            }
        },
        computeLength(s, maxLen) {
            // console.log("computeLength");
            let len = 0, maxLenPos = 0;
            let newStr = '';
            for(let i=0; i<s.length; i++) {
                let isCn = s.charCodeAt(i)>128 ? true : false;
                if (isCn) {
                    len += 2;
                } else {
                    len += 1;
                }

                if (len <= maxLen) {
                    newStr += s[i];
                }

                // if (maxLenPos == 0 && len > maxLen) {
                //     maxLenPos = i;
                // } else if ( maxLenPos == 0 && len == maxLen) {
                //     maxLenPos = i+1;
                // }
            }
            return [len, newStr];
        },
        checkUserLength() {
            let maxLen = 40;
            let [len, newStr] = this.computeLength(this.cheatUser, maxLen);
            // console.log("len=", len);
            // console.log("maxLenPos:", newStr);
            if (len > maxLen) {
                this.cheatUser = newStr; //this.cheatUser.substr(0, maxLenPos);
            }
        },
        showChooseImg() {
            if (this.imgList.length >= 5) {
                Toast("最多上传5张图片");
                return;
            }

            if (/android/i.test(navigator.userAgent)) {
                this.getCapture();
            }
            document.getElementById('fimg').click();
        },
        checkImgExists(base64Data) { // 检查图片是否已经存在
            let imgList = this.imgList;
            for(let i=0; i<imgList.length; i++) {
                if (imgList[i].image == base64Data) { // 检查图片是否重复
                    Toast("该图片已存在");
                    return true;
                }
            }
            return false;
        },
        addImage($event) { // IOS下的获取上传图片
            //console.log($event);
            let ele = $event.target;
            if (ele.files.length > 0) {
                if (this.imgList.length + ele.files.length > 5) {
                    Toast("最多上传5张图片");
                }
                let len = Math.min(5 - this.imgList.length, ele.files.length);
                for(let i=0; i<len; i++) {
                    let file = ele.files[i];
                    if (file.length > this.imgMaxSize) {
                        Toast("单张图片不能超过5M");
                        return;
                    }

                    let fileReader = new FileReader();
                    let self = this;
                    fileReader.onload = function(e) {
                        let imgData = e.target.result;

                        if (imgData.length > TARGET_IMG_SIZE) { // 大于200K需要压缩
                            // 第一次压缩
                            imgResizer.resize(imgData, {quality: IMG_RESIZE_QUALITY, maxLen: TARGET_IMG_SIZE}, function(base64Data){
                                // console.log("压缩后:", base64Data.length/1024);
                                if (self.checkImgExists(base64Data)) {
                                    return false;
                                }

                                if (base64Data.length <= TARGET_IMG_SIZE) {
                                    self.imgList.push({
                                        image: base64Data,
                                        showClose: false
                                    });
                                } else {
                                    Toast("图片太大，请选择小一点的图片");
                                }
                            });
                        } else {
                            if (self.checkImgExists(imgData)) {
                                return false;
                            }
                            self.imgList.push({
                                image: imgData,
                                showClose: false
                            });
                        }

                        ele.value = '';
                    };

                    fileReader.readAsDataURL(file);
                }
            }
        },
        showClose(index) {
            this.imgList[index].showClose = !this.imgList[index].showClose;
        },
        previewImg(index) { // 预览图片
            let imgData = this.imgList[index].image;
            let imgEle = document.getElementById('img-preview');
            imgEle.src = imgData;

            this.showPreview = true;
        },
        hidePreview() { // 关闭预览
            this.showPreview = false;
            document.getElementById('img-preview').src = '';
        },
        removeImg(index) { // 删除图片
            this.imgList.splice(index, 1);
        },
        closeApp () {
          // 关闭调App接口
          let closeObj = {
            'method': 'closeWeb',
            'content': '',
            'success': '',
            'error': ''
          }
          window.location = '/native_service?data=' + JSON.stringify(closeObj)
        },
        // android拍照，调用app 接口
        getCapture (target) {
          var codeObj = {
            'method': 'toCapture',
            'content': '',
            'success': 'dealWithAndroidCapture',
            'error': 'dealWithAndroidCaptureError'
          }
          // codeObj
          this.targetObj = target
          window.location = '/native_service?data=' + JSON.stringify(codeObj)
        },
        cameraErr() {
            Toast("调用android拍照出错");
        },
        // 拍照成功回调
        cameraPic (results) {
          let img = new window.Image()
          // let target = this.targetObj
          // let loading = $('.loading-fm')
          this.imgList.push({
              image: results,
              showClose: false
          });
          return;

          let startIdx = results.indexOf('data')
          let replaceResult = results.slice(startIdx, -1)
          let endIdx = replaceResult.indexOf('\'') // eslint-disable-line
          let imgSrc = replaceResult.slice(0, endIdx)
          // 处理图片
          img.src = imgSrc
          // let _html = `<div class="img-wrap">
          //         <span class="f-close"  onclick="FMA.removeImg(this)"><strong class="remove"></strong></span>
          //         <span>< img class="img-tmp" src="${imgSrc}"></span>
          //       </div>`
          // target.parent.find('.for-img').append(_html)
          /* eslint-disable */
          let _html = `<span onclick="FMA.removeImg(this)"></span>
                        < img src="${imgSrc}" onclick="FMA.imgBig(this)">`
          let li = document.createElement('li')
          li.innerHTML = _html
          li.classList.add('add-img')
          let picArrList = document.getElementById('picArrList')
          picArrList.appendChild(li)

          if (picArrList.children.length >= 3) {
            document.querySelector('.add_img').style.display = 'none'
          }
        },
        submit(){
            if (this.isSaving) {
                return false;
            }

            let cheatUser = this.cheatUser.replace(/^\s+/, '').replace(/\s+$/, '');
            if (cheatUser == '') {
                // MessageBox({
                //     title:'请输入作弊人姓名',
                //     confirmButtonText:'确定',
                //     showCancelButton: false,
                //     cancelButtonHighlight:true,
                //     confirmButtonHighlight:true,
                // });
                this.showName='请输入作弊人姓名';
                this.showCheat=true;
                return;
            }

            let arr = this.computeLength(cheatUser, 40);
            cheatUser = arr[1];

            let cheatDesc = this.cheatDesc.replace(/^\s+/, '').replace(/\s+$/, '');
            if (cheatDesc == '') {
                // MessageBox({
                //     title:'请输入作弊描述',
                //     confirmButtonText:'确定',
                //     showCancelButton: false,
                //     cancelButtonHighlight:true,
                //     confirmButtonHighlight:true,
                // });
                this.showName='请输入作弊描述';
                this.showCheat=true;
                return;
            }

            this.isSaving = true;
            let imgArr = [];
            let totalLen = 0;
            for(let i=0; i<this.imgList.length; i++) {
                imgArr.push(this.imgList[i].image);
                totalLen += this.imgList[i].image.length;
            }
            //alert('totalsize:' + totalLen/1024);
            let params = {
                cheatName: cheatUser,
                cheatCondition: cheatDesc,
                imgArr: imgArr
            };

            let self = this;

            request.reportCheat(params).then((data) => {
                if (data.code == 200) {
                   // Toast("提交成功");
                    //点确定按钮提交成功后显示遮罩层
                    this.CheatLayer=true;
                    setTimeout(function(){
                        this.CheatLayer = false;
                        self.$router.go(-1);
                    }, 2000);

                } else {
                    // MessageBox({
                    //     title:'提交失败',
                    //     confirmButtonText:'确定',
                    //     showCancelButton: false,
                    //     cancelButtonHighlight:true,
                    // });
                    this.showName='提交失败';
                    this.showCheat=true;
                }
                self.isSaving = false;
            });
            setTimeout(function(){
                self.isSaving = false;
            }, 3000);
        },
        finish() {},
    }
}
</script>
<style>
    /* 修改message-box模态窗样式 */
    .mint-msgbox.cheat-bigbox{
        border-radius: 0.16rem !important;
    }
    .mint-msgbox-header.cheat-name {
        padding: 0.5rem 0 0.5rem 0 !important;
        border-bottom:0.01rem solid #f2f2f2!important;
    }
    .mint-msgbox-title{
        font-size:0.32rem !important;
        font-weight:400 !important;
        color:#444 !important;
        line-height:0.32rem !important;
    }
    .mint-msgbox-confirm{
        font-size:0.32rem !important;
        font-weight:400 !important;
        color:#5480FE !important;
        line-height:0.44rem !important;
        /* border-top:0.01rem solid #f2f2f2; */
    }
    .mint-msgbox-btns{
        line-height: 0.44rem !important;
        height: 0.86rem !important;
    }
</style>

<style  scoped>




    .box{
        /* width: 100%; */
        height: 100%;
        background: #fbfcf9;

    }
    .body-height{
         width: 100%;
         height: 100%;
         background: #fbfcf9 !important;
    }
    .header-title{
        /* width:1.36rem;
        height:0.34rem; */
        font-size:0.35rem;
        font-family:PingFangSC-Regular;
        font-weight:700;
        color:rgba(68,68,68,1);
        line-height:0.35rem;
    }
    .boxCenter{
        /* position: relative;
        top: 0.88rem; */
        padding: 0.92rem 0.24rem 0rem 0.24rem;
        background: #fff;
    }
    .name{
        /* padding: 0.32rem; */
        margin-top: 0.24rem;
        display: flex;
        align-items: center;
        background:rgba(255,255,255,1);
        border-radius:0.1rem;
        border:1px solid  #f2f2f2 ;
        padding-left: 0.24rem;
        padding-top: 0.28rem;
        padding-bottom: 0.28rem;
        margin-bottom: 0.24rem;
    }
    .name p img{
        width:0.32rem;
        height:0.32rem;
        background:rgba(255,255,255,1);
        /* border:0.01rem solid rgba(151,151,151,1); */
        margin-right: 0.16rem;
        border-radius: 50%;
        position: relative;
        top: 0.04rem;

    }
    .name p{
        font-size:0.32rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        color:rgba(68,68,68,1);
    }
    .say{
        height: 3.76rem;
        margin: 0rem 0rem 0.32rem 0rem;
        border: 1px solid #f2f2f2;
        border-radius: 0.1rem;
    }
    .potoho{
        /* padding-left:0.24rem; */
        /* padding-top: 0.24rem;  */
    }
    .potoho p{
        width:100%;
        height:0.28rem;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:500;
        color:rgba(68,68,68,1);
        line-height:0.28rem;

    }
    .potoho p span{
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
    }
    .uploadImage{
        /* padding-left: 0.32rem; */
        padding-top: 0.2rem;
        /* float: left; */
    }
    .upload {
        position: relative;
        display: inline-block;
        width: 1.16rem;
        height: 1.16rem;
        margin-right: 0.1rem;
        /* float: left; */
    }
    .upload>img{
        width: 100%;
        height: 100%;
        /* margin-left:0.1rem; */
        margin-top:0.05rem;
        /* margin-bottom:0.05rem; */
    }
    .upload > .del-img {
        position: absolute;
        font-size: 0.25rem;
        height: 0.3rem;
        width: 0.3rem;
        right: -0.1rem;
        top: -0.1rem;
        line-height: 0.25rem;
        text-align: center;
        border-radius: 50%;
        color: #fff;
    }
    .upload .upload-img {
        /* pointer-events: none; */
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    }

    .addImg{
        width: 1.16rem;
        height: 1.16rem;
        background:rgba(255,255,255,1);
        /* border-radius:8px;
        border:0.04rem solid rgba(232,232,232,1); */
        /* margin-left: -0.1rem; */
        position: relative;
    }
    .prompt{
        margin-top: 0.005rem;
        /* padding-left: 0.3rem; */
        padding-bottom: 0.32rem;
    }
    .prompt p{
        /* padding: 0rem 0rem 0.32rem 0.24rem; */
        /* float: left; */
        line-height: 0.1rem;
    }
    .prompt p span:nth-child(1){
        color: red;
        font-size:0.24rem;
    }
    .prompt p span:nth-child(2){
        height:0.24rem;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.24rem;
    }
    .prompt-conter{
        /* margin-left: -1.3rem;
        position: absolute;
        bottom: 4.6rem; */
    }
    textarea::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    .submit{
        padding: 0.4rem 0rem 1.2rem 0rem;
        background: #fbfcf9;
    }

    .user-img {
        /* vertical-align: middle; */
        /* margin-top: 0.1rem; */
        /* position: relative;
        top: 0.05rem; */

    }
    .name-line {
        width: 100%;
        display: flex;
    }
    .cheat-user {
        width: 100%;
        border: none;
        font-size:0.32rem;
        font-weight:500;
        color:rgba(68,68,68,1);
        line-height: 0.32rem;
    }
    .cheat-desc {
        width: 100%;
        height: 100%;
        outline: none;
        resize: none;
        border:none;
        border-radius: 0.1rem;
        padding: 0.2rem;
        box-sizing: border-box;
        border-color: red;
        font-size:0.28rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(151,151,151,1);
        line-height:0.28rem;
    }
    .cheat-desc:focus {
        outline: none;
    }
    .submit-btn{
         border-radius:0.5rem;
         background:linear-gradient(135deg,rgba(126,209,255,1) 0%,rgba(84,128,254,1) 100%);
         background:-webkit-gradient(linear,0deg 135deg,0deg 0deg,rgba(126,209,255,1) ,to rgba(84,128,254,1));
         box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
        -webkit-box-shadow: 0rem 0.05rem 0.1rem 0rem #bbccff;
        height: 0.88rem;
    }
    input::-webkit-input-placeholder {
        font-size:0.32rem;
        font-weight:400;
        color:#979797;
        line-height:0.45rem;
    }
    input::-moz-input-placeholder {
        font-size:0.32rem;
        font-weight:400;
        color:#979797;
        line-height:0.32rem;
    }
    #app-header-content{
        border-bottom:none !important;
    }

    .img-preview-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        padding: 1.5rem 0;
        z-index: 1000;
        height: 100%;
        width: 100%;
        background-color: #000;
    }
    #img-preview {
        align-self: center;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
    }
</style>
