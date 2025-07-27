import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { registerUser } from "@/services/auth"
import { UserCreate } from "@/types/User";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNavigate } from "react-router";

export function RegistrationUser() {
  const navigate = useNavigate();
  const [page, setPage] = useState<"user" | "location">("user");
  const [user, setUser] = useState<UserCreate>({
    nome: "jose",
    email: "jose4@gmail.com",
    telefone: "34999999999",
    senha: "123123",
    tipo: "CLIENTE",
    location: {
      street: "Avenida Paulista",
      number: "1578",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      postalcode: "01310-200"
    }
  })
  const alterPage = () => {
    if (page === "user") {setPage("location")}
    else {setPage("user")}
  }

  const handleRegistration = async () => {
    console.log(JSON.stringify(user, null, 2));
    const newUser = await registerUser(user);
    console.log(JSON.stringify(newUser, null, 2));

    if (newUser) {
      navigate("/auth/signin");
    } else {
      console.error("Falha ao registrar o usuário.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="grid grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white p-8 rounded-lg w-full max-w-sm min-h-[600px]">
        {page === "user" && (
          <>
            <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Dados do usuário</h2>
            <div className="space-y-4">
              <InputField type="name" placeholder="Nome" value={user.nome} onChange={(e) => setUser({ ...user, nome: e.target.value })} />
              <InputField type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              <InputField type="phone" placeholder="Telefone" value={user.telefone} onChange={(e) => setUser({ ...user, telefone: e.target.value })} />
              <InputField type="password" placeholder="Senha" value={user.senha} onChange={(e) => setUser({ ...user, senha: e.target.value })} />
              <RadioGroup defaultValue="CLIENTE" className="flex gap-8" onValueChange={(value) => setUser({ ...user, tipo: value as "CLIENTE" | "PROFISSIONAL" })}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="CLIENTE" id="r1"/>
                  <Label htmlFor="r1">Cliente</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="PROFISSIONAL" id="r2"/>
                  <Label htmlFor="r2">Profissional</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}
        {page === "location" && (
          <>
            <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Localidade</h2>
            <div className="space-y-4">
              <InputField type="name" placeholder="Pais" value={user.location.country} onChange={(e) => setUser({ ...user, location: { ...user.location, country: e.target.value } })} />
              <InputField type="name" placeholder="Estado" value={user.location.state} onChange={(e) => setUser({ ...user, location: { ...user.location, state: e.target.value } })} />
              <InputField type="name" placeholder="Cidade" value={user.location.city} onChange={(e) => setUser({ ...user, location: { ...user.location, city: e.target.value } })} />
              <InputField type="name" placeholder="Rua" value={user.location.street} onChange={(e) => setUser({ ...user, location: { ...user.location, street: e.target.value } })} />
              <InputField type="name" placeholder="Numero" value={user.location.number} onChange={(e) => setUser({ ...user, location: { ...user.location, number: e.target.value } })} />
              <InputField type="name" placeholder="Código Postal" value={user.location.postalcode} onChange={(e) => setUser({ ...user, location: { ...user.location, postalcode: e.target.value } })} />
            </div>
          </>
        )}
        <div>
          <div className="flex justify-between items-center gap-4 mt-2">
            {
              page === "user" ? (
                <Button onClick={alterPage} className="ml-auto">Proximo</Button>
              ) :
                (
                  <>
                    <Button onClick={alterPage} variant="outline" >Voltar</Button>
                    <Button onClick={handleRegistration}>Cadastrar</Button>
                  </>
                )
            }
          </div>
          <div className="mt-6 text-center text-sm text-gray-600">
            Possui uma conta? <Link to="/auth/signin" className="text-[#3C6D7F] font-medium">Entre</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
