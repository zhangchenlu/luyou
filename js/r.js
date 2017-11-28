const router=new VueRouter({
    linkActiveClass:"active",
    routes:[
        {path:"/",component:Home},
        {path:"/info",component:Info,children:[
            {path:"",component:list},
            {path:"list/:id",component:listCon}
        ]},
        {path:"/doc",component:doc,children:[
            {path:"",components:{left:left,right:right}},
        ]},
        {path:"*",redirect:'/'},
        {path:"/login",component:login}
    ]
})