  import { dbConnect } from '@/lib/dbConnect';
  import Physician from '@/models/Physician';
  import { NextResponse } from 'next/server';

  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';

    await dbConnect();

    try {
      const physicians = await Physician.find({
        name: { $regex: name, $options: 'i' } // Case-insensitive search
      });

      return NextResponse.json({ success: true, data: physicians });
    } catch (error) {
      console.error('Error fetching physicians:', error);
      if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      } else {
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
      }
    }
  }

  export async function POST(req: Request) {
    const { name } = await req.json();

    await dbConnect();

    try {
      const physician = await Physician.create({ name });
      return NextResponse.json({ success: true, data: physician }, { status: 201 });
    } catch (error) {
      console.error('Error creating physician:', error);
      if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      } else {
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 400 });
      }
    }
  }
