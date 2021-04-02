const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser') //post请求获取路由参数
const app = new Koa() 

app.use(bodyParser())

//添加路由
router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
})

router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})

//修改测试
router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})


//读取get传值
router.get('/news', async (ctx, next) => {

    //通过ctx获取
    console.log(ctx.query);
    console.log(ctx.querystring);

    //通过request获取

    ctx.response.body = '<h1>新闻</h1>'
})

//动态路由获取
router.get('/package/:id', async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = '<h1>package</h1>'
})

//增加返回表单页面的路由

router.get('/user', async (ctx, next) => {
                ctx.response.body =
                    `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码"/>
        <br/> 
        <button>GoGoGo</button>
      </form>`
})

//读取post传值,使用koa-bodyparser
router.post('/user/register', async (ctx, next) => {
    let {name,password} = ctx.request.body
    if (name === '好人'&&password === '123456') {
        ctx.body = `<h1>Hello${name}</h1>`
    }else {
        ctx.body = `<h1>帐号信息错误</h1>`
    }
})

// 调用路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})