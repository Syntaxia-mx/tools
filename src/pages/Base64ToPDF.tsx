import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { Footer } from "../components/Footer";

export const Base64ToPDF = () => {
    const [input, setInput] = useState("");
    const [pdfSrc, setPdfSrc] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.trim();
        setInput(value);

        if (value) {
            try {
                const dataUri = `data:application/pdf;base64,${value}`;
                setPdfSrc(dataUri);
            } catch {
                setPdfSrc(null);
            }
        } else {
            setPdfSrc(null);
        }
    };


    const handleClear = () => {
        setInput("");
        setPdfSrc(null);
    };

    return (
        <motion.section
            className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-20 relative"
        >


            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Base64 a PDF
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Ingresa tu Base64 de un PDF y visualízalo en tiempo real.
            </p>

            <div className="w-full max-w-5xl flex flex-col gap-4">
                <div className="relative flex flex-col">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleClear}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Borrar contenido"
                        >
                            <FiTrash2 className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleChange}
                        placeholder="Ingresa tu Base64 aquí..."
                        className="w-full h-40 p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-sm font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />
                </div>

                {pdfSrc && (
                    <iframe
                        src={pdfSrc}
                        title="PDF Viewer"
                        className="w-full h-[600px] rounded-xl border border-zinc-800"
                    />
                )}
            </div>

            <Footer />
        </motion.section>
    );
};
