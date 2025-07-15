import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
            <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Entrar</h2>
            <div className="space-y-4">
                <InputField type="email" placeholder="Email" />
                <InputField type="password" placeholder="Senha" />
                <Button className="w-full">Entrar</Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
                Não possui uma conta? <Link to="/auth/signup" className="text-[#3C6D7F] font-medium">Cadastre-se</Link>
            </div>
        </div>
    </div>
  )
}
