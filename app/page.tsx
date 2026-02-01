"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf, Loader2, CheckCircle } from "lucide-react";

const formSchema = z.object({
  // Informations personnelles
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  ville: z.string().min(2, "La ville est requise"),
  codePostal: z.string().min(5, "Code postal invalide"),

  // Expérience professionnelle
  experience: z.string(),
  anneesExperience: z.string(),
  secteurs: z.array(z.string()),
  volumeAppels: z.string(),

  // Connaissances
  connaissance: z.string(),
  solutionsConnues: z.array(z.string()),
  aidesConnues: z.string().optional(),

  // Compétences
  communication: z.number().min(1).max(5),
  objections: z.number().min(1).max(5),
  perseverance: z.number().min(1).max(5),
  logiciels: z.string().optional(),
  logicielsDetail: z.string().optional(),

  // Disponibilité
  disponibilite: z.string(),
  contrat: z.string(),
  lieu: z.string(),
  horaires: z.string(),
  salaire: z.string(),

  // Motivation
  motivation: z.string().min(20, "Veuillez développer votre motivation"),
  objectifs: z.string().optional(),
  cv: z.string().optional(),

  // Informations complémentaires
  commentConnu: z.string(),
  commentaires: z.string().optional(),
  rgpd: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter le traitement de vos données",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [secteurs, setSecteurs] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communication: 3,
      objections: 3,
      perseverance: 3,
      secteurs: [],
      solutionsConnues: [],
      rgpd: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/candidatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSecteurChange = (secteur: string, checked: boolean) => {
    const updated = checked
      ? [...secteurs, secteur]
      : secteurs.filter((s) => s !== secteur);
    setSecteurs(updated);
    setValue("secteurs", updated);
  };

  const handleSolutionChange = (solution: string, checked: boolean) => {
    const updated = checked
      ? [...solutions, solution]
      : solutions.filter((s) => s !== solution);
    setSolutions(updated);
    setValue("solutionsConnues", updated);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Candidature envoyée !
            </h2>
            <p className="text-gray-600">
              Nous avons bien reçu votre candidature. Nous reviendrons vers vous dans les plus brefs délais.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-6"
            >
              Nouvelle candidature
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-4 rounded-full">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Formulaire de Qualification
          </h1>
          <p className="text-xl text-gray-600">
            Téléprospecteur - Énergies Renouvelables
          </p>
        </div>

        <Card className="mb-6 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-2xl">📋</span>
              <p>
                Ce formulaire nous permettra d'évaluer votre profil pour un poste de
                téléprospecteur dans le secteur des énergies renouvelables. Merci de
                remplir tous les champs obligatoires.
              </p>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Informations Personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Informations Personnelles
              </CardTitle>
              <CardDescription>
                Vos coordonnées pour vous contacter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">
                    Nom <span className="text-red-500">*</span>
                  </Label>
                  <Input id="nom" {...register("nom")} className="mt-1" />
                  {errors.nom && (
                    <p className="text-sm text-red-500 mt-1">{errors.nom.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="prenom">
                    Prénom <span className="text-red-500">*</span>
                  </Label>
                  <Input id="prenom" {...register("prenom")} className="mt-1" />
                  {errors.prenom && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.prenom.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="telephone">
                    Téléphone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    {...register("telephone")}
                    className="mt-1"
                  />
                  {errors.telephone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ville">
                    Ville <span className="text-red-500">*</span>
                  </Label>
                  <Input id="ville" {...register("ville")} className="mt-1" />
                  {errors.ville && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.ville.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="codePostal">
                    Code Postal <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="codePostal"
                    {...register("codePostal")}
                    className="mt-1"
                  />
                  {errors.codePostal && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.codePostal.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Expérience Professionnelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Expérience Professionnelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  Avez-vous une expérience en téléprospection/télémarketing ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("experience", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="oui" id="exp-oui" />
                    <Label htmlFor="exp-oui" className="cursor-pointer flex-1">
                      Oui
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="non" id="exp-non" />
                    <Label htmlFor="exp-non" className="cursor-pointer flex-1">
                      Non
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="anneesExperience">
                  Nombre d'années d'expérience en téléprospection{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("anneesExperience", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">
                      Débutant (moins de 6 mois)
                    </SelectItem>
                    <SelectItem value="0-1">6 mois à 1 an</SelectItem>
                    <SelectItem value="1-3">1 à 3 ans</SelectItem>
                    <SelectItem value="3-5">3 à 5 ans</SelectItem>
                    <SelectItem value="5+">Plus de 5 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dans quel(s) secteur(s) avez-vous travaillé ?</Label>
                <div className="space-y-2 mt-2">
                  {[
                    {
                      value: "energie",
                      label: "Énergies renouvelables / Énergie",
                    },
                    { value: "telecom", label: "Télécommunications" },
                    { value: "banque", label: "Banque / Assurance" },
                    { value: "immobilier", label: "Immobilier" },
                    { value: "autre", label: "Autre" },
                  ].map((secteur) => (
                    <div
                      key={secteur.value}
                      className="flex items-center space-x-2 border rounded-lg p-3"
                    >
                      <Checkbox
                        id={`secteur-${secteur.value}`}
                        checked={secteurs.includes(secteur.value)}
                        onCheckedChange={(checked) =>
                          handleSecteurChange(secteur.value, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`secteur-${secteur.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {secteur.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="volumeAppels">
                  Quel volume d'appels gérez-vous habituellement par jour ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("volumeAppels", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-30">0 à 30 appels</SelectItem>
                    <SelectItem value="30-50">30 à 50 appels</SelectItem>
                    <SelectItem value="50-80">50 à 80 appels</SelectItem>
                    <SelectItem value="80-100">80 à 100 appels</SelectItem>
                    <SelectItem value="100+">Plus de 100 appels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Connaissances Énergies Renouvelables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Connaissances - Énergies Renouvelables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  Quel est votre niveau de connaissance des énergies renouvelables ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("connaissance", value)}
                  className="mt-2"
                >
                  {[
                    {
                      value: "debutant",
                      label: "Débutant - Peu ou pas de connaissances",
                    },
                    {
                      value: "intermediaire",
                      label: "Intermédiaire - Connaissances de base",
                    },
                    {
                      value: "avance",
                      label: "Avancé - Bonnes connaissances du secteur",
                    },
                    {
                      value: "expert",
                      label: "Expert - Excellente maîtrise du secteur",
                    },
                  ].map((niveau) => (
                    <div
                      key={niveau.value}
                      className="flex items-center space-x-2 border rounded-lg p-3"
                    >
                      <RadioGroupItem value={niveau.value} id={`connaissance-${niveau.value}`} />
                      <Label
                        htmlFor={`connaissance-${niveau.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {niveau.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>
                  Quelles solutions d'énergies renouvelables connaissez-vous ?
                </Label>
                <div className="space-y-2 mt-2">
                  {[
                    {
                      value: "photovoltaique",
                      label: "Panneaux photovoltaïques / Solaire",
                    },
                    { value: "pompe", label: "Pompes à chaleur" },
                    { value: "isolation", label: "Isolation thermique" },
                    { value: "eolien", label: "Éolien" },
                    { value: "chauffe-eau", label: "Chauffe-eau solaire" },
                    { value: "autre", label: "Autre" },
                  ].map((solution) => (
                    <div
                      key={solution.value}
                      className="flex items-center space-x-2 border rounded-lg p-3"
                    >
                      <Checkbox
                        id={`solution-${solution.value}`}
                        checked={solutions.includes(solution.value)}
                        onCheckedChange={(checked) =>
                          handleSolutionChange(solution.value, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`solution-${solution.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {solution.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="aidesConnues">
                  Connaissez-vous les aides et subventions pour les énergies
                  renouvelables ?
                </Label>
                <Select
                  onValueChange={(value) => setValue("aidesConnues", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non">Non, pas du tout</SelectItem>
                    <SelectItem value="peu">Oui, quelques notions</SelectItem>
                    <SelectItem value="bien">Oui, je les connais bien</SelectItem>
                    <SelectItem value="expert">
                      Oui, je maîtrise parfaitement
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Compétences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Compétences et Qualités
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block">
                  Auto-évaluation de vos compétences{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  Notez vos compétences de 1 (faible) à 5 (excellent)
                </p>

                {/* Communication */}
                <div className="mb-6">
                  <Label className="mb-2 block">Communication orale</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue("communication", value)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          watch("communication") === value
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gestion des objections */}
                <div className="mb-6">
                  <Label className="mb-2 block">Gestion des objections</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue("objections", value)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          watch("objections") === value
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Persévérance */}
                <div>
                  <Label className="mb-2 block">
                    Persévérance / Résistance au refus
                  </Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue("perseverance", value)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          watch("perseverance") === value
                            ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="logiciels">
                  Maîtrisez-vous des logiciels CRM ou de gestion d'appels ?
                </Label>
                <Select onValueChange={(value) => setValue("logiciels", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non">Non</SelectItem>
                    <SelectItem value="basique">Oui, niveau basique</SelectItem>
                    <SelectItem value="intermediaire">
                      Oui, niveau intermédiaire
                    </SelectItem>
                    <SelectItem value="avance">Oui, niveau avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="logicielsDetail">
                  Si oui, lesquels ? (Salesforce, HubSpot, Zoho, etc.)
                </Label>
                <Input
                  id="logicielsDetail"
                  {...register("logicielsDetail")}
                  placeholder="Ex: Salesforce, HubSpot..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Disponibilité et Modalités */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Disponibilité et Modalités
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="disponibilite">
                  Quelle est votre disponibilité ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("disponibilite", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immédiate</SelectItem>
                    <SelectItem value="1-semaine">Sous 1 semaine</SelectItem>
                    <SelectItem value="2-semaines">Sous 2 semaines</SelectItem>
                    <SelectItem value="1-mois">Sous 1 mois</SelectItem>
                    <SelectItem value="negocier">À négocier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Type de contrat recherché <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("contrat", value)}
                  className="mt-2"
                >
                  {[
                    { value: "cdi", label: "CDI" },
                    { value: "cdd", label: "CDD" },
                    { value: "interim", label: "Intérim" },
                    { value: "freelance", label: "Freelance / Indépendant" },
                  ].map((contrat) => (
                    <div
                      key={contrat.value}
                      className="flex items-center space-x-2 border rounded-lg p-3"
                    >
                      <RadioGroupItem value={contrat.value} id={`contrat-${contrat.value}`} />
                      <Label
                        htmlFor={`contrat-${contrat.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {contrat.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>
                  Préférence de travail <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  onValueChange={(value) => setValue("lieu", value)}
                  className="mt-2"
                >
                  {[
                    { value: "presentiel", label: "Présentiel uniquement" },
                    { value: "teletravail", label: "Télétravail uniquement" },
                    {
                      value: "hybride",
                      label: "Hybride (présentiel + télétravail)",
                    },
                  ].map((lieu) => (
                    <div
                      key={lieu.value}
                      className="flex items-center space-x-2 border rounded-lg p-3"
                    >
                      <RadioGroupItem value={lieu.value} id={`lieu-${lieu.value}`} />
                      <Label
                        htmlFor={`lieu-${lieu.value}`}
                        className="cursor-pointer flex-1"
                      >
                        {lieu.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horaires">
                    Horaires préférés <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue("horaires", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temps-plein">Temps plein (35h+)</SelectItem>
                      <SelectItem value="temps-partiel">Temps partiel</SelectItem>
                      <SelectItem value="matin">Matinées uniquement</SelectItem>
                      <SelectItem value="apres-midi">
                        Après-midis uniquement
                      </SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salaire">
                    Prétentions salariales (brut mensuel){" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => setValue("salaire", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1500-1800">1 500 € - 1 800 €</SelectItem>
                      <SelectItem value="1800-2200">1 800 € - 2 200 €</SelectItem>
                      <SelectItem value="2200-2500">2 200 € - 2 500 €</SelectItem>
                      <SelectItem value="2500-3000">2 500 € - 3 000 €</SelectItem>
                      <SelectItem value="3000+">Plus de 3 000 €</SelectItem>
                      <SelectItem value="negocier">À négocier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Motivation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Motivation et Projet Professionnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motivation">
                  Pourquoi souhaitez-vous travailler comme téléprospecteur dans les
                  énergies renouvelables ? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="motivation"
                  {...register("motivation")}
                  placeholder="Décrivez vos motivations en quelques lignes..."
                  className="mt-1 min-h-[120px]"
                />
                {errors.motivation && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.motivation.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="objectifs">
                  Quels sont vos objectifs professionnels à court et moyen terme ?
                </Label>
                <Textarea
                  id="objectifs"
                  {...register("objectifs")}
                  placeholder="Vos ambitions professionnelles..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="cv">
                  Lien vers votre CV (Google Drive, Dropbox, LinkedIn, etc.)
                </Label>
                <Input
                  id="cv"
                  {...register("cv")}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 7: Informations Complémentaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Informations Complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="commentConnu">
                  Comment avez-vous connu notre agence ?{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("commentConnu", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site-web">Site web</SelectItem>
                    <SelectItem value="reseaux-sociaux">Réseaux sociaux</SelectItem>
                    <SelectItem value="pole-emploi">Pôle Emploi</SelectItem>
                    <SelectItem value="indeed">Indeed</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="recommandation">Recommandation</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="commentaires">
                  Commentaires ou informations supplémentaires
                </Label>
                <Textarea
                  id="commentaires"
                  {...register("commentaires")}
                  placeholder="Ajoutez toute information que vous jugez pertinente..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="flex items-start space-x-2 border rounded-lg p-4 bg-gray-50">
                <Checkbox
                  id="rgpd"
                  {...register("rgpd")}
                  onCheckedChange={(checked) => setValue("rgpd", checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor="rgpd" className="cursor-pointer">
                    J'accepte que mes données personnelles soient traitées dans le
                    cadre de ma candidature conformément au RGPD{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  {errors.rgpd && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.rgpd.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="pt-6 text-center">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto px-12 bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Envoyer ma candidature"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
