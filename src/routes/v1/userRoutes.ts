import Router from "koa-router";
import { Context, Next } from "koa";
import {
  index,
  show,
  store,
  update,
  destroy,
} from "../../controllers/v1/userController";

import { authenticate } from "../../middleware/authMidleware";

const router = new Router();

// public routes
router.get("/users", index);
router.get("/users/:id", authenticate, show);

// Private routes
router.post("/users", authenticate, store);
router.delete("/users/:id", authenticate, destroy);
router.put("/users/:id", authenticate, update);

export default router.routes();
