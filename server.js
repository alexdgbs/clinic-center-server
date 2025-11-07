import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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
  comentarios: [
    {
      userId: String,
      nombre: String,
      texto: String,
      fecha: { type: Date, default: Date.now },
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

    let valoracionGuardada;
    const existente = medico.valoraciones.find((v) => v.userId === userId);

    if (existente) {
      existente.estrellas = estrellas;
      valoracionGuardada = existente;
    } else {
      const nuevaValoracion = { userId, estrellas };
      medico.valoraciones.push(nuevaValoracion);
      valoracionGuardada = medico.valoraciones[medico.valoraciones.length - 1];
    }

    await medico.save();

    const total = medico.valoraciones.length;
    const promedio =
      total > 0
        ? medico.valoraciones.reduce((a, v) => a + v.estrellas, 0) / total
        : 0;

    io.emit("nueva_valoracion", {
      medicoId: medico._id,
      promedio: promedio,
      valoracion: valoracionGuardada,
    });

    res.json({ message: "Valoración guardada", promedio });
  } catch (err) {
    console.error("Error al valorar médico:", err);
    res.status(500).json({ message: "Error al valorar médico" });
  }
});

app.post("/api/medicos/:id/comentar", async (req, res) => {
  const { id } = req.params;
  const { userId, nombre, texto } = req.body;

  if (!userId || !nombre || !texto)
    return res.status(400).json({ message: "Faltan datos requeridos" });

  try {
    const medico = await Medico.findById(id);
    if (!medico)
      return res.status(404).json({ message: "Médico no encontrado" });

    const comentarioExistente = medico.comentarios.find(
      (c) => c.userId === userId
    );

    let comentarioGuardado;

    if (comentarioExistente) {
      comentarioExistente.texto = texto;
      comentarioExistente.nombre = nombre;
      comentarioExistente.fecha = new Date();
      comentarioGuardado = comentarioExistente;
    } else {
      const nuevoComentario = { userId, nombre, texto, fecha: new Date() };
      medico.comentarios.push(nuevoComentario);
      comentarioGuardado = medico.comentarios[medico.comentarios.length - 1];
    }

    await medico.save();

    io.emit("nuevo_comentario", {
      medicoId: medico._id,
      comentario: comentarioGuardado,
    });

    res.json({ message: "Comentario guardado correctamente" });
  } catch (err) {
    console.error("Error al agregar comentario:", err);
    res.status(500).json({ message: "Error al agregar comentario" });
  }
});

app.get("/api/medicos/:id/comentarios", async (req, res) => {
  const { id } = req.params;
  try {
    const medico = await Medico.findById(id);
    if (!medico)
      return res.status(404).json({ message: "Médico no encontrado" });

    res.json(medico.comentarios || []);
  } catch (err) {
    console.error("Error al obtener comentarios:", err);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
});

io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Servidor (y Sockets) corriendo en puerto ${PORT}`)
);