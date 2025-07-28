import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "@petcare/shared";
import { useFormValidation } from "@/hooks/useFormValidation";


export function Login() {
    const navigate = useNavigate();
    const {
        values: user,
        errors,
        handleChange,
        validateForm,
        isFormValid
    } = useFormValidation({
        email: "",
        senha: ""
    }, loginSchema);

    const handleLogin = async () => {
        if (!validateForm()) return;

        const token = await loginUser(user);
        if (token) {
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            console.log("Erro ao logar");
        }
    };

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
                            value={user.senha}
                            onChange={(e) => handleChange("senha", e.target.value)}
                            type="password"
                            placeholder="Senha"
                            error={errors.senha}
                        />
                        {errors.senha && <p className="text-red-500 text-xs mt-1 ml-3">{errors.senha}</p>}
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
