import mongoose, { ConnectOptions } from "mongoose";

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    "mongodb+srv://habibollahi24:5H6EQ3ynL4mX4w2e@cluster0.biezjwk.mongodb.net/firtsTodo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );
  connection.isConnected = db.connections[0].readyState;
}
