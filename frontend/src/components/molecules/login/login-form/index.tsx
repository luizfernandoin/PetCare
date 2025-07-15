
import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";

export function LoginForm() {
    return (
        <div className="bg-white p-8 rounded-lg w-full max-w-sm shadow-md">
            <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">ACTION</h2>
            <div className="space-y-4">
                <InputField placeholder="Email" />
                <InputField type="password" placeholder="Senha" />
                <Button className="w-full">Entrar</Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
                Não possui uma conta? <a href="#" className="text-[#3C6D7F] font-medium">SignIn</a>
            </div>
        </div>
    );
}
