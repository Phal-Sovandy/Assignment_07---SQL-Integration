import express, { json } from "express";
import cors from "cors";
import articleRouter from "./routes/articleRoutes.js";
import journalistRoutes from "./routes/journalistRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();


// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(json());

app.use("/api/articles", articleRouter);
app.use("/api/journalists", journalistRoutes);
app.use("/api/categories", categoryRoutes);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});