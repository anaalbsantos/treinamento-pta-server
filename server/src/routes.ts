import express from "express";
import userController from "./controllers/UserController";
import ProductController from "./controllers/ProductController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/product", ProductController.create);
routes.get("/product", ProductController.get);
routes.get("/product/:id", ProductController.getById);
routes.patch("/product/:id", ProductController.update);
routes.delete("/product/:id", ProductController.delete);

export default routes;
