var Home=Vue.component("home",{
    template:`<div class="home">
                    <Nav></Nav>
                    <div class="pic">
                    <img src="./img/flower.jpg" alt="">
</div>
                   
              </div>`
})
var Nav=Vue.component('Nav',{
    template:`<div class="nav">
                    <router-link :to="item.url" v-for="(item,key) in navData" :key="key" exact active-class="active">{{item.title}}</router-link>
                    <router-link to="/login" v-if="!islogin">login</router-link>
       
       <span v-if="islogin" class="info" @click="show">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout">退出</span>
       </span>
               </div>`,
    data(){
        return {
            navData:[
                {title:"首页",url:'/'},
                {title:"公司简介",url:"/info"},
                {title:"文档说明",url:"/doc"}
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})
var Info=Vue.component('info',{
    template:`<div>
<Nav></Nav>
<transition name="opacity" mode="out-in">
<router-view style="position: absolute;top:44px;left:0"></router-view>
</transition>
</div>`
})
var list=Vue.component("list",{
    template:`<div>
<ul class="mui-table-view">
	    <router-link to="/info/list/1"><li class="mui-table-view-cell mui-media">
	        <a href="javascript:;">
	            <img class="mui-media-object mui-pull-left" src="http://placehold.it/40x30 ">
	            <div class="mui-media-body">
	                幸福
	                <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
	            </div>
	        </a>
	    </li></router-link>
	    <router-link to="/info/list/2"><li class="mui-table-view-cell mui-media">
	        <a href="javascript:;">
	            <img class="mui-media-object mui-pull-left" src="http://placehold.it/40x30">
	            <div class="mui-media-body">
	                幸福
	                <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
	            </div>
	        </a>
	    </li></router-link>
	</ul>
</div>`
})
var listCon=Vue.component('listCon',{
    template:`<div>
{{$route.params.id}}
</div>`
})
var doc=Vue.component('doc',{
    template:`<div>
<Nav></Nav>
<router-view name="left" class="left"></router-view>
<router-view name="right" class="right"></router-view>
</div>`,
    beforeRouteEnter(to,from,next){

        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
})
var left=Vue.component('left',{
    template:`<div>
<ul>
<li>vue安装
<ul class="ul">
<router-link to="#one" tag="li">npm安装</router-link>
<router-link to="#two" tag="li">npm安装</router-link>
</ul>
</li>
<li>vue安装2
<ul class="ul">
<router-link to="#three" tag="li">npm安装2</router-link>
<router-link to="#four" tag="li">npm安装2</router-link>

</ul>
</li>
</ul>
</div>`,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({num:document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({num:document.querySelector('#'+hash).offsetTop}, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.num.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var right=Vue.component('right',{
    template:`<div>
<div class="top" id="one">1</div>
<div>1</div>
<div>1</div>
<div>1</div>
<div>1</div>
<div>1</div>
<div class="top" id="two">2</div>
<div>2</div>
<div>2</div>
<div>2</div>
<div>2</div>
<div>2</div>
<div class="top" id="three">3</div>
<div>3</div>
<div>3</div>
<div>3</div>
<div>3</div>
<div>3</div>
<div class="top" id="four">4</div>
<div>4</div>
<div>4</div>
<div>4</div>
<div>4</div>
<div>4</div>

</div>`
})
var login=Vue.component("login",{
    template:`
<div style="position: absolute;left: 0;top:0;">
<header class="mui-bar mui-bar-nav">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title">登录</h1>
</header>
<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>
		
			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div></div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc")
        }

    }

})