const Koa = require('koa')
const app = new Koa()
const router = require('./router')

const middleware = require('./middleware')

middleware(app)
router(app)    //路由中间件要在引用模板引擎后面，尤其是在路由中使用ctx.render属性需要在模板已经渲染并且挂载完闭的情况下才能进行
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})