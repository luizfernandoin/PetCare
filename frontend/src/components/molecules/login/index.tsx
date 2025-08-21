import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { Login as LoginType } from "@/types/auth";
import { Link } from "react-router";
import { loginSchema } from "@petcare/shared";
import { useFormValidation } from "@/hooks/useFormValidation";


const userDefault: LoginType = {
  email: "",
  password: ""
}

export function Login() {
  const { login } = useAuthStore();

  const {
    values: user,
    errors,
    handleChange,
    validateForm,
    isFormValid
  } = useFormValidation(userDefault, loginSchema);

  const handleLogin = async () => {
    if (!validateForm()) return;

    const result = await loginUser(user);
    if (!result) {
      console.error("Login falhou");
      return;
    }

    console.log("Result: " + JSON.stringify(result, null, 2));
    login(result.user, result.token);
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm">
        <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Entrar</h2>
        <div className="space-y-4">
          <div>
            <InputField
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="email"
              placeholder="Email"
              error={errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-3">{errors.email}</p>}
          </div>
          <div>
            <InputField
              value={user.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="password"
              placeholder="Senha"
              error={errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-3">{errors.password}</p>}
          </div>
          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={!isFormValid()}
          >
            Entrar
          </Button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Não possui uma conta? <Link to="/auth/signup" className="text-[#3C6D7F] font-medium">Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}
