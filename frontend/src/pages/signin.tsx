import { BrandingSection } from '@/components/molecules/branding-section';
import { Login } from '@/components/molecules/login/index';


export function Signin() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-100 to-orange-50">
            <div className="flex w-full max-w-4xl h-[450px] bg-white rounded-lg overflow-hidden shadow-lg">
                <Login />
                <BrandingSection type='signin'/>
            </div>
        </div>
    );
}