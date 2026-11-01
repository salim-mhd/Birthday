import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { selectedGifts, notes } = body;

    if (!clientPromise) {
      return NextResponse.json({ success: true, message: 'Saved (fallback)', gifts: selectedGifts });
    }

    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('gifts');

    const result = await collection.insertOne({
      recipient: 'Sayana',
      selectedGifts: selectedGifts || [],
      notes: notes || '',
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Surprise wishlist saved! Salim is getting ready to deliver them all! 🎁🥰',
    });
  } catch (error: any) {
    console.error('Error saving gifts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ success: true, gifts: [] });
    }
    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('gifts');

    const latest = await collection.find({}).sort({ updatedAt: -1 }).limit(10).toArray();

    return NextResponse.json({ success: true, gifts: latest });
  } catch (error: any) {
    console.error('Error fetching gifts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

