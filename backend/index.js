import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createPaste, fetchPaste, healthCheck } from "./controllers/pastesController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.get('/api/healthz', healthCheck);
app.post('/api/pastes', createPaste);
app.get('/api/pastes/:id', fetchPaste);

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Server running on port ${port}`));
} else {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
