import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sender, message, emoji } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message cannot be empty' }, { status: 400 });
    }

    const newNote = {
      sender: sender?.trim() || 'Sayana ❤️',
      message: message.trim(),
      emoji: emoji || '💖',
      createdAt: new Date(),
    };

    if (!clientPromise) {
      return NextResponse.json({ success: true, message: 'Saved (fallback)', note: newNote });
    }

    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('messages');

    const result = await collection.insertOne(newNote);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      note: newNote,
      message: 'Love message posted successfully! 💌',
    });
  } catch (error: any) {
    console.error('Error posting message:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!clientPromise) {
      return NextResponse.json({ success: true, messages: [] });
    }
    const client = await clientPromise;
    const db = client.db('birthday');
    const collection = db.collection('messages');

    const messages = await collection.find({}).sort({ createdAt: -1 }).limit(30).toArray();

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error('Error getting messages:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

