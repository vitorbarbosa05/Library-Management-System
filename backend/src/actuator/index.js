import {Router} from "express";
import {healthHandler} from "./health/health.js";
import {infoHandler} from "./info/info.js";

const actuatorRouter = Router();

actuatorRouter.get('/health', healthHandler);
actuatorRouter.get('/info', infoHandler);

export default actuatorRouter;