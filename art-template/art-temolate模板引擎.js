const Koa = require('koa')
const router = require('koa-router')()
const render = require('koa-art-template')
const path = require('path')

const app = new Koa()

render(app, {
    root: path.join(__dirname, 'views'),    //模板引擎位置
    extname: '.art',   //模板后缀
    debug: process.env.NODE_ENV !== 'production'   //是否开启调试模式
});

router.get('/',async (ctx,next) => {
    let person = {
        name: '张三'
    }
    let htmlData = '<h1>html数据</h1>'
    let num = 19
    let list = ['1111','1111','1111','1111','1111']
    ctx.render('index',{
        name:person.name,
        htmlData,
        num,
        list
    })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('serve runing in http://localhost:3000');
})