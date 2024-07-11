import Router from "koa-router";
import {
  index,
  show,
  store,
  destroy,
} from "../../controllers/v1/userController";

import { authenticate } from "../../middleware/authMidleware";

const router = new Router();

// public routes
router.get("/users", index);
router.get("/users/:id", show);

// Private routes
router.post("/users", authenticate, store);
router.delete("/users/:id", authenticate, destroy);
router.put("/users", authenticate, store);

export default router.routes();
