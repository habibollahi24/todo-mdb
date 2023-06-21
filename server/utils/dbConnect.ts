import mongoose, { ConnectOptions } from "mongoose";

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  connection.isConnected = db.connections[0].readyState;
}
