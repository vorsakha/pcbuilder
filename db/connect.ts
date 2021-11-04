import mongoose from "mongoose";

const readyStates = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
};

const { readyState } = mongoose.connection;

const dbConnect = async () => {
  if (readyState !== readyStates.connected) {
    try {
      mongoose.connect(process.env.DB_URL as string, (error: any) => {
        if (error) {
          return console.log(error);
        }

        console.log("Connected to DB");
      });
    } catch (error) {
      console.error(error);
    }
  }
  return;
};

export default dbConnect;
