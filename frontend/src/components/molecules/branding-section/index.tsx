import { Logo } from "@/components/atoms/logo";

interface props {
    type?: "signin" | "signup"
}
export function BrandingSection({ type }: props) {
    const bgColor = type === "signup" ? "bg-[#3C6D7F]": "bg-[#F4E1D0]";
    const textColor = type === "signup" ? "text-white" : "text-[#3C6D7F]";
    return (
        <div className={`flex items-center justify-center flex-1 ${bgColor} rounded-r-lg`}>
            <div className="flex flex-col items-center">
                <Logo />
                <span className={`mt-4 font-semibold text-xl ${textColor}`}>PetCare</span>
            </div>
        </div>
    );

}