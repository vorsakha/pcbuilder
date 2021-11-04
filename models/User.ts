import mongoose from "mongoose";

interface User {
  email: string;
  password: string;
  admin: boolean;
}

const schema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.models.User || mongoose.model<User>("User", schema);
