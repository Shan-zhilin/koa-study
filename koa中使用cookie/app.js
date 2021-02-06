const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const nunjucks = require('koa-nunjucks-2') //模板引擎

const app = new Koa()

app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'), // 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

router.get('/', async (ctx) => {
    //设置cookie, kos中cookie只能设置英文并且cookie保存在客户端浏览器，设置中得需要使用new Buffer
    ctx.cookies.set('itemInfo', 'ggdsgsg', {
        maxAge: 1000 * 60 * 60,
        httpOnly: false //设置只有在服务器模式下可以读取，默认为true
    })
  
    let myName = new Buffer('我是中文').toString('base64')
    ctx.cookies.set('myName', myName, {
        maxAge: 1000 * 60 * 60,
        httpOnly: false //设置只有在服务器模式下可以读取，默认为true
    })


    await ctx.render('home')
})

router.get('/news', async (ctx) => {
    let cookies = ctx.cookies.get('itemInfo')

    let myName = new Buffer(ctx.cookies.get('myName'),'base64').toString()
    await ctx.render('news', {
        cookies,
        myName
    })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('service runing in http://localhost:3000');
})