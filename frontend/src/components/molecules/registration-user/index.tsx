import { InputField } from "@/components/atoms/input/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { registerUser } from "@/services/auth"
import { UserCreate } from "@/types/User";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNavigate } from "react-router";
import { userSchema } from "@petcare/shared";
import { useFormValidation } from "@/hooks/useFormValidation";

import { defaultUser } from "./data";
import { USER_ROLE } from "@petcare/shared/enums";

export function RegistrationUser() {
    const navigate = useNavigate();
    const [page, setPage] = useState<"user" | "location">("user");

    const {
        values: user,
        errors,
        handleChange,
        validateForm,
        isFormValid
    } = useFormValidation<UserCreate>(defaultUser, userSchema);

    const alterPage = () => {
        if (page === "user") {
            setPage("location")
        }
        else { setPage("user") }
    }

    const handleRegistration = async () => {
        if (!validateForm()) return;

        const newUser = await registerUser(user);

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
                        <p>{isFormValid()}</p>
                        <div className="space-y-4">
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Nome"
                                    value={user.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-3">{errors.name}</p>}
                            </div>
                            <div>
                                <InputField
                                    type="email"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1 ml-3">{errors.email}</p>}
                            </div>
                            <div>
                                <InputField
                                    type="phone"
                                    placeholder="Telefone"
                                    value={user.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-3">{errors.phone}</p>}
                            </div>
                            <div>
                                <InputField
                                    type="password"
                                    placeholder="Senha"
                                    value={user.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1 ml-3">{errors.password}</p>}
                            </div>
                            <div>
                                <RadioGroup
                                    defaultValue={USER_ROLE.CLIENT}
                                    className="flex gap-8"
                                    onValueChange={(value) => handleChange("role", value as USER_ROLE)}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value={USER_ROLE.CLIENT} id="r1" />
                                        <Label htmlFor="r1">Cliente</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value={USER_ROLE.PROFESSIONAL} id="r2" />
                                        <Label htmlFor="r2">Profissional</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </>
                )}
                {page === "location" && (
                    <>
                        <h2 className="text-center text-xl font-semibold text-[#3C6D7F] mb-6">Localidade</h2>
                        <div className="space-y-4">
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Pais"
                                    value={user.location.country}
                                    onChange={(e) => handleChange("location", { ...user.location, country: e.target.value })}
                                />

                            </div>
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Estado"
                                    value={user.location.state}
                                    onChange={(e) => handleChange("location", { ...user.location, state: e.target.value })}
                                />

                            </div>
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Cidade"
                                    value={user.location.city}
                                    onChange={(e) => handleChange("location", { ...user.location, city: e.target.value })}
                                />

                            </div>
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Rua"
                                    value={user.location.street}
                                    onChange={(e) => handleChange("location", { ...user.location, street: e.target.value })}
                                />

                            </div>
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Numero"
                                    value={user.location.number}
                                    onChange={(e) => handleChange("location", { ...user.location, number: e.target.value })}
                                />

                            </div>
                            <div>
                                <InputField
                                    type="name"
                                    placeholder="Código Postal"
                                    value={user.location.postalcode}
                                    onChange={(e) => handleChange("location", { ...user.location, postalcode: e.target.value })}
                                />
                            </div>
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
                                        <Button
                                            onClick={handleRegistration}
                                            disabled={!isFormValid()}
                                        >
                                            Cadastrar
                                        </Button>
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
