import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiRepeat, FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export const BytesToText = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);

        try {
            const bytesArray = value.split(",").map(b => parseInt(b.trim(), 10));
            const decoded = new TextDecoder().decode(new Uint8Array(bytesArray));
            setOutput(decoded);
        } catch {
            setOutput("Bytes inválidos");
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
    };

    const handleSwitchTool = () => {
        navigate("/text-to-bytes");
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    return (
        <motion.section
            className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-20 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Toast animado */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#aa0000] text-white px-6 py-3 rounded-lg shadow-lg z-50"
                    >
                        Resultado copiado al portapapeles ✅
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Bytes[] a Texto
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Ingresa tu arreglo de bytes separados por comas y obtén el texto decodificado en tiempo real.
            </p>

            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
                {/* Input con botones fuera del textarea */}
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleClear}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Borrar contenido"
                        >
                            <FiTrash2 className="text-white w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSwitchTool}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Cambiar a Texto a Bytes[]"
                        >
                            <FiRepeat className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={handleChange}
                        placeholder="Ingresa los bytes separados por comas..."
                        className="w-full h-[400px] p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#aa0000] resize-none text-lg font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />
                </div>

                {/* Output con botón copiar fuera del textarea */}
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Copiar al portapapeles"
                        >
                            <FiCopy className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Texto decodificado..."
                        className="w-full h-[400px] p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-lg font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />
                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
