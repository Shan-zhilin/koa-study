const Koa = require('koa')
const path = require('path')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')

const app = new Koa()
app.use(bodyParser())
app.use(nunjucks({
    ext: '.html',
    path: path.join(__dirname, 'views'), // 指定视图目录
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

router.get('/',async (ctx,next) => {
    let person = {
        name: '张三'
    }
    let htmlData = '<h1>html数据</h1>'
    let num = 19
    let list = ['1111','1111','1111','1111','1111']
    await ctx.render('index',{
        name:person.name,
        htmlData,
        num,
        list
    })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('service runing in http://localhost:3000');
})