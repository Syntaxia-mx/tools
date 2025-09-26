import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/syntaxia.png";

const categories = [
    {
        name: "Convertidores",
        tools: [
            { title: "Base64 a Texto", link: "/base64-to-text" },
            { title: "Texto a Base64", link: "/text-to-base64" },
            { title: "Archivo a Base64", link: "/file-to-base64" },
            { title: "Base64 a Archivo", link: "/base64-to-file" },
            { title: "Texto a Bytes[]", link: "/bytes-to-text" },
            { title: "Bytes[] a Texto", link: "/bytes-to-text" },
            { title: "Byte[] a PDF", link: "/bytes-to-pdf" },
            { title: "Texto a Hex", link: "/text-to-hex" },
            { title: "Hex a Texto", link: "/hex-to-text" },
        ],
    },
    {
        name: "Prettifiers",
        tools: [
            { title: "JSON Prettifier", link: "/json-prettifier" },
            { title: "XML Prettifier", link: "/xml-prettifier" },
        ],
    },
    {
        name: "Seguridad & Otros",
        tools: [
            { title: "SHA Cifrado", link: "/sha-encrypt" },
            { title: "Generar QR", link: "/generate-qr" },
        ],
    },
];

export const Navbar = () => {
    const navigate = useNavigate();
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <button
                onClick={() => navigate("/")}
                aria-label="Ir al inicio"
                className="flex items-center focus:outline-none transition-transform transform hover:scale-110"
            >
                <img src={logo} alt="Logo de Syntaxia" className="h-10 md:h-12 object-contain" />
            </button>

            {/* Categorías */}
            <div className="hidden md:flex gap-6 items-center">
                {categories.map((cat) => (
                    <div key={cat.name} className="relative">
                        <button
                            className="text-white font-medium hover:text-[#aa0000] transition-colors"
                            onMouseEnter={() => setOpenCategory(cat.name)}
                            onMouseLeave={() => setOpenCategory(null)}
                        >
                            {cat.name}
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                            {openCategory === cat.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden"
                                    onMouseEnter={() => setOpenCategory(cat.name)}
                                    onMouseLeave={() => setOpenCategory(null)}
                                >
                                    {cat.tools.map((tool) => (
                                        <a
                                            key={tool.title}
                                            href={tool.link}
                                            className="block px-4 py-2 text-gray-200 hover:bg-[#aa0000] hover:text-white transition-colors"
                                        >
                                            {tool.title}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </nav>
    );
};
