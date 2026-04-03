import mongoose, { models, Schema } from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true }, 
  activities: [{ type: String }],        
});

const TourSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cutprice: {
    type: Number,
    required: true,
  },
    days: {
    type: Number,
    required: true,
  },
    nights: {
    type: Number,
    required: true,
  },
    location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tourtype:{
    type: String,
  },

       image :{
  type: [String],
required: true,
    },
itinerary:  [ItinerarySchema]


},
{timestamps: true}

);

export const Tour = models.Tour || mongoose.model("Tour",TourSchema)



