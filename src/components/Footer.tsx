import { Instagram, Youtube, Twitter } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";

export const Footer = () => {
    return (
        <footer className="bg-black text-gray-400 py-10 px-6 border-t border-zinc-800 mt-10">
            <h3 className="sr-only">Contacto y redes sociales de Syntaxia</h3>

            <div className="flex justify-center gap-6 text-2xl">
                <a
                    href="https://wa.me/5659747942"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contacta con Syntaxia por WhatsApp"
                    className="hover:text-green-500 transition-transform transform hover:scale-110"
                >
                    <SiWhatsapp />
                </a>
                <a
                    href="https://www.tiktok.com/@syntaxiamx"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sigue a Syntaxia en TikTok"
                    className="hover:text-pink-500 transition-transform transform hover:scale-110"
                >
                    <SiTiktok />
                </a>
                <a
                    href="https://www.youtube.com/@syntaxiaMx"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sigue a Syntaxia en YouTube"
                    className="hover:text-red-500 transition-transform transform hover:scale-110"
                >
                    <Youtube />
                </a>
                <a
                    href="https://www.instagram.com/syntaxiamx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sigue a Syntaxia en Instagram"
                    className="hover:text-pink-400 transition-transform transform hover:scale-110"
                >
                    <Instagram />
                </a>
                <a
                    href="https://x.com/SyntaxiaMx"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sigue a Syntaxia en X"
                    className="hover:text-blue-400 transition-transform transform hover:scale-110"
                >
                    <Twitter />
                </a>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
                © {new Date().getFullYear()} Syntaxia MX. Todos los derechos reservados.
            </div>
        </footer>
    );
};
