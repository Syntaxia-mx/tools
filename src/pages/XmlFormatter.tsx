import { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiCopy } from "react-icons/fi";
import { Footer } from "../components/Footer";

const normalizeNewlines = (text: string) => text.replace(/\n{2,}/g, "\n");

const prettifyXML = (xml: string): string => {
    const PADDING = "    ";
    xml = normalizeNewlines(xml).trim();
    xml = xml.replace(/>\s+</g, "><");
    xml = xml.replace(/></g, ">\n<");

    const lines = xml.split("\n");
    let pad = 0;
    let formatted = "";

    lines.forEach((line) => {
        line = line.trim();
        const isClosingTag = /^<\/\w/.test(line);
        const isSelfClosing = /\/>$/.test(line);
        const isFullTagWithContent = /^<\w[^>]*>.*<\/\w[^>]*>$/.test(line);

        if (isClosingTag) pad = Math.max(pad - 1, 0);

        formatted += PADDING.repeat(pad) + line + "\n";

        if (!isClosingTag && !isSelfClosing && !isFullTagWithContent && /^<\w/.test(line)) {
            pad += 1;
        }
    });

    return formatted.trim();
};



const highlightXML = (xml: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    const tagRegex = /(<[^>]+>)/g;
    let lastIndex = 0;

    let match;
    while ((match = tagRegex.exec(xml)) !== null) {
        const fullTag = match[0];
        const offset = match.index;

        if (lastIndex < offset) {
            parts.push(
                <span key={lastIndex + "-text"} className="text-white">
                    {xml.slice(lastIndex, offset)}
                </span>
            );
        }

        if (fullTag.startsWith("<?")) {
            const inner = fullTag.slice(2, -2).trim();
            const innerParts: JSX.Element[] = [];
            const attrRegex = /(\w+)=("[^"]*")/g;
            let innerLastIndex = 0;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(inner)) !== null) {
                const [matchStr, attrName, attrValue] = attrMatch;
                const attrOffset = attrMatch.index;
                if (innerLastIndex < attrOffset) {
                    innerParts.push(
                        <span key={innerLastIndex + "-decl"} className="text-[#aa0000] font-semibold">
                            {inner.slice(innerLastIndex, attrOffset)}
                        </span>
                    );
                }
                innerParts.push(<span key={attrOffset + "-attr"} className="text-pink-400">{attrName}</span>);
                innerParts.push(<span key={attrOffset + "-equal"}>=</span>);
                innerParts.push(<span key={attrOffset + "-value"} className="text-green-400">{attrValue}</span>);
                innerLastIndex = attrOffset + matchStr.length;
            }
            if (innerLastIndex < inner.length) {
                innerParts.push(
                    <span key={innerLastIndex + "-rest"} className="text-[#aa0000] font-semibold">
                        {inner.slice(innerLastIndex)}
                    </span>
                );
            }
            parts.push(
                <span key={offset + "-decl"}>
                    <span className="text-[#aa0000] font-semibold">&lt;?</span>
                    {innerParts}
                    <span className="text-[#aa0000] font-semibold">?{">"}</span>
                </span>
            );
        } else {
            const inner = fullTag.slice(1, -1);
            const innerParts: JSX.Element[] = [];
            const attrRegex = /(\w+)=("[^"]*")|(\w+)/g;
            let innerLastIndex = 0;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(inner)) !== null) {
                const [matchStr, attrName, attrValue, loneWord] = attrMatch;
                const attrOffset = attrMatch.index;
                if (innerLastIndex < attrOffset) {
                    innerParts.push(
                        <span key={innerLastIndex + "-tag"} className="text-[#aa0000] font-semibold">
                            {inner.slice(innerLastIndex, attrOffset)}
                        </span>
                    );
                }
                if (attrName && attrValue) {
                    innerParts.push(<span key={attrOffset + "-attr"} className="text-pink-400">{attrName}</span>);
                    innerParts.push(<span key={attrOffset + "-equal"}>=</span>);
                    innerParts.push(<span key={attrOffset + "-value"} className="text-green-400">{attrValue}</span>);
                } else if (loneWord) {
                    innerParts.push(<span key={attrOffset + "-lone"} className="text-[#aa0000] font-semibold">{loneWord}</span>);
                }
                innerLastIndex = attrOffset + matchStr.length;
            }
            if (innerLastIndex < inner.length) {
                innerParts.push(
                    <span key={innerLastIndex + "-rest"} className="text-[#aa0000] font-semibold">
                        {inner.slice(innerLastIndex)}
                    </span>
                );
            }
            parts.push(
                <span key={offset + "-tag-wrapper"}>
                    <span className="text-[#aa0000] font-semibold">&lt;</span>
                    {innerParts}
                    <span className="text-[#aa0000] font-semibold">&gt;</span>
                </span>
            );
        }

        lastIndex = offset + fullTag.length;
    }

    if (lastIndex < xml.length) {
        parts.push(<span key={lastIndex + "-end"} className="text-white">{xml.slice(lastIndex)}</span>);
    }

    return parts;
};


export const XmlFormatter = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        if (!value.trim()) {
            setOutput("");
            setError("");
        } else {
            try {
                const pretty = prettifyXML(value);
                setOutput(pretty);
                setError("");
            } catch (err: any) {
                setOutput("");
                setError(err.message || "❌ XML inválido.");
            }
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
                XML Prettifier
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Formatea tu XML para que sea legible.
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
                        placeholder="Ingresa aquí tu XML..."
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
                        ) : output ? (
                            <>{highlightXML(output)}</>
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
