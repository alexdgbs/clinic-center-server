import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

const medicoSchema = new mongoose.Schema({
  nombre: String,
  especialidad: String,
  descripcion: String,
  cedula: String,
  telefono: String,
  experiencia: String,
  imagen: String,
});

const Medico = mongoose.model("Medico", medicoSchema);

app.get("/api/medicos", async (req, res) => {
  const medicos = await Medico.find();
  res.json(medicos);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
