import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
  try {
    await dbConnect();

    const adminEmail = 'admin@aquaclean.it';
    const adminPassword = 'AdminPassword123!';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: 'Admin AquaClean',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({
      message: 'Admin user created successfully',
      email: adminEmail,
      password: adminPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
