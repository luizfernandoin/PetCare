
type InputFieldProps = {
    type?: string;
    placeholder: string;
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
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👁️</span>
        </div>
    )
}