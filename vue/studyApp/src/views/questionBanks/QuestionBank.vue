<template>

	<div class="question">
		<header data-v-7ba5bd90="" class="mint-header" fixed>
			<div class="mint-header-button is-left">
				<router-link to="/" slot="left">
					<mt-button icon="back"></mt-button>
				</router-link>
			</div>
			<h1 class="mint-header-title">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">答题模式</mt-tab-item>
					<mt-tab-item id="2">背题模式</mt-tab-item>
				</mt-navbar>
			</h1>
			<mt-button slot="right"><span @click="handleClick">全部题型<img src="../../assets/images/txsjx.png" /></span></mt-button>
		</header>
		<div style="height:50px;width:100%;"></div>
		<mt-popup
			v-model="popupVisible"
			position="top"
			modal=false>
			<ul class="qbtx">
				<li v-for="(gameName,index1) in gameNames" :class="{active: activeName == gameName}" @click="selectedFn(gameName)" :keys='index1'>
					{{gameName.label}}
				</li>
			</ul>
		</mt-popup>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<mt-swipe :auto="0" @change="handleChange" :show-indicators="false" :continuous="false">
					<!-- <mt-swipe-item v-for="item in items" :key="item.id">
						<a :href="item.href">
						<img :src="item.url" class="img"/>
						<span class="desc">{{item.title}}</span>
						</a>
					</mt-swipe-item> -->
					<mt-swipe-item><!-- v-for="(item,topicIndex) in topic" -->
						<div class="tk">
							<div class="tk_txt">
								<!-- <span class="title_active" v-show="item.questionType == 0">全部题型</span>
								<span class="title_active" v-show="item.questionType == 1">单选题</span>
								<span class="title_active" v-show="item.questionType == 2">多选题</span>
								<span class="title_active" v-show="item.questionType == 3">判断题</span>
								<span class="title_active" v-show="item.questionType == 4">填空题</span> -->
								<span>222222</span>
								<!-- <img src="../assets/images/ft1.png" /> -->
							</div>
							<div class="tk_m">
								<ul>
									<li v-for="(item,index) in tm" ref="liId" @click="pitchOn(item,index,$event)" :keys='index'>
										<span class="span_xh">
											<b>{{item.value}}</b>
											<b class="span_img span_img1"><img src="../../assets/images/correct.png" /></b>
											<b class="span_img span_img2"><img src="../../assets/images/mistake.png" /></b>
										</span>
										<span>{{item.label}}</span>
										<!-- <em><img src="../assets/images/ft1.png" /></em> -->
									</li>
								</ul>
							</div>
						</div>
					</mt-swipe-item>
					<mt-swipe-item><!-- v-for="(item,topicIndex) in topic" -->
						<div class="tk">
							<div class="tk_txt">
								<!-- <span class="title_active" v-show="item.questionType == 0">全部题型</span>
								<span class="title_active" v-show="item.questionType == 1">单选题</span>
								<span class="title_active" v-show="item.questionType == 2">多选题</span>
								<span class="title_active" v-show="item.questionType == 3">判断题</span>
								<span class="title_active" v-show="item.questionType == 4">填空题</span> -->
								<span>111111111111</span>
								<!-- <img src="../assets/images/ft1.png" /> -->
							</div>
							<div class="tk_m">
								<ul>
									<li v-for="(item,index) in tm" ref="liId" @click="pitchOn(item,index,$event)" :keys='index'>
										<span class="span_xh">
											<b>{{item.value}}</b>
											<b class="span_img span_img1"><img src="../../assets/images/correct.png" /></b>
											<b class="span_img span_img2"><img src="../../assets/images/mistake.png" /></b>
										</span>
										<span>{{item.label}}</span>
										<!-- <em><img src="../assets/images/ft1.png" /></em> -->
									</li>
								</ul>
							</div>
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
					<mt-swipe :auto="0" @change="handleChange" :show-indicators="false" :continuous="false">

					</mt-swipe>
			</mt-tab-container-item>
		</mt-tab-container>
		<div style="clear:both;"></div>
		<section class="whjl">
			<div class="answer">
				答案：
				<em>C</em>
			</div>
			<router-link to="/maintenanceRecord">
				<span style="color:#666;">维护记录</span>
				<i class="mint-cell-allow-right"></i>
			</router-link>
		</section>
		<section class="xyt" style="width:100%;margin-top:10%;padding-bottom:0.8rem;">
			<mt-button type="primary">下一题</mt-button>
		</section>
		<div style="width:100%;height:0.46rem;"></div>
		<footer class="footer">
			<ul>
				<li>
					<span >
						<span style="width:50px;display:block"><em>1</em></span>
						<span style="width:50px;display:block"><em>/100</em></span>
					</span>
				</li>
				<li style="flex-basis: 25%;display: flex;justify-content: space-between;">
					<span>
						<img src="../../assets/images/ft_zq.png" />
						<b style="color:#5480FE">0</b>
					</span>
					<span>
						<img src="../../assets/images/ft_cw.png" />
						<b style="color:#F46060">0</b>
					</span>
				</li>
				<li>
					<router-link to="/reportError">
						<span>
							<img src="../../assets/images/bc.png" />
							<b style="color:#666;top:-0.04rem;">报错</b>
						</span>
					</router-link>
				</li>
			</ul>
		</footer>
	</div>

</template>

<script type="text/babel">
//业务逻辑
	export default {
		components:{
		},
		data () {
			return {
				selected: '1',
				popupVisible:false,
				gameNames: [{
					label:'全部题型',value:'0'
					}, {
					label:'单选题',value:'1'
					}, {
					label:'多选题',value:'2'
					}, {
					label:'判断题',value:'3'
					}, {
					label:'填空题',value:'4'
				}],
				tm:[{
					label:'36°',value:'A'
				},{
					label:'37°',value:'B'
				},{
					label:'38°',value:'C'
				},{
					label:'39°',value:'D'
				}],
				activeName: '',
				//选中答案对错
				activeTm:'',
				isA: true,
				isB: false,
				isC: false,
				activeShow:true,
				numerica:[],
				topic: [],
				showHide:'',
				//答题对错数量统计传参
				fieldId:'1035011567086211073',
				questionType:'1',
				//当前批次号
				currentBatchNo:'',
			}
		},watch:{
			selected(val,oldVal){
				// console.log(val);
				this.selected = val;
			},
		},
		created(){
			//this.isCounter();

			// this.questionBank();
			//this.init();

		},
		methods:{

			questionBank(currentBatchNo) {
				// 获取题库试题
				this.$http({
				url:'/bank/tkQuestion/page/list',
				method:'get',
				params:{
					fieldId:'1035011567086211073',  //题库ID
					limit:'100',   //分页大小
					page:'1',    //分页号
					batchNo:'',  //用户当前题目ID
					access_token:"QYfHtn79uG4mJYhB9vjsDeMTzpQHYd",

				}
				}).then((res) => {
					// console.log('222222',res)
					// for(let i=0; i < res.data.records.length; i++){
						// console.log(JSON.parse(res.data.records[i].content).title)
					//	res.data.records[i].content.title =  res.data.records[i].content.title)
					// }
					this.topic = res.data.records;

					// var c = ['{"title":"每天___上班，___下班","titleImgList":[],"choiceList":[]}']
					// console.log('c',JSON.parse(c[0]).title)
				})
				.catch((error) => {
					// console.log(error);
				});
			},
			isCounter(){
				//答题对错数量统计接口
				this.$http({
				url:`/bank/tkBatch/currentBatchStatisticsByUserId/${this.fieldId}/${this.questionType}`,
				method:'get',
				params:{
					'access_token':"QYfHtn79uG4mJYhB9vjsDeMTzpQHYd",
					'x-client':'app',
				}
				}).then((res) => {
					// debugger
					// console.log(res)
					this.currentBatchNo=res.data.currentBatchNo;
					//this.questionBank(this.currentBatchNo);
				})
				.catch((error) => {
					// console.log(error);
				});
			},
			selectedFn(gameName) {
				// console.log(gameName.label)
				// console.log(gameName.value)
				this.activeName = gameName;
				this.popupVisible = false;
			},
			handleClick() {
				this.popupVisible = this.popupVisible?false:true;
			},
			handleChange(index) {
				// console.log(index)
			},
			//答题对错选中
			pitchOn(item,index,event){
				// console.log(this.$refs.liId[index].className.length)
				// this.activeTm = item.value
				if(this.$refs.liId[index].className.length <= 0){
					//首先先判断当前li有没有被选中，因为我这里li除了选中状态的有类名，其他没有类名，所以我就这么判断了。
					//这么看有时候舍弃一小丢丢规范的东西反而省力。
					this.showHide = 1;
					this.$refs.liId[index].className = 'activeOn1';// 添加类
					// event.currentTarget.children[0].innerHTML = ''; // 清空文字
				}else{
					//当前li已经被选中，那么在多选的逻辑里，是允许人们选中后再取消选中的，所以前端展示层面上把样式去掉。
					this.showHide = 2;
					this.$refs.liId[index].className = 'activeOn2';// 选中再取消的情况


				}
			},

		}

	}
</script>
<style scoped>

	.question{
		background:#fff;
	}
	.qbtx .active{
		background:linear-gradient(#7ED1FF,#5480FE);
		color:#fff;
	}
	.mint-header{
      height:50px;
      background:#fff;
    }
    .mint-header{
      color:#666;
    }
	.mint-navbar .mint-tab-item.is-selected{
		background:linear-gradient(#7ED1FF,#5480FE);
		color:#fff;
	}
	.mint-navbar{
		height:0.32rem;
		border-radius:0.05rem;
		overflow: hidden;
		border:1px solid #E8E8E8;
		width:1.56rem;
	}
	.qbtx{
		background:#fff;
		width:100%;
		padding:0.12rem 0.1rem;
	}
	.qbtx li{
		float:left;
		margin:0.1rem;
		background:#E7EDFF;
		border-radius:0.25rem;
		padding:0.1rem 0.15rem;
	}
	.mint-popup-top{
		width:100%;
		left:49.8%;
		top:0.5rem;
	}
  .mint-swipe {
	overflow:visible;
	min-height:3.7rem;
	overflow-y: scroll;
  }
  .mint-swipe>img {
    width: 100%;
  }
  .tk{
	  padding:0.2rem;
  }
  .tk_txt{
	  font-size:0.16rem;
	  color:#000;
  }
  .tk_txt .title_active{
	color:#5480FE;
	font-size:0.1rem;
	border:1px solid #5480FE;
	border-radius:0.2rem;
	padding:0 0.06rem;
  }
  .tk_txt img{
	  width:100%;
	  height:1rem;
	  overflow:hidden;
  }
  .tk_m ul li{
	  margin-top:0.3rem;
	  overflow: hidden;
  }
  .tk_m ul li span{
	  font-size:0.2rem;
	  color:#444;
	  float:left;
	  margin-left:0.06rem;
  }
  .tk_m ul li em{
	  width:1rem;
	  height:1rem;
	  overflow: hidden;
	  display: inline-block;
  }
  .tk_m ul li .span_xh{
	  border-radius:50%;
	  border:1px solid #444;
	  width:0.28rem;
	  height:0.28rem;
	  line-height:0.28rem;
	  text-align:center;
	  display:inline-block;
	  position: relative;
	  overflow: hidden;
  }

  .tk_m ul li .span_xh .span_img{
	  width:100%;
	  z-index:2;
	  display: none;
  }
  .whjl{
	  text-align:right;
	  position:relative;
	  padding-right:0.1rem;

  }
  .whjl span{
	  margin-right:0.2rem;
  }
  .whjl i{
	position: absolute;
    right: 0.15rem;
    top: 9px;
  }
  .mint-tab-container{
	  overflow:visible;
  }

  /* 以下是选中效果 */
  .tk_m .activeOn1 .span_xh b{
	  position:absolute;
	  left: 0rem;
  }
  .tk_m .activeOn1 .span_xh .span_img1{
	background:linear-gradient(#7ED1FF,#5480FE);
	display:block;
  }
  .tk_m .activeOn1 .span_xh{
	  border:1px solid #fff;
  }


  .tk_m .activeOn2 .span_xh b{
	  position:absolute;
	  left: 0rem;
  }
  .tk_m .activeOn2 .span_xh .span_img2{
	background:linear-gradient(#FB9A9A,#F46060);
	display:block;
  }
  .tk_m .activeOn2 .span_xh{
	  border:1px solid #fff;
  }

  /* 以上是选中效果 */
  .footer{
	  width:100%;
	  height:0.44rem;
	  border-top:1px solid #E8E8E8;
	  position:fixed;
	  bottom:0px;
	  padding:0 0.15rem;
	  background:#fff;
  }
  .footer ul{
	  display:flex;
	  justify-content:space-between;
	  align-items:center;

  }
  .footer ul li{
	  line-height:0.44rem;
  }
  .footer ul li:nth-child(1){
	  flex-basis:30%;
  }
  .footer ul li:nth-child(1) span{
	border:1px solid #E8E8E8;
	border-radius:0.25rem;
	padding:0.03rem 0.1rem;
  }
  .footer ul li em{
	  font-size:0.14rem;
  }
  .footer ul li:nth-child(1) em{
	  color:#444;
  }
  .footer ul li:nth-child(1) em:nth-child(2){
	  color:rgb(161, 161, 161);
  }
  .footer ul li span b{
	position: relative;
    top: -0.02rem;
	font-size:0.14rem;
  }
  .answer{
	  float:left;
	  margin-left:0.2rem;
	  font-size:0.16rem;
	  color:#444;
  }
  .answer em{
	  color:#5480FE;
  }
  .xyt .mint-button--normal{
	  background:-webkit-linear-gradient(left,#7ED1FF 30%,#5480FE);
	  width:1.64rem;
	  text-align: center;
	  height:0.44rem;
	  font-size:0.16rem;
	  border-radius:0.22rem;
  }
  .xyt{
	  text-align: center;
  }











/* <mt-tab-container-item id="1">
				<mt-swipe :auto="0" @change="handleChange" :show-indicators="false" :continuous="false">
					<!-- <mt-swipe-item v-for="item in items" :key="item.id">
						<a :href="item.href">
						<img :src="item.url" class="img"/>
						<span class="desc">{{item.title}}</span>
						</a>
					</mt-swipe-item> -->
					<mt-swipe-item>
						<div class="tk">
							<div class="tk_txt">
								<!-- <span class="title_active" v-show="item.questionType == 0">全部题型</span>
								<span class="title_active" v-show="item.questionType == 1">单选题</span>
								<span class="title_active" v-show="item.questionType == 2">多选题</span>
								<span class="title_active" v-show="item.questionType == 3">判断题</span>
								<span class="title_active" v-show="item.questionType == 4">填空题</span> -->
								<span>指挥中心、电话机房、发电机房、消防控制室、电   梯机房、电脑机房、等重要的设备房内应悬挂干湿温度计。室内环境温度应控制在（ ）以下，相对湿度80％以下。</span>
								<!-- <img src="../assets/images/ft1.png" /> -->
							</div>
							<div class="tk_m">
								<ul>
									<li v-for="(item,index) in tm" ref="liId" @click="pitchOn(item,index)">
										<span class="span_xh" @click="spanOn(index)">{{item.value}}</span>
										<span>{{item.label}}</span>
										<!-- <em><img src="../assets/images/ft1.png" /></em> -->
									</li>
								</ul>
							</div>
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</mt-tab-container-item> */





</style>
