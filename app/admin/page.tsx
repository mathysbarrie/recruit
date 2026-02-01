"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Users,
  Eye,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  TrendingUp,
  Leaf,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Candidature {
  id: string;
  createdAt: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  codePostal: string;
  experience: string;
  anneesExperience: string;
  secteurs: string[];
  volumeAppels: string;
  connaissance: string;
  solutionsConnues: string[];
  aidesConnues?: string;
  communication: number;
  objections: number;
  perseverance: number;
  logiciels?: string;
  logicielsDetail?: string;
  disponibilite: string;
  contrat: string;
  lieu: string;
  horaires: string;
  salaire: string;
  motivation: string;
  objectifs?: string;
  cv?: string;
  commentConnu: string;
  commentaires?: string;
  status: string;
  notes?: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  reviewed: "bg-yellow-100 text-yellow-800 border-yellow-200",
  shortlisted: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<string, string> = {
  new: "Nouvelle",
  reviewed: "Examinée",
  shortlisted: "Présélectionnée",
  rejected: "Rejetée",
};

export default function AdminPage() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [filteredCandidatures, setFilteredCandidatures] = useState<Candidature[]>([]);
  const [selectedCandidature, setSelectedCandidature] = useState<Candidature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState<string>("");
  const [editingNotes, setEditingNotes] = useState<string>("");

  const fetchCandidatures = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/candidatures");
      const data = await response.json();
      setCandidatures(data);
      setFilteredCandidatures(data);
    } catch (error) {
      console.error("Error fetching candidatures:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredCandidatures(candidatures);
    } else {
      setFilteredCandidatures(
        candidatures.filter((c) => c.status === statusFilter)
      );
    }
  }, [statusFilter, candidatures]);

  const handleViewDetails = (candidature: Candidature) => {
    setSelectedCandidature(candidature);
    setEditingStatus(candidature.status);
    setEditingNotes(candidature.notes || "");
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedCandidature) return;

    try {
      const response = await fetch(`/api/candidatures/${selectedCandidature.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: editingStatus,
          notes: editingNotes,
        }),
      });

      if (response.ok) {
        await fetchCandidatures();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating candidature:", error);
    }
  };

  const stats = {
    total: candidatures.length,
    new: candidatures.filter((c) => c.status === "new").length,
    reviewed: candidatures.filter((c) => c.status === "reviewed").length,
    shortlisted: candidatures.filter((c) => c.status === "shortlisted").length,
    rejected: candidatures.filter((c) => c.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                Back Office Admin
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Gestion des candidatures - Téléprospecteurs
              </p>
            </div>
            <Button
              onClick={fetchCandidatures}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Nouvelles</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{stats.new}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Examinées</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {stats.reviewed}
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Présélectionnées
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {stats.shortlisted}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Rejetées</p>
                    <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold">✕</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les candidatures</SelectItem>
                  <SelectItem value="new">Nouvelles</SelectItem>
                  <SelectItem value="reviewed">Examinées</SelectItem>
                  <SelectItem value="shortlisted">Présélectionnées</SelectItem>
                  <SelectItem value="rejected">Rejetées</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-600">
                {filteredCandidatures.length} candidature(s)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidatures Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des candidatures</CardTitle>
            <CardDescription>
              Cliquez sur une ligne pour voir les détails complets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Chargement des candidatures...</p>
              </div>
            ) : filteredCandidatures.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Aucune candidature trouvée</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Expérience</TableHead>
                      <TableHead>Disponibilité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCandidatures.map((candidature) => (
                      <TableRow
                        key={candidature.id}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {format(
                              new Date(candidature.createdAt),
                              "dd MMM yyyy",
                              { locale: fr }
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(new Date(candidature.createdAt), "HH:mm")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {candidature.prenom} {candidature.nom}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Mail className="w-3 h-3" />
                              <span className="truncate max-w-[150px]">
                                {candidature.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Phone className="w-3 h-3" />
                              {candidature.telephone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {candidature.ville} ({candidature.codePostal})
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            {candidature.anneesExperience}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{candidature.disponibilite}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              statusColors[candidature.status]
                            } border`}
                          >
                            {statusLabels[candidature.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(candidature)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCandidature && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCandidature.prenom} {selectedCandidature.nom}
                </DialogTitle>
                <DialogDescription>
                  Candidature reçue le{" "}
                  {format(
                    new Date(selectedCandidature.createdAt),
                    "dd MMMM yyyy à HH:mm",
                    { locale: fr }
                  )}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="infos" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="infos">Informations</TabsTrigger>
                  <TabsTrigger value="experience">Expérience</TabsTrigger>
                  <TabsTrigger value="competences">Compétences</TabsTrigger>
                  <TabsTrigger value="admin">Gestion</TabsTrigger>
                </TabsList>

                <TabsContent value="infos" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Email</Label>
                      <p className="font-medium">{selectedCandidature.email}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Téléphone</Label>
                      <p className="font-medium">{selectedCandidature.telephone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Ville</Label>
                      <p className="font-medium">
                        {selectedCandidature.ville} ({selectedCandidature.codePostal})
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Disponibilité</Label>
                      <p className="font-medium">{selectedCandidature.disponibilite}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Type de contrat</Label>
                      <p className="font-medium">{selectedCandidature.contrat}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Modalité de travail</Label>
                      <p className="font-medium">{selectedCandidature.lieu}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Horaires</Label>
                      <p className="font-medium">{selectedCandidature.horaires}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Prétentions salariales</Label>
                      <p className="font-medium">{selectedCandidature.salaire}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-600">Motivation</Label>
                    <p className="mt-1 text-sm bg-gray-50 p-3 rounded-lg">
                      {selectedCandidature.motivation}
                    </p>
                  </div>

                  {selectedCandidature.objectifs && (
                    <div>
                      <Label className="text-gray-600">Objectifs professionnels</Label>
                      <p className="mt-1 text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedCandidature.objectifs}
                      </p>
                    </div>
                  )}

                  {selectedCandidature.cv && (
                    <div>
                      <Label className="text-gray-600">CV</Label>
                      <a
                        href={selectedCandidature.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline block mt-1"
                      >
                        {selectedCandidature.cv}
                      </a>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Expérience en téléprospection</Label>
                      <p className="font-medium">{selectedCandidature.experience}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Années d'expérience</Label>
                      <p className="font-medium">{selectedCandidature.anneesExperience}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Volume d'appels/jour</Label>
                      <p className="font-medium">{selectedCandidature.volumeAppels}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Connaissance ER</Label>
                      <p className="font-medium">{selectedCandidature.connaissance}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-600">Secteurs d'expérience</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCandidature.secteurs.map((secteur, index) => (
                        <Badge key={index} variant="outline">
                          {secteur}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-600">Solutions ER connues</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCandidature.solutionsConnues.map((solution, index) => (
                        <Badge key={index} variant="secondary">
                          {solution}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedCandidature.aidesConnues && (
                    <div>
                      <Label className="text-gray-600">Connaissance des aides</Label>
                      <p className="font-medium">{selectedCandidature.aidesConnues}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="competences" className="space-y-4">
                  <div>
                    <Label className="text-gray-600 mb-3 block">Auto-évaluation</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Communication orale</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded flex items-center justify-center ${
                                i <= selectedCandidature.communication
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Gestion des objections</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded flex items-center justify-center ${
                                i <= selectedCandidature.objections
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Persévérance</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-8 h-8 rounded flex items-center justify-center ${
                                i <= selectedCandidature.perseverance
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {i}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedCandidature.logiciels && (
                      <div>
                        <Label className="text-gray-600">Maîtrise CRM</Label>
                        <p className="font-medium">{selectedCandidature.logiciels}</p>
                      </div>
                    )}
                    {selectedCandidature.logicielsDetail && (
                      <div>
                        <Label className="text-gray-600">Logiciels CRM connus</Label>
                        <p className="font-medium">{selectedCandidature.logicielsDetail}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <div>
                    <Label htmlFor="status">Statut de la candidature</Label>
                    <Select value={editingStatus} onValueChange={setEditingStatus}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nouvelle</SelectItem>
                        <SelectItem value="reviewed">Examinée</SelectItem>
                        <SelectItem value="shortlisted">Présélectionnée</SelectItem>
                        <SelectItem value="rejected">Rejetée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes internes</Label>
                    <Textarea
                      id="notes"
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Ajoutez vos notes sur ce candidat..."
                      className="mt-1 min-h-[150px]"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="text-gray-600">Informations supplémentaires</Label>
                    <div className="mt-2 space-y-2 text-sm">
                      <p>
                        <strong>Source :</strong> {selectedCandidature.commentConnu}
                      </p>
                      {selectedCandidature.commentaires && (
                        <p>
                          <strong>Commentaires :</strong>{" "}
                          {selectedCandidature.commentaires}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleUpdateStatus} className="bg-green-600 hover:bg-green-700">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
