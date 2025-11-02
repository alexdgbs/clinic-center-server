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
    nombre: "Dra. Gabriela Cabrera",
    especialidad: "Ginecólogo",
    descripcion: "Especialista en: Medicina Materno Fetal, Embarazo de Alto Riesgo, Ginecología de Alta Especialidad.",
    cedula: "9269550 10172650 5906136",
    telefono: "55 5528 4033",
    experiencia: "¡HOLA! Soy la Dra. Gabriela Cabrera López, Ginecóloga con amplia experiencia, pertenezco a un grupo multidisciplinario de especialistas y sub-especialistas: Materno Fetal (MAFET) Diagnóstico Prenatal.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/6b2e56/6b2e562bc21856491168597aaf1f7617_large.jpg"
    
  },
      {
    nombre: "Dra. Gretel Ojeda",
    especialidad: "Gastroenterólogo",
    descripcion: "Enfocado en: Endoscopia Digestiva.",
    cedula: "12450949 9754708 EAD-0061",
    telefono: "33 2917 1402",
    experiencia: "Dedicada a manejar las enfermedades gastrointestinales y hepáticas.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/7d1dd6/7d1dd6a076d0f15b2ea1045360fc6ac6_large.jpg"
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
    nombre: "Dr. Eric Yair",
    especialidad: "Oftalmólogo",
    descripcion: "Enfocado en: Cirugía refractiva con láser, Cirugía refractiva,Córnea.",
    cedula: "6249128 4876019",
    telefono: "33 2305 9790",
    experiencia: "Asociación para evitar la ceguera en Mexico.",
    imagen: "https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/73e04e51/73e04e51-520b-4801-8275-de5a7292b150_large.jpg"
  },
      {
    nombre: "Dr. Yonatan Armendariz",
    especialidad: "Dermatólogo",
    descripcion: "Enfocado en: Detección Precoz del Cáncer de Piel, Cirugía de la Piel, Enfermedades del Cabello y de las Uñas.",
    cedula: "12002824 14160745",
    telefono: "33 1151 9757",
    experiencia: "Práctica Privada: Núcleo Médico Bari Reserve - 2025 a la actualidad, Médico adscrito al Hospital Civil de Guadalajara Fray Antonio Alcalde - 2024 a 2025, Prácticas Profesionales - 2021 a 2024.",
    imagen: "https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/98396f7c/98396f7c-175f-4c11-b9aa-d1148e002db7_large.jpg"
  },
      {
    nombre: "Dr. Ignacio Javier",
    especialidad: "Ginecólogo",
    descripcion: "Especialista en: Cirugía ginecológica, Patología mamaria, Colposcopia, Embarazo de alto riesgo.",
    cedula: "0654263 3341316",
    telefono: "33 3359 9959",
    experiencia: "Médico Adscrito al Hospital Dr. Ángel Leaño, Médico Adscrito en el Hospital General de Zona No. 46.",
    imagen: "https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/41a65d73/41a65d73-4e43-4cfc-8f01-b126a6a98527_large.jpg"
    
  },
     {
    nombre: "Dr. José Arturo",
    especialidad: "Gastroenterólogo",
    descripcion: "Enfocado en: Endoscopia Gastrointestinal",
    cedula: "13077650 11633306",
    telefono: "33 4750 7625",
    experiencia: "Gastroenterólogo y Endoscopista, certificado por el consejo mexicano de Gastroenterología, Con amplia experiencia en atención a pacientes con afecciones gastrointestinales, Hospitales privados y publicos.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/96848e/96848eba90ae3df18837269055fd7fb6_large.jpg"
  },
    {
    nombre: "Dr. Francisco Javier",
    especialidad: "Cardiólogo",
    descripcion: "Enfocado en: Pruebas Diagnósticas, Pruebas de Esfuerzo, Electrocardiogramas, Ecocardiografía.",
    cedula: "7198308 10727575",
    telefono: "33 1591 4628",
    experiencia: "Cardiólogo certificado por el Consejo Mexicano de Cardiología. Mejor cardiólogo de México (2018, 2019 y 2020).",
    imagen: "https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/420e4ea5/420e4ea5-c304-4714-b041-3dcf7461849c_large.jpg"
  },
      {
    nombre: "Dra. Miroslava Aurora",
    especialidad: "Dermatólogo",
    descripcion: "Enfocado en: Dermatología Cosmética.",
    cedula: "9003000 12175028",
    telefono: "33 4700 9611",
    experiencia: "Dermatóloga certificada que cuenta con una amplia formación en el campo de la Dermatología Cosmética, la cual es ciencia, arte y técnica.",
    imagen: "https://pixel-p3.s3.us-east-1.amazonaws.com/doctor/avatar/9015d1e2/9015d1e2-fce3-455f-abf8-e4398ea8d482_large.jpg"
  },
      {
    nombre: "Dr. Juan Pablo",
    especialidad: "Cardiólogo",
    descripcion: "Enfocado en: Electrocardiogramas, Cardiología Intervencionista, Arritmias, Ecocardiografía.",
    cedula: "12088682 13942506",
    telefono: "81 4173 5784",
    experiencia: "Médico, Cirujano y Partero por la Universidad de Guadalajara, Medicina Interna durante 2 años en el Hospital Civil Viejo Fray Antonio Alcalde.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/389997/38999799c7966f27f39c20ecf240130a_large.jpg"
  },
     {
    nombre: "Dr. Sadid Estrada",
    especialidad: "Pediatra",
    descripcion: "Experto en: manejo de infecciones en la infancia.",
    cedula: "9541112 13299392 12840622",
    telefono: "33 4700 7680",
    experiencia: "Médico adscrito en el Departamento de Epidemiología Hospitalaria del Hospital Infantil de México por dos años.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/ddc3cc/ddc3cc00a357a51c915c6e651870b3d7_large.jpg"
  },
   {
    nombre: "Dr. Hugo Alonso",
    especialidad: "Oftalmólogo",
    descripcion: "Enfocado en: Córnea, Cataratas, Cirugía Refractiva.",
    cedula: "11017188 12697502",
    telefono: "33 1811 1188",
    experiencia: "Soy el Dr. Hugo Alonso Reyes, cirujano oftalmólogo con alta especialidad en córnea, catarata y cirugía refractiva. A lo largo de casi 10 años de experiencia, mi mayor compromiso ha sido ayudar a mis pacientes a ver mejor y vivir mejor.",
    imagen: "https://s3.us-east-1.amazonaws.com/doctoralia.com.mx/doctor/4f81c7/4f81c71da399491404b5cfbc53c77ca4_large.jpg"
  },
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
