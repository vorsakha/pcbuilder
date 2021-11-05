import mongoose from "mongoose";

// interface Item {
//   title: string;
//   price: number;
//   image: string;
//   date: any;
// }

// const Item = new mongoose.Schema<Item>({
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: false },
//   date: { type: Date, default: Date.now },
// });

interface BuildInterface {
  user: mongoose.Schema.Types.ObjectId;
  build: ArrayConstructor;
}

const Build = new mongoose.Schema<BuildInterface>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  build: { type: Array, required: true },
});

module.exports =
  mongoose.models.Build || mongoose.model<BuildInterface>("Build", Build);
