<template>

    <div class="repor">
        <header data-v-7ba5bd90="" class="mint-header mint-header-css"  fixed>
            <div class="mint-header-button is-left">
                <router-link to="/questionBank" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </div>    
            <h1 class="mint-header-title">
                试题报错
            </h1>
            <mt-button slot="right"><span @click="announcementFn"><router-link to="/proclamation"><img src="../../assets/images/stbc.png" /></router-link></span></mt-button>
        </header>
        <section class="stbc_wrap">
            <p>错误类型</p>
            <div class="stbc_type">
                <mt-button @click="selectedFn(item)" :class="{active: activeName == item}" type="primary" v-for="(item,index) in errorType" :key='index'>{{item.label}}</mt-button>
            </div>
            <mt-field label="" :attr="{ maxlength: 20}" placeholder="请描述试题错误的内容，并给予修改意见" type="textarea" rows="6" v-model="introduction"></mt-field>
            <section class="xyt" style="width:100%;margin-top:10%;">
                <mt-button v-if="buttonDisplay" type="primary" @click = "submitFn">提交</mt-button>
                <mt-badge v-else type="warning">提交</mt-badge>
            </section>
        </section>
    </div>

</template>
<script>
    
    export default{

        data(){
            return{
                activeName:'',
                errorType:[{
                    label:'题干错误',value:'1',
                },{
                    label:'选项有误',value:'2',
                },{
                    label:'答案有误',value:'3',
                },{
                    label:'题目过时',value:'4',
                }],
                
                submitArr:{},
                isSuccess:'',
                state:'',
                buttonActive:'999',
                buttonDisplay:false,
                introduction:'',
            }
        },
        computed:{
            wordCount(){
                if(this.buttonActive != '999' && this.introduction.length >= 10){
                    this.buttonDisplay = true;
                    //console.log('2222',this.introduction)
                    //console.log('length',this.introduction.length)
                }else{
                    this.buttonDisplay = false;
                }
            }
        },
        watch:{
            wordCount(){
                
            }
            
        },
        methods:{
            selectedFn(gameName){
                //console.log(gameName.label)
                //console.log(gameName.value)
                this.activeName = gameName;
                this.buttonActive = gameName.value;
                
            },
            submitFn() {
                let arr = {
                    description:"Ceshi",
                    fieldId:"3",
                    questionId:"3",
                    questionCode:"3",
                    errType:"3",
                    reportType:"3",
                    identityName:"name",
                    identityId:"1"
                }
                this.submitArr = arr;
                this.$http({
                url:'/tkErrorReport',
				method:'post',
				data:{
                    description:"Ceshi",
                    fieldId:"3",
                    questionId:"3",
                    questionCode:"3",
                    errType:"3",
                    reportType:"3",
                    identityName:"name",
                    identityId:"1"
                }
				}).then((res) => {
                    this.state = res.data.code;
                    this.$messagebox.confirm('', {    
                        message: '确定提交？', 
                        confirmButtonText: '确定', 
                        cancelButtonText: '取消' 
                    }).then(action => { 
                        if (action == 'confirm') {     //确认的回调   
                            this.$router.push({name: 'successfully', params: {paicheNo: this.state}})                                         
                        }
                    }).catch(err => { 
                        if (err == 'cancel') {     //取消的回调

                        } 
                    });
				})
				.catch((error) => {
					//console.log(error);
                });

                    

            },
            announcementFn(){
                
            }
            
        },
        created() {
            
        },
        mounted(){
            
        }

    }
</script>

<style scoped>
    @import "../../assets/css/reportError.css";
    .repor > .mint-header-css.mint-header{
        z-index:1;
    }
    .mint-header{
      height:50px;
      background:#fff;
      top:0px;
    }
    .mint-header{
      color:#666;
    }
    .mint-header-button{
        flex:0;
    }
    .stbc_wrap{
        margin-top:0.6rem;
    }
    .stbc_wrap p{
        font-size:0.16rem;
        color:#444;
        margin:0.1rem 0.12rem;
    }
    .mint-button--primary{
        background:#E7EDFF;
        font-size:0.14rem;
        color:#444;
        border-radius:0.2rem;
        height:0.38rem;
        width:0.96rem;
        margin-left:0.2rem;
        margin-bottom:0.2rem;
    }
    .active{
        background:#5480FE;
        color:#fff;
    }
    .mint-field-core{
        font-size:0.12rem;
    }
    .mint-cell:last-child{
        background-image:none;
    }
    .mint-cell-wrapper{
        background-image:none;
    }
    .xyt .mint-button--normal,.mint-badge.is-warning{
        background:-webkit-linear-gradient(left,#7ED1FF 30%,#5480FE);
        width:94%;
        text-align: center;
        height:0.44rem;
        font-size:0.16rem;
        border-radius:0.22rem;
        color:#fff;
        margin-left:0px;
        
    }
    .mint-badge.is-warning{
        box-sizing: border-box;
        line-height: 0.42rem;
        background:#ccc;
    }
    .xyt{
        text-align: center;
    }
    .v-modal{
        top:0px !important;
    }
</style>