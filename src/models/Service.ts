import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // URL to image
  category: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now },
});

export const Service = models.Service || model('Service', ServiceSchema);
