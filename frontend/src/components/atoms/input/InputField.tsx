import { Mail, KeyRound, User, Phone } from "lucide-react";
import { ComponentProps } from "react";
type inputType = "password" | "email" | "phone" | "name"

interface InputFieldProps extends ComponentProps<"input"> {
    type?: inputType,
    error?: string,
}

const icon: Record<inputType, React.ReactNode> = {
    email: <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />,
    password: <KeyRound size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />,
    phone: <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />,
    name: <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
}

export function InputField({
    type,
    error,
    ...props
}: InputFieldProps) {
    return (
        <div className="relative">
            <input
                {...props}
                className={`w-full p-3 pl-10 rounded-full border-none bg-gray-100 shadow-inner focus:outline-none ${
                    error ? "ring-2 ring-red-500" : ""
                }`}
            />
            {type && icon[type]}
        </div>
    )
}