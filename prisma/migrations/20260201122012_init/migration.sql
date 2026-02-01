-- CreateTable
CREATE TABLE "Candidature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "anneesExperience" TEXT NOT NULL,
    "secteurs" TEXT NOT NULL,
    "volumeAppels" TEXT NOT NULL,
    "connaissance" TEXT NOT NULL,
    "solutionsConnues" TEXT NOT NULL,
    "aidesConnues" TEXT,
    "communication" INTEGER NOT NULL,
    "objections" INTEGER NOT NULL,
    "perseverance" INTEGER NOT NULL,
    "logiciels" TEXT,
    "logicielsDetail" TEXT,
    "disponibilite" TEXT NOT NULL,
    "contrat" TEXT NOT NULL,
    "lieu" TEXT NOT NULL,
    "horaires" TEXT NOT NULL,
    "salaire" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "objectifs" TEXT,
    "cv" TEXT,
    "commentConnu" TEXT NOT NULL,
    "commentaires" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
