import { GET, route } from "awilix-koa";
import { Context } from "../interfaces/IKoa";

@route('/')
class IndexController {
    @route('/')
    @GET()
    async actionIndex(ctx: Context): Promise<void> {
        // ctx.body = {
        //     data: 'hello'
        // }
        ctx.body = await ctx.render('index')
    }
}

export default IndexController