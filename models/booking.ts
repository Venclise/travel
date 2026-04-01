import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
{

  booking:{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    city: { type: String, required: true },
    people: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["pending", "delivered"],
    default: "pending",
  },
},
  { timestamps: true },
);

export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
