const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const PORT = process.env.PORT || 80
console.log(PORT)

app.listen(PORT);
