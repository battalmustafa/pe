"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, UserPlus, Search, Mail, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample session data
const sessionData = {
  "1": {
    id: "1",
    title: "Hikaye Yaratım Kurgu Şantiyesi",
    maxParticipants: 15,
  },
  "2": {
    id: "2",
    title: "Gerilim Kurgusu Şantiyesi",
    maxParticipants: 12,
  },
  "3": {
    id: "3",
    title: "Yeni Yazarlar Platformu",
    maxParticipants: 20,
  },
  "4": {
    id: "4",
    title: "Karakter Oluşturma Teknikleri",
    maxParticipants: 15,
  },
  "5": {
    id: "5",
    title: "İleri Düzey Diyalog Yazımı",
    maxParticipants: 12,
  }
};

// Sample participants data
const participantsData = {
  "1": [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", registrationDate: "10 Haziran 2023", status: "confirmed" },
    { id: 2, name: "Zeynep Kaya", email: "zeynep@example.com", registrationDate: "12 Haziran 2023", status: "confirmed" },
    { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", registrationDate: "15 Haziran 2023", status: "confirmed" },
    { id: 4, name: "Ayşe Çelik", email: "ayse@example.com", registrationDate: "18 Haziran 2023", status: "pending" },
    { id: 5, name: "Can Koç", email: "can@example.com", registrationDate: "20 Haziran 2023", status: "confirmed" },
    { id: 6, name: "Deniz Şahin", email: "deniz@example.com", registrationDate: "22 Haziran 2023", status: "confirmed" },
    { id: 7, name: "Elif Arslan", email: "elif@example.com", registrationDate: "25 Haziran 2023", status: "confirmed" },
  ],
  "2": [
    { id: 1, name: "Cem Yılmaz", email: "cem@example.com", registrationDate: "5 Temmuz 2023", status: "confirmed" },
    { id: 2, name: "Seda Öztürk", email: "seda@example.com", registrationDate: "7 Temmuz 2023", status: "confirmed" },
    { id: 3, name: "Burak Kara", email: "burak@example.com", registrationDate: "8 Temmuz 2023", status: "pending" },
    { id: 4, name: "Gizem Aydın", email: "gizem@example.com", registrationDate: "10 Temmuz 2023", status: "confirmed" },
    { id: 5, name: "Tolga Çetin", email: "tolga@example.com", registrationDate: "12 Temmuz 2023", status: "pending" },
    { id: 6, name: "Selin Yıldız", email: "selin@example.com", registrationDate: "15 Temmuz 2023", status: "confirmed" },
    { id: 7, name: "Mert Özkan", email: "mert@example.com", registrationDate: "18 Temmuz 2023", status: "confirmed" },
  ],
  "3": [
    { id: 1, name: "Ebru Korkmaz", email: "ebru@example.com", registrationDate: "1 Ağustos 2023", status: "confirmed" },
    { id: 2, name: "Hakan Tekin", email: "hakan@example.com", registrationDate: "3 Ağustos 2023", status: "confirmed" },
    { id: 3, name: "İrem Aksu", email: "irem@example.com", registrationDate: "4 Ağustos 2023", status: "confirmed" },
    { id: 4, name: "Barış Güneş", email: "baris@example.com", registrationDate: "5 Ağustos 2023", status: "pending" },
    { id: 5, name: "Derya Şen", email: "derya@example.com", registrationDate: "6 Ağustos 2023", status: "confirmed" },
    { id: 6, name: "Emre Yıldırım", email: "emre@example.com", registrationDate: "7 Ağustos 2023", status: "confirmed" },
    { id: 7, name: "Gamze Erdem", email: "gamze@example.com", registrationDate: "8 Ağustos 2023", status: "confirmed" },
    { id: 8, name: "Oğuz Tanrıverdi", email: "oguz@example.com", registrationDate: "9 Ağustos 2023", status: "pending" },
  ],
  "4": [
    { id: 1, name: "Canan Doğan", email: "canan@example.com", registrationDate: "10 Mayıs 2023", status: "confirmed" },
    { id: 2, name: "Levent Kılıç", email: "levent@example.com", registrationDate: "11 Mayıs 2023", status: "confirmed" },
    { id: 3, name: "Pınar Kaya", email: "pinar@example.com", registrationDate: "12 Mayıs 2023", status: "confirmed" },
    { id: 4, name: "Serkan Çelik", email: "serkan@example.com", registrationDate: "13 Mayıs 2023", status: "confirmed" },
    { id: 5, name: "Tülin Aksoy", email: "tulin@example.com", registrationDate: "14 Mayıs 2023", status: "confirmed" },
  ],
  "5": [
    { id: 1, name: "Arda Turan", email: "arda@example.com", registrationDate: "1 Nisan 2023", status: "confirmed" },
    { id: 2, name: "Berna Yılmaz", email: "berna@example.com", registrationDate: "2 Nisan 2023", status: "confirmed" },
    { id: 3, name: "Cenk Tosun", email: "cenk@example.com", registrationDate: "3 Nisan 2023", status: "confirmed" },
    { id: 4, name: "Duygu Özkan", email: "duygu@example.com", registrationDate: "4 Nisan 2023", status: "confirmed" },
    { id: 5, name: "Erkan Zengin", email: "erkan@example.com", registrationDate: "5 Nisan 2023", status: "confirmed" },
    { id: 6, name: "Funda Arar", email: "funda@example.com", registrationDate: "6 Nisan 2023", status: "confirmed" },
    { id: 7, name: "Gökhan Özoğuz", email: "gokhan@example.com", registrationDate: "7 Nisan 2023", status: "confirmed" },
    { id: 8, name: "Hande Yener", email: "hande@example.com", registrationDate: "8 Nisan 2023", status: "confirmed" },
    { id: 9, name: "İbrahim Tatlıses", email: "ibrahim@example.com", registrationDate: "9 Nisan 2023", status: "confirmed" },
    { id: 10, name: "Kenan Doğulu", email: "kenan@example.com", registrationDate: "10 Nisan 2023", status: "confirmed" },
  ]
};

export default function ParticipantsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const session = sessionData[id as keyof typeof sessionData];
  const participants = participantsData[id as keyof typeof participantsData] || [];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [newParticipant, setNewParticipant] = useState({ name: "", email: "" });
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <h2 className="text-2xl font-bold mb-2">Kurgu Şantiyesi Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">Bu kurgu şantiyesi bulunamadı veya silinmiş olabilir.</p>
        <Button asChild>
          <Link href="/admin/sessions">Kurgu Şantiyelerine Dön</Link>
        </Button>
      </div>
    );
  }
  
  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddParticipant = () => {
    setLoading(true);
    // In a real application, you would send a request to your API to add the participant
    setTimeout(() => {
      setLoading(false);
      setIsAddDialogOpen(false);
      setNewParticipant({ name: "", email: "" });
      // Show success message or handle errors
    }, 1000);
  };
  
  const handleSendEmail = () => {
    setLoading(true);
    // In a real application, you would send a request to your API to send emails
    setTimeout(() => {
      setLoading(false);
      setIsEmailDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
      setSelectedParticipants([]);
      // Show success message or handle errors
    }, 1000);
  };
  
  const handleRemoveParticipant = (participantId: number) => {
    // In a real application, you would send a request to your API to remove the participant
    console.log(`Removing participant with ID: ${participantId}`);
  };
  
  const toggleSelectParticipant = (participantId: number) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };
  
  const selectAllParticipants = () => {
    if (selectedParticipants.length === participants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(participants.map(p => p.id));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push(`/admin/sessions/${id}`)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            {session.title} - Katılımcılar
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary text-primary hover:bg-primary/10"
                disabled={selectedParticipants.length === 0}
              >
                <Mail className="mr-2 h-4 w-4" />
                E-posta Gönder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Katılımcılara E-posta Gönder</DialogTitle>
                <DialogDescription>
                  Seçili {selectedParticipants.length} katılımcıya e-posta gönderin
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Konu</Label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="E-posta konusu"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">İçerik</Label>
                  <Input
                    id="content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="E-posta içeriği"
                    className="h-32"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  İptal
                </Button>
                <Button className="bg-primary" onClick={handleSendEmail} disabled={loading}>
                  {loading ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90"
                disabled={participants.length >= session.maxParticipants}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Katılımcı Ekle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Katılımcı Ekle</DialogTitle>
                <DialogDescription>
                  {session.title} kurgu şantiyesine yeni bir katılımcı ekleyin
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                    placeholder="Katılımcının adı soyadı"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  İptal
                </Button>
                <Button className="bg-primary" onClick={handleAddParticipant} disabled={loading}>
                  {loading ? "Ekleniyor..." : "Ekle"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{participants.length}</span> / {session.maxParticipants} katılımcı
          </div>
          {participants.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllParticipants}
            >
              {selectedParticipants.length === participants.length
                ? "Tümünü Kaldır"
                : "Tümünü Seç"}
            </Button>
          )}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Katılımcı ara..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedParticipants.length === participants.length}
                  onChange={selectAllParticipants}
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead>Ad Soyad</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Kayıt Tarihi</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32">
                  {searchTerm ? (
                    <p className="text-muted-foreground">Arama sonucu bulunamadı</p>
                  ) : (
                    <p className="text-muted-foreground">Bu kurgu şantiyesinde katılımcı bulunmuyor</p>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(participant.id)}
                      onChange={() => toggleSelectParticipant(participant.id)}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.registrationDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      participant.status === "confirmed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {participant.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Menü</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedParticipants([participant.id]);
                            setIsEmailDialogOpen(true);
                          }}
                          className="text-blue-600"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          <span>E-posta Gönder</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemoveParticipant(participant.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Katılımcıyı Kaldır</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 