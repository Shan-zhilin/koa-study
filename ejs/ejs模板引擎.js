const Koa = require('koa')
const router = require('koa-router')()
var views = require('koa-views');

const app = new Koa()

// app.use(views('views', { map: {html: 'ejs' }}));  //这种后缀 渲染以.html结尾的模板

app.use(views('views', {   //第一个参数表示模板引擎的位置，第二个参数表示渲染不同类型的模板
    extension: 'ejs'
}))

//配置公共数据 需要在一个新的中间件中配置
app.use(async (ctx,next) => {
    ctx.state.userInfo="ccc"
    await next()
})

router.get('/', async (ctx, next) => {
    let title = 'ejs模板引擎'
    let list = ['111','111','111','111']
    let htmlData = '<h1>html数据</h1>'
    let num = 24
    await ctx.render('index', {
        title,
        list,
        htmlData,
        num
    })
})

router.get('/news', async (ctx,next) => {
    await ctx.render('news')
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('service runing in http://localhost:3000');
})