const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

app.use(async (ctx, next) => {
    console.log('执行第一个中间件');
    await next()
    if (ctx.status == 404) {
        console.log('页面没有找到');
    }else {
        console.log('执行最后一个中间件');
    }
})

app.use(async (ctx,next) => {
    console.log('执行第二个中间件');
    await next()
    console.log('执行第四个中间件');
})

router.get('/news', async (ctx,next) => {
    ctx.body = '<h1>第三个中间件</h1>'
    console.log('第三个中间件');
    next()
})

router.get('/home', async (ctx,next) => {
    ctx.body = '<h1>第个中间件</h1>'
    console.log('新闻');
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, ()=>{
  console.log('server is running at http://localhost:3000')
})