import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth";
import {getProfile} from "@/services/user"
import { useAuthStore } from "@/stores/authStore";
import { Login as LoginType } from "@/types/auth";
import {userRoleBackendMapper} from "@/types/User"
import { useState } from "react";
import { Link, useNavigate } from "react-router";


export function Login() {
  const { setToken, setUser: setUserStore } = useAuthStore(); 
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginType>({
    email: "",
    senha: ""
  })

  const handleLogin = async ()=>{
    const token = await loginUser(user)
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      const profile = await getProfile();
      console.log(JSON.stringify(profile, null, 2));
      setUserStore({...profile, tipo: userRoleBackendMapper[profile.tipo!]});

      navigate("/");
    }
    else {
      console.log("Erro ao logar"); 
}
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
