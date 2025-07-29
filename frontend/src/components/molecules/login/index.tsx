import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { Login as LoginType } from "@/types/auth";
import { useState } from "react";
import { Link } from "react-router";

const userDefault = {
  email: "",
  senha: ""
}

export function Login() {
  const { login } = useAuthStore();
  const [user, setUser] = useState<LoginType>(userDefault);

  const handleLogin = async () => {
    const result = await loginUser(user);
    if (!result) {
      console.error("Login falhou");
      return;
    }

    login(result.user, result.token);
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Entrar</h2>
        <div className="space-y-4">
          <InputField value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" placeholder="Email" />
          <InputField value={user.senha} onChange={(e) => setUser({ ...user, senha: e.target.value })} type="password" placeholder="Senha" />
          <Button onClick={handleLogin} className="w-full">Entrar</Button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Não possui uma conta? <Link to="/auth/signup" className="text-[#3C6D7F] font-medium">Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}
