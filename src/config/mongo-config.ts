import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: "ciudad_data", // opcional, puedes definir el nombre de la BD aquí
    });
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error de conexión:", err);
    process.exit(1); // Detiene la app si falla la conexión
  }
};

export default connectDB;