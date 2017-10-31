const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Movie = require('./model/movie');
const ObjectId = require('mongoose').Types.ObjectId;

const app = new Koa();
const router = new Router();

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World!';
    });

// movies
router
    .get('/movies', async (ctx, next) => {
        ctx.body = await Movie.find();
    })
    .get('/movies/:id', async (ctx, next) => {
        let id = ctx.params.id;
        if (!ObjectId.isValid(id)) {
            ctx.response.status = 400;
            return;
        }
        let movie = await Movie.findById(ctx.params.id);
        if (movie == null) {
            ctx.response.status = 404;
        } else {
            ctx.body = movie;
        }
    })
    .post('/movies', async (ctx, next) => {
        ctx.body = await Movie.create(ctx.request.body);
        ctx.response.status = 201;
    })
    .put('/movies/:id', async (ctx, next) => {
        let id = ctx.params.id;
        if (!ObjectId.isValid(id)) {
            ctx.response.status = 400;
            return;
        }

        let res = await Movie.findOneAndUpdate({_id: ctx.params.id}, ctx.request.body);
        if (res == null) {
            ctx.response.status = 404;
        } else {
            ctx.response.status = 204;
        }
    })
    .del('/movies/:id', async (ctx, next) => {
        let id = ctx.params.id;
        if (!ObjectId.isValid(id)) {
            ctx.response.status = 400;
            return;
        }

        await Movie.remove({_id: ctx.params.id});
        ctx.response.status = 204;
    });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);