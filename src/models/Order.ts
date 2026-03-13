import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  stripeSessionId: { type: String },
  totalAmount: { type: Number, required: true },
  pickupDate: { type: Date, required: true },
  deliveryDate: { type: Date },
  address: {
    street: String,
    city: String,
    zipCode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Order = models.Order || model('Order', OrderSchema);
