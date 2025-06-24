import { Router } from "express";
import {
  getCategories,
  getArticlesByCategory,
} from "../controllers/articleController.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/articles", getArticlesByCategory);

export default categoryRoutes;
