import express from "express";
import userController from "./controllers/UserController";
import notebookController from "./controllers/NotebookController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/notebook", notebookController.create);
routes.get("/notebook", notebookController.get);
routes.delete("/notebook/:id", notebookController.delete);
routes.patch("/notebook/:id", notebookController.update);

export default routes;
