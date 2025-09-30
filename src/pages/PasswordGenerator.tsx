import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
import { Footer } from "../components/Footer";

export const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeLower, setIncludeLower] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState("");
    const [showToast, setShowToast] = useState(false);

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()-_=+[]{};:,.<>?";

    const generatePassword = () => {
        let chars = "";
        if (includeUpper) chars += upperChars;
        if (includeLower) chars += lowerChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;

        if (!chars) {
            setPassword("⚠️ Selecciona al menos un conjunto de caracteres.");
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            newPassword += chars[randomIndex];
        }

        setPassword(newPassword);
    };

    const handleCopy = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
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
                        Contraseña copiada al portapapeles ✅
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Generador de Contraseñas
            </h1>

            <p className="text-gray-400 mb-8 text-center max-w-3xl text-lg">
                Crea contraseñas seguras personalizando su longitud y los tipos de caracteres incluidos.
            </p>

            <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <label className="flex flex-col text-gray-300 text-sm w-full">
                        Longitud: <span className="font-bold text-white">{length}</span>
                        <input
                            type="range"
                            min={6}
                            max={64}
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full accent-[#aa0000] mt-2"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeUpper}
                            onChange={(e) => setIncludeUpper(e.target.checked)}
                            className="accent-[#aa0000] w-4 h-4"
                        />
                        Mayúsculas
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeLower}
                            onChange={(e) => setIncludeLower(e.target.checked)}
                            className="accent-[#aa0000] w-4 h-4"
                        />
                        Minúsculas
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                            className="accent-[#aa0000] w-4 h-4"
                        />
                        Números
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeSymbols}
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                            className="accent-[#aa0000] w-4 h-4"
                        />
                        Símbolos
                    </label>
                </div>
            </div>

            <div className="w-full max-w-3xl flex flex-col gap-4">
                <textarea
                    value={password}
                    readOnly
                    placeholder="Tu contraseña generada aparecerá aquí..."
                    className="w-full h-32 p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-lg font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                />

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={generatePassword}
                        className="px-6 py-3 bg-[#aa0000] text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        <FiRefreshCw className="w-5 h-5" />
                        Generar
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!password}
                        className="px-6 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <FiCopy className="w-5 h-5" />
                        Copiar
                    </button>
                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
