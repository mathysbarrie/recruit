import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Candidature } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Convert arrays to JSON strings for storage
    const candidature = await prisma.candidature.create({
      data: {
        // Informations personnelles
        nom: body.nom,
        prenom: body.prenom,
        email: body.email,
        telephone: body.telephone,
        ville: body.ville,
        codePostal: body.codePostal,

        // Expérience professionnelle
        experience: body.experience,
        anneesExperience: body.anneesExperience,
        secteurs: JSON.stringify(body.secteurs || []),
        volumeAppels: body.volumeAppels,

        // Connaissances énergies renouvelables
        connaissance: body.connaissance,
        solutionsConnues: JSON.stringify(body.solutionsConnues || []),
        aidesConnues: body.aidesConnues,

        // Compétences
        communication: body.communication,
        objections: body.objections,
        perseverance: body.perseverance,
        logiciels: body.logiciels,
        logicielsDetail: body.logicielsDetail,

        // Disponibilité
        disponibilite: body.disponibilite,
        contrat: body.contrat,
        lieu: body.lieu,
        horaires: body.horaires,
        salaire: body.salaire,

        // Motivation
        motivation: body.motivation,
        objectifs: body.objectifs,
        cv: body.cv,

        // Informations complémentaires
        commentConnu: body.commentConnu,
        commentaires: body.commentaires,

        // Status par défaut: new
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, id: candidature.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating candidature:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create candidature' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};

    const candidatures = await prisma.candidature.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse JSON strings back to arrays for frontend
    const candidaturesWithParsedData = candidatures.map((c: Candidature) => ({
      ...c,
      secteurs: JSON.parse(c.secteurs),
      solutionsConnues: JSON.parse(c.solutionsConnues),
    }));

    return NextResponse.json(candidaturesWithParsedData);
  } catch (error) {
    console.error('Error fetching candidatures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch candidatures' },
      { status: 500 }
    );
  }
}
