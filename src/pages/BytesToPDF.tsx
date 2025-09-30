import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiDownload } from "react-icons/fi";
import { Footer } from "../components/Footer";

export const BytesToPDF = () => {
    const [input, setInput] = useState("");
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [showToast] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.trim();
        setInput(value);

        if (!value) {
            setPdfUrl(null);
            return;
        }

        try {
            const byteArray = value.split(",").map(s => parseInt(s.trim(), 10));
            const uint8Array = new Uint8Array(byteArray);
            const blob = new Blob([uint8Array], { type: "application/pdf" });
            setPdfUrl(URL.createObjectURL(blob));
        } catch {
            setPdfUrl(null);
        }
    };

    const handleClear = () => {
        setInput("");
        setPdfUrl(null);
    };

    const handleDownload = () => {
        if (!pdfUrl) return;

        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = `archivo_${Math.random().toString(36).substring(2, 10)}.pdf`;
        a.click();

        URL.revokeObjectURL(pdfUrl);
    };

    return (
        <motion.section
            className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-20 relative"
        >
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#aa0000] text-white px-6 py-3 rounded-lg shadow-lg z-50"
                    >
                        PDF descargado ✅
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Byte[] a PDF
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Ingresa un array de bytes (separado por comas) y visualiza el PDF.
            </p>

            <div className="w-full max-w-5xl flex flex-col gap-4">
                <div className="flex gap-2 mb-2">
                    <button
                        onClick={handleClear}
                        className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                        aria-label="Borrar contenido"
                    >
                        <FiTrash2 className="text-white w-5 h-5" />
                    </button>
                    {pdfUrl && (
                        <button
                            onClick={handleDownload}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Descargar PDF"
                        >
                            <FiDownload className="text-white w-5 h-5" />
                        </button>
                    )}
                </div>

                <textarea
                    value={input}
                    onChange={handleChange}
                    placeholder="Ingresa tu array de bytes separados por comas..."
                    className="w-full h-40 p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-sm font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                />

                {pdfUrl && (
                    <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        className="w-full h-[600px] rounded-xl border border-zinc-800"
                    />
                )}
            </div>

            <Footer />
        </motion.section>
    );
};
