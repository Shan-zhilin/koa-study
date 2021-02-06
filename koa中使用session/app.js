const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const session = require('koa-session');
const nunjucks = require('koa-nunjucks-2') //模板引擎

const app = new Koa()

app.keys = ['some secret hurr'];
const CONFIG = {           //koa中使用session
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 5000, // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以overwrite    (默认default true)
    httpOnly: false, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认true
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, //(boolean) renew session when session is nearly expired,
};

app.use(nunjucks({          //模板引擎
    ext: 'html', 
    path: path.join(__dirname, 'views'), // 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

app.use(session(CONFIG, app))

router.get('/', async (ctx) => {
    //设置session,
    ctx.session.username = "张三"

    await ctx.render('home')
})

router.get('/news', async (ctx) => {

    await ctx.render('news')
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('service runing in http://localhost:3000');
})