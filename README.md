# Formulaire de Qualification - Téléprospecteur Énergies Renouvelables

Application Next.js moderne avec back office pour le recrutement de téléprospecteurs dans le secteur des énergies renouvelables.

## Fonctionnalités

### Formulaire de candidature
- Interface moderne avec shadcn/ui et Tailwind CSS
- Validation de formulaire avec Zod et React Hook Form
- 7 sections de qualification complètes
- Design responsive et optimisé mobile
- Animations et transitions fluides

### Back Office Admin
- Dashboard avec statistiques en temps réel
- Gestion complète des candidatures
- Système de filtrage par statut
- Vue détaillée par onglets (Informations, Expérience, Compétences, Gestion)
- Mise à jour du statut et ajout de notes
- Interface intuitive avec shadcn/ui

## Technologies

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4** avec shadcn/ui
- **Prisma** (ORM)
- **SQLite** (Base de données)
- **React Hook Form** + **Zod** (Validation)
- **date-fns** (Formatage des dates)

## Structure du projet

```
recruit/
├── app/
│   ├── page.tsx              # Formulaire de candidature
│   ├── admin/
│   │   └── page.tsx          # Back office admin
│   ├── api/
│   │   └── candidatures/     # API routes
│   └── globals.css           # Styles globaux
├── components/
│   └── ui/                   # Composants shadcn/ui
├── lib/
│   ├── prisma.ts             # Client Prisma
│   └── utils.ts              # Utilitaires
├── prisma/
│   ├── schema.prisma         # Schéma de base de données
│   └── migrations/           # Migrations
└── package.json
```

## Installation

```bash
# Cloner le repository
git clone https://github.com/mathysbarrie/recruit.git
cd recruit

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer la base de données
npx prisma migrate dev

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## URLs

- **Formulaire public** : `/`
- **Back office admin** : `/admin`

## Base de données

Le projet utilise SQLite par défaut. Le modèle de données comprend :

### Candidature
- Informations personnelles (nom, prénom, email, téléphone, ville)
- Expérience professionnelle (années d'expérience, secteurs, volume d'appels)
- Connaissances énergies renouvelables (niveau, solutions, aides)
- Compétences (communication, gestion objections, persévérance)
- Disponibilité et modalités (contrat, lieu, horaires, salaire)
- Motivation et objectifs
- Statut de traitement (new, reviewed, shortlisted, rejected)
- Notes internes pour l'admin

### Admin
- Gestion des comptes administrateurs (à venir)

## Déploiement sur Vercel

L'application est déployée sur Vercel et accessible via :
- **URL principale** : https://recruit-lime.vercel.app
- **URL alternative** : https://recruit-1pkejzkcr-mathysbarrie-gmailcoms-projects.vercel.app

Les déploiements sont automatiques via GitHub. Chaque push sur `main` déclenche un nouveau déploiement.

Pour déployer manuellement :
```bash
vercel --prod
```

⚠️ **IMPORTANT** : Pour la production, vous devez :
1. Configurer une base de données PostgreSQL (voir PRODUCTION.md)
2. Ajouter la variable d'environnement `DATABASE_URL` dans Vercel
3. Mettre en place l'authentification pour le back office `/admin`

## Scripts disponibles

```bash
npm run dev      # Lancer en développement
npm run build    # Build pour production
npm run start    # Lancer en production
npm run lint     # Vérifier le code
```

## Variables d'environnement

Créez un fichier `.env` à la racine :

```env
DATABASE_URL="file:./dev.db"
```

Pour la production, utilisez une base de données hébergée :

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## Améliorations futures

- [ ] Authentification pour le back office admin
- [ ] Export des candidatures en CSV/Excel
- [ ] Envoi d'emails automatiques aux candidats
- [ ] Système de notifications
- [ ] Filtres avancés et recherche
- [ ] Graphiques et analytics
- [ ] Tests unitaires et E2E

## Support

Pour toute question ou personnalisation, contactez l'équipe de développement.

## Licence

Ce projet est libre d'utilisation pour votre agence de recrutement.

---

**Développé avec Next.js 16 et shadcn/ui**
