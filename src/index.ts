import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mainRoute from "./routes";

const app = new Koa();

app.use(bodyParser());
app.use(mainRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
