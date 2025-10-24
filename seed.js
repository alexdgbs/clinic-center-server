import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

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

const medicos = [
  {
    nombre: "Gabriela Cabrera Lopez",
    especialidad: "Ginecólogo",
    descripcion: "Especialista en: Medicina Materno Fetal, Embarazo de Alto Riesgo, Ginecología de Alta Especialidad.",
    cedula: "9269550 10172650 5906136",
    telefono: "55 5528 4033",
    experiencia: "¡HOLA! Soy la Dra. Gabriela Cabrera López, Ginecóloga con amplia experiencia, pertenezco a un grupo multidisciplinario de especialistas y sub-especialistas: Materno Fetal (MAFET) Diagnóstico Prenatal.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/6b2e56/6b2e562bc21856491168597aaf1f7617_large.jpg"
    
  },
 {
    nombre: "Dr. Gerardo Rivera",
    especialidad: "Pediatra",
    descripcion: "Experto en: Salud Digestiva y Nutrición Infantil.",
    cedula: "11430861 12791280 13759791",
    telefono: "833 524 2823",
    experiencia: "Soy Pediatra y Gastroenterólogo Pediatra, padre de dos niñas y entiendo lo importante que es vigilar un correcto crecimiento y desarrollo de los pacientes pediátricos, con una adecuada salud digestiva y nutricional.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/929d08/929d081d7740ed8b727da44b02469eb3_large.jpg"
  },
  {
    nombre: "Dr. Hugo Alonso Reyes",
    especialidad: "Oftalmólogo",
    descripcion: "Enfocado en: Córnea, Cataratas, Cirugía Refractiva.",
    cedula: "11017188 12697502",
    telefono: "33 1811 1188",
    experiencia: "Soy el Dr. Hugo Alonso Reyes, cirujano oftalmólogo con alta especialidad en córnea, catarata y cirugía refractiva. A lo largo de casi 10 años de experiencia, mi mayor compromiso ha sido ayudar a mis pacientes a ver mejor y vivir mejor.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/4f81c7/4f81c71da399491404b5cfbc53c77ca4_large.jpg"
  }
];

const seedDB = async () => {
  try {
    await Medico.deleteMany({}); 
    await Medico.insertMany(medicos);
    console.log("Datos insertados correctamente");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error al insertar datos:", err);
  }
};

seedDB();
