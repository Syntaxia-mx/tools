import type { ReactNode } from "react";
import { Navbar } from "../components/Navbar";


interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <main className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};
