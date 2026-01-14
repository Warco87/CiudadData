import connectDB from "../config/mongo-config";
const getLanguages = async (): Promise<void> => {
  try{
    const dataBase = await connectDB();
  } catch (error) {
    throw new Error("Error al conectar con la base de datos");
  }
}

