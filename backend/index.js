import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import salesRoutes from "./routes/sales.js"; 
import governorateRoutes from "./routes/governorate.js"; 
import articleRoutes from "./routes/articleRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import clientsRoutes from "./routes/clientsRoutes.js";
import livraisonFactRoutes from "./routes/livraisonFactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import initAdmin from "./utils/initAdmin.js";
dotenv.config();
connectDB();
initAdmin(); // Initialize admin user

const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: 'https://ccgc-website.onrender.com/', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/sales", salesRoutes);
app.use("/api/governorates", governorateRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api", transactionRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/livraison-facts", livraisonFactRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
