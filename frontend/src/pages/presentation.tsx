import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Presentation() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-[#3C6D7F]">PetCare</h1>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/pets">Meus Pets</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Minha Clinica</Link>
          </Button>
        </div>
      </header>

      {/* Main */}
      <main
        className="flex-1 flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 p-8 rounded-2xl shadow-lg max-w-xl space-y-6 -mt-30">
          <h2 className="text-3xl font-bold text-[#3C6D7F]">
            Bem-vindo ao PetCare 🐾
          </h2>
          <p className="text-lg text-gray-700">
            Cuidando com carinho do seu melhor amigo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth/signup">Sou Cliente</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth/signup">Sou Profissional</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
