import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiRepeat } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export const FileToBase64 = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [output, setOutput] = useState("");
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            setOutput(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };

    const handleSwitchTool = () => {
        navigate("/base64-to-file");
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
                        Base64 copiado al portapapeles ✅
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Archivo a Base64
            </h1>

            <p className="text-gray-400 mb-12 text-center max-w-3xl text-lg">
                Selecciona un archivo o arrástralo al área para obtener su cadena Base64.
            </p>

            <div className="w-full max-w-3xl flex flex-col gap-4">
                <label
                    htmlFor="fileInput"
                    className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer hover:border-[#aa0000] transition-colors bg-zinc-900"
                >
                    <span className="text-gray-400 text-center">
                        {fileName ? `Archivo: ${fileName}` : "Arrastra un archivo aquí o haz clic para seleccionar"}
                    </span>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <div className="relative flex flex-col gap-2">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Copiar al portapapeles"
                        >
                            <FiCopy className="text-white w-5 h-5" />
                        </button>

                        <button
                            onClick={handleSwitchTool}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Cambiar a Base64 a Archivo"
                        >
                            <FiRepeat className="text-white w-5 h-5" />
                        </button>
                    </div>

                    <textarea
                        value={output}
                        readOnly
                        placeholder="Base64 generado..."
                        className="w-full h-64 p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-sm font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />
                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
