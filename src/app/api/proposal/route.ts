import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answer, loveNote, clientTime } = body;

    if (!clientPromise) {
      return NextResponse.json(
        { success: true, message: 'Saved in memory (MongoDB not configured)', data: body },
        { status: 200 }
      );
    }

    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('proposals');

    const result = await collection.insertOne({
      partner: 'Sayana',
      from: 'Salim',
      answer: answer || 'YES',
      loveNote: loveNote || 'YES! 1000 times YES! ❤️💍',
      clientTime: clientTime || new Date().toISOString(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Proposal response captured forever in our love vault! 💍✨',
    });
  } catch (error: any) {
    console.error('Error in proposal API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save proposal response' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ success: true, count: 1, latest: { answer: 'YES' } });
    }
    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('proposals');

    const proposals = await collection.find({}).sort({ createdAt: -1 }).limit(5).toArray();

    return NextResponse.json({ success: true, proposals });
  } catch (error: any) {
    console.error('Error fetching proposals:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

