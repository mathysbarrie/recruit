# Formulaire de Qualification - Téléprospecteur Énergies Renouvelables

Un formulaire de qualification professionnel et moderne pour le recrutement de téléprospecteurs dans le secteur des énergies renouvelables.

## Aperçu

Ce formulaire permet d'évaluer de manière complète les candidats potentiels pour des postes de téléprospection dans le domaine des énergies renouvelables (panneaux solaires, pompes à chaleur, isolation, etc.).

## Fonctionnalités

- **Design moderne et responsive** - Interface élégante avec dégradés verts thématiques
- **7 sections de qualification** :
  - Informations personnelles
  - Expérience professionnelle en téléprospection
  - Connaissances des énergies renouvelables
  - Compétences et soft skills
  - Disponibilité et modalités de travail
  - Motivation et projet professionnel
  - Informations complémentaires

- **Validation HTML5** - Champs obligatoires avec validation native
- **Auto-évaluation interactive** - Échelles de notation pour les compétences
- **Conforme RGPD** - Acceptation des conditions de traitement des données
- **Compatible mobile** - Design adaptatif pour tous les écrans

## Sections du formulaire

### 1. Informations Personnelles
- Nom, prénom
- Email, téléphone
- Ville, code postal

### 2. Expérience Professionnelle
- Expérience en téléprospection
- Années d'expérience
- Secteurs d'activité
- Volume d'appels quotidien

### 3. Connaissances Énergies Renouvelables
- Niveau de connaissance du secteur
- Solutions connues (photovoltaïque, pompes à chaleur, etc.)
- Connaissance des aides et subventions (MaPrimeRénov', CEE)

### 4. Compétences et Soft Skills
- Auto-évaluation (communication, gestion des objections, persévérance)
- Maîtrise des logiciels CRM

### 5. Disponibilité et Modalités
- Disponibilité de début
- Type de contrat souhaité (CDI, CDD, freelance)
- Préférence de travail (présentiel, télétravail, hybride)
- Horaires et prétentions salariales

### 6. Motivation
- Motivations pour le poste
- Objectifs professionnels
- CV en ligne

### 7. Informations Complémentaires
- Source de découverte de l'agence
- Commentaires libres
- Consentement RGPD

## Utilisation

### Ouverture simple
```bash
open formulaire-qualification.html
```

Ou double-cliquez sur le fichier `formulaire-qualification.html` dans votre explorateur de fichiers.

### Intégration Backend

Le formulaire collecte les données en JavaScript. Pour l'intégrer à votre système :

1. Localisez la section `<script>` en fin de fichier (ligne ~690)
2. Modifiez la fonction de soumission pour envoyer les données vers votre API :

```javascript
fetch('/api/candidatures', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    alert('✅ Candidature envoyée avec succès !');
})
.catch(error => {
    console.error('Erreur:', error);
});
```

### Hébergement

Vous pouvez héberger ce formulaire sur :
- GitHub Pages (gratuit)
- Netlify (gratuit)
- Vercel (gratuit)
- Votre propre serveur web

#### Déploiement sur GitHub Pages

1. Activez GitHub Pages dans les paramètres du repository
2. Sélectionnez la branche `main` comme source
3. Votre formulaire sera accessible à : `https://votre-username.github.io/recruit/formulaire-qualification.html`

## Personnalisation

### Couleurs
Les couleurs principales sont définies dans le CSS :
- Vert principal : `#27ae60`
- Vert secondaire : `#2ecc71`
- Violet d'accentuation : `#667eea` et `#764ba2`

### Champs
Vous pouvez facilement ajouter, modifier ou supprimer des champs en éditant la structure HTML.

## Technologies utilisées

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript vanilla (aucune dépendance)

## Compatibilité

- Chrome, Firefox, Safari, Edge (versions récentes)
- Mobile iOS et Android
- Tablettes

## Support

Pour toute question ou personnalisation, contactez l'équipe de développement.

## Licence

Ce projet est libre d'utilisation pour votre agence de recrutement.

---

**Fait avec ❤️ pour optimiser votre recrutement dans les énergies renouvelables**
