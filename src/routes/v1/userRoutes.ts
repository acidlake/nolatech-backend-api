import Router from "koa-router";
import {
  index,
  show,
  store,
  destroy,
} from "../../controllers/v1/userController";

const router = new Router();

router.get("/users", index);
router.get("/users/:id", show);
router.post("/users", store);
router.delete("/users/:id", destroy);
router.put("/users", store);

export default router.routes();
