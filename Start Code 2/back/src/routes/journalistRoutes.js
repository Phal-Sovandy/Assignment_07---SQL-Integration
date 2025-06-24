import { Router } from "express";
import { getArticleByJournalistId } from "../controllers/articleController.js";

const journalistRoutes = Router();
journalistRoutes.get("/:id/articles", getArticleByJournalistId);

export default journalistRoutes;
