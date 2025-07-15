import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function RegistrationUser() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
            <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Cadastro</h2>
            <div className="space-y-4">
                <InputField type="name" placeholder="Nome" />
                <InputField type="email" placeholder="Email" />
                <InputField type="phone" placeholder="Telefone" />
                <InputField type="password" placeholder="Senha" />
                <Button className="w-full">Entrar</Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
                 Possui uma conta? <Link to="/auth/signin" className="text-[#3C6D7F] font-medium">Entre</Link>
            </div>
        </div>
    </div>
  )
}
