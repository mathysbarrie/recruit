# Configuration Production pour Vercel

## État actuel du déploiement

L'application est déployée sur Vercel mais utilise SQLite qui **ne fonctionne pas en production sur Vercel** (système de fichiers éphémère).

## URLs actuelles

- **Production** : https://recruit-lime.vercel.app
- **Alternative** : https://recruit-1pkejzkcr-mathysbarrie-gmailcoms-projects.vercel.app
- **Dashboard Vercel** : https://vercel.com/mathysbarrie-gmailcoms-projects/recruit

## ⚠️ IMPORTANT : Configuration de la base de données pour la production

Pour que l'application fonctionne en production, vous devez migrer vers une base de données PostgreSQL hébergée.

### Option 1 : Vercel Postgres (Recommandé)

1. Allez sur votre dashboard Vercel : https://vercel.com/mathysbarrie-gmailcoms-projects/formulaire-qualification-recrutement

2. Cliquez sur l'onglet "Storage"

3. Créez une nouvelle base de données PostgreSQL

4. Vercel ajoutera automatiquement les variables d'environnement nécessaires

5. Mettez à jour votre `prisma/schema.prisma` :
```prisma
datasource db {
  provider = "postgresql"
}
```

6. Dans `prisma.config.ts`, la configuration utilise déjà `process.env["DATABASE_URL"]` qui sera automatiquement définie par Vercel

7. Redéployez :
```bash
git add prisma/schema.prisma
git commit -m "Switch to PostgreSQL for production"
git push
```

### Option 2 : Supabase (Gratuit)

1. Créez un compte sur https://supabase.com

2. Créez un nouveau projet

3. Copiez votre `DATABASE_URL` depuis Settings > Database

4. Sur Vercel, ajoutez la variable d'environnement :
   - Allez dans Settings > Environment Variables
   - Ajoutez `DATABASE_URL` avec la valeur de Supabase

5. Mettez à jour `prisma/schema.prisma` comme ci-dessus

6. Poussez les changements

### Option 3 : Railway (Gratuit)

1. Créez un compte sur https://railway.app

2. Créez un nouveau projet PostgreSQL

3. Copiez la `DATABASE_URL`

4. Ajoutez-la dans Vercel comme variable d'environnement

5. Continuez comme les autres options

## Migration des données

Une fois la base de données configurée, vous devrez créer les tables :

```bash
# En local, avec la DATABASE_URL de production
npx prisma migrate deploy
```

Ou laissez Vercel le faire automatiquement lors du premier déploiement.

## Variables d'environnement requises

Sur Vercel, configurez :

```
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
```

## Test après configuration

1. Visitez le formulaire : https://formulaire-qualification-recrutemen.vercel.app
2. Remplissez une candidature test
3. Allez sur le back office : https://formulaire-qualification-recrutemen.vercel.app/admin
4. Vérifiez que la candidature apparaît

## Prochaines étapes recommandées

1. **Configurer la base de données** (étapes ci-dessus)
2. **Ajouter une authentification** pour `/admin`
   - Utiliser NextAuth.js
   - Protéger la route admin
3. **Configurer les emails**
   - Envoyer une confirmation aux candidats
   - Notifier l'admin des nouvelles candidatures
4. **Monitoring**
   - Configurer Sentry pour les erreurs
   - Ajouter Google Analytics

## Support

Si vous avez besoin d'aide pour la configuration, n'hésitez pas à demander !
