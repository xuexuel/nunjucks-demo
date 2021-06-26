const Koa = require("koa");
const Router = require("koa-router");
const nunjucks = require("koa-nunjucks-2");
const { async } = require("regenerator-runtime");
let app = new Koa();
let router = new Router();
app.use(nunjucks({
  ext: "html",  // .njk
  path: __dirname + "/views",
  nunjucksConfig: {
    trimBlocks: true  // 防止Xss泄露
  }
}))
router.get("/", async ctx => {
  ctx.body = "hello";
  // let users = [{ name: "张三", age: 20, height: "178cm" }, { name: "李四", age: 22, height: "185cm" }, { name: "王五", age: 25, height: "175cm" }]
  // await ctx.render("index");
  await ctx.render("index", {
    username: "张三",
    num: 3,
    arr: [{ name: "张三", age: 20, height: "178cm" }, { name: "李四", age: 22, height: "185cm" }, { name: "王五", age: 25, height: "175cm" }],
    str: 'hello world'
    // data: "我是数据",
    // users
  });
})
router.get("/son1", async ctx => {
  await ctx.render("son1");
})
router.get("/import", async ctx => {
  await ctx.render("import");
})
app.use(router.routes());
app.listen(3000);
