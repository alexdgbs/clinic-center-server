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
  valoraciones: [
    {
      userId: String, 
      estrellas: Number, 
    },
  ],
});


const Medico = mongoose.model("Medico", medicoSchema);

app.get("/api/medicos", async (req, res) => {
  try {
    const medicos = await Medico.find();

    const medicosConPromedio = medicos.map((m) => {
      const total = m.valoraciones?.length || 0;
      const promedio =
        total > 0
          ? m.valoraciones.reduce((a, v) => a + v.estrellas, 0) / total
          : 0;

      return { ...m.toObject(), promedio };
    });

    res.json(medicosConPromedio);
  } catch (err) {
    console.error("Error al obtener médicos:", err);
    res.status(500).json({ message: "Error al obtener médicos" });
  }
});

app.post("/api/medicos/:id/valorar", async (req, res) => {
  const { id } = req.params;
  const { userId, estrellas } = req.body;

  if (!estrellas || estrellas < 1 || estrellas > 5) {
    return res.status(400).json({ message: "Valoración inválida" });
  }

  try {
    const medico = await Medico.findById(id);
    if (!medico) return res.status(404).json({ message: "Médico no encontrado" });

    const existente = medico.valoraciones.find((v) => v.userId === userId);

    if (existente) {
      existente.estrellas = estrellas; 
    } else {
      medico.valoraciones.push({ userId, estrellas }); 
    }

    await medico.save();

    const total = medico.valoraciones.length;
    const promedio =
      total > 0
        ? medico.valoraciones.reduce((a, v) => a + v.estrellas, 0) / total
        : 0;

    res.json({ message: "Valoración guardada", promedio });
  } catch (err) {
    console.error("Error al valorar médico:", err);
    res.status(500).json({ message: "Error al valorar médico" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
