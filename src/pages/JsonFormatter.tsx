import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCopy } from "react-icons/fi";
import { Footer } from "../components/Footer";

const highlightJSON = (json: string): JSX.Element[] => {
    const regex =
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    json.replace(regex, (match, _p1, _p2, p3, _p4, offset) => {
        if (lastIndex < offset) {
            parts.push(<span key={offset + "-plain"}>{json.slice(lastIndex, offset)}</span>);
        }

        let className = "";
        if (p3) className = "text-[#aa0000] font-semibold";
        else if (/^"/.test(match)) className = "text-pink-400";
        else if (/true|false/.test(match)) className = "text-yellow-400";
        else if (/null/.test(match)) className = "text-gray-400 italic";
        else className = "text-purple-400";

        parts.push(<span key={offset} className={className}>{match}</span>);
        lastIndex = offset + match.length;
        return match;
    });

    if (lastIndex < json.length) {
        parts.push(<span key={lastIndex + "-rest"}>{json.slice(lastIndex)}</span>);
    }

    return parts;
};

export const JsonFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");

    const prettify = (value: string) => {
        try {
            const parsed = JSON.parse(value);
            const pretty = JSON.stringify(parsed, null, 4);
            setOutput(pretty);
            setError("");
        } catch (err: any) {
            setOutput("");
            setError(err.message || "❌ JSON inválido.");
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        if (!value.trim()) {
            setOutput("");
            setError("");
        } else {
            prettify(value);
        }
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        }
    };



    const displayedOutput = output;

    return (
        <motion.section className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-20 relative">
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
                JSON Prettifier
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Formatea tu JSON para hacerlo legible.
            </p>

            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
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
                        placeholder='Ingresa aquí tu JSON...'
                        className="w-full h-[400px] p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#aa0000] resize-none text-lg font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2 mb-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Copiar al portapapeles"
                        >
                            <FiCopy className="text-white w-5 h-5" />
                        </button>
                    </div>

                    <div className="w-full h-[400px] p-6 rounded-xl bg-zinc-900 border border-zinc-800 overflow-auto scrollbar-none font-mono text-sm whitespace-pre break-words">
                        {error ? (
                            <pre className="text-red-400 text-sm">{error}</pre>
                        ) : displayedOutput ? (
                            <>{highlightJSON(displayedOutput)}</>
                        ) : (
                            <span className="text-gray-500">Aquí verás el resultado...</span>
                        )}
                    </div>

                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
