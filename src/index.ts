import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mainRoute from "./routes";
import cors from "@koa/cors";

const app = new Koa();

const corsOptions = {
  origin: "*",
  allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
  allowHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser());
app.use(mainRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
