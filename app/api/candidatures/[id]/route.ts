import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const candidature = await prisma.candidature.update({
      where: { id },
      data: {
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json(candidature);
  } catch (error) {
    console.error('Error updating candidature:', error);
    return NextResponse.json(
      { error: 'Failed to update candidature' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const candidature = await prisma.candidature.findUnique({
      where: { id },
    });

    if (!candidature) {
      return NextResponse.json(
        { error: 'Candidature not found' },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const candidatureWithParsedData = {
      ...candidature,
      secteurs: JSON.parse(candidature.secteurs),
      solutionsConnues: JSON.parse(candidature.solutionsConnues),
    };

    return NextResponse.json(candidatureWithParsedData);
  } catch (error) {
    console.error('Error fetching candidature:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidature' },
      { status: 500 }
    );
  }
}
