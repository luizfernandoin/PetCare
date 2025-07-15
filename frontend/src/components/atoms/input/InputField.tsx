import { Mail, KeyRound, User, Phone } from "lucide-react";
type inputType = "password" | "email" | "phone" | "name"

type InputFieldProps = {
    type?: inputType;
    placeholder: string;
}

const icon: Record<inputType, React.ReactNode>  = {
    email: <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>,
    password: <KeyRound size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>,
    phone: <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>,
    name: <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
}

export function InputField({
    type,
    placeholder
}: InputFieldProps) {
    return (
        <div className="relative">
            <input
                type={type}
                placeholder={placeholder}
                className="w-full p-3 pl-10 rounded-full border-none bg-gray-100 shadow-inner focus:outline-none"
            />
            {type && icon[type]}
        </div>
    )
}