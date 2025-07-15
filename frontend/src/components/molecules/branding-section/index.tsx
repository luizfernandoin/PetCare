import { Logo } from "@/components/atoms/logo";

export function BrandingSection() {
    return (
        <div className="flex items-center justify-center flex-1 bg-[#3C6D7F] rounded-r-lg">
            <div className="flex flex-col items-center">
                <Logo />
                <span className="mt-4 text-white font-semibold text-xl">PetCare</span>
            </div>
        </div>
    );

}