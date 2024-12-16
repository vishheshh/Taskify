import { Router } from "express";
import userController from "../controllers/User.js";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  const result = new userController().register(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

userRouter.post("/login", (req, res) => {
  const result = new userController().login(req.body);
  console.log(result);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

userRouter.post("/update", (req, res) => {
  console.log("req", req.body);
  const result = new userController().edit(req.body);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

export default userRouter;
