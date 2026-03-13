import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    await dbConnect();

    // Create the order in database
    const order = await Order.create({
      userId: session.metadata.userId,
      serviceId: session.metadata.serviceId,
      status: 'pending',
      paymentStatus: 'paid',
      stripeSessionId: session.id,
      totalAmount: session.amount_total / 100,
      pickupDate: new Date(session.metadata.pickupDate),
      address: {
        street: session.metadata.street,
        city: session.metadata.city,
        zipCode: session.metadata.zipCode,
      },
    });

    // Send confirmation emails
    try {
      // To User
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: session.customer_details.email,
        subject: 'Ordine Confermato - AquaClean',
        html: `<h1>Ordine Confermato!</h1><p>Il tuo ritiro è programmato per il ${new Date(session.metadata.pickupDate).toLocaleDateString()}.</p><p>ID Ordine: ${order._id}</p>`,
      });

      // To Admin
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.SMTP_USER, // Admin email
        subject: 'Nuovo Ordine Ricevuto - AquaClean',
        html: `<h1>Nuovo Ordine!</h1><p>Cliente: ${session.customer_details.name}</p><p>Ritiro: ${new Date(session.metadata.pickupDate).toLocaleString()}</p>`,
      });
    } catch (mailError) {
      console.error('Email error:', mailError);
    }
  }

  return NextResponse.json({ received: true });
}
