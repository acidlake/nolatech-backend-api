import Koa from "koa";
import { router } from "./routes";

const app = new Koa();

const port = 3000;

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
