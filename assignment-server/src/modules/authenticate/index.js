import { Router } from "express";
import Controller from "./controller";
import trycatchWrapper from "@utils/trycatchWrapper";

const publicRoutes = new Router();

publicRoutes.post(
  "/signup",
  trycatchWrapper(async (req, res, next) => {
    return await Controller.signUp(req, res, next);
  })
);

publicRoutes.post(
  "/login",
  trycatchWrapper(async (req, res, next) => {
    return await Controller.login(req, res, next);
  })
);

export default publicRoutes;
