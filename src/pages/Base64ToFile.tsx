import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiDownload, FiRepeat } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Base64ToFile = () => {
    const [input, setInput] = useState("");
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string>("bin");
    const [previewType, setPreviewType] = useState<"pdf" | "image" | "text" | null>(null);

    const navigate = useNavigate();

    const generateRandomName = (ext: string) => {
        const random = Math.random().toString(36).substring(2, 10);
        return `archivo_${random}.${ext}`;
    };

    const detectFileType = (base64: string): string => {
        try {
            const bytes = atob(base64).slice(0, 10);
            if (bytes.startsWith("%PDF-")) return "pdf";
            if (bytes.startsWith("\x89PNG")) return "png";
            if (bytes.startsWith("\xFF\xD8")) return "jpg";
            if (bytes.startsWith("GIF87a") || bytes.startsWith("GIF89a")) return "gif";
            if (/^[\x00-\x7F]*$/.test(bytes)) return "bin"; // ASCII
        } catch { }
        return "bin";
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.trim();
        setInput(value);

        if (!value) {
            setFileUrl(null);
            setPreviewType(null);
            setFileType("bin");
            return;
        }

        const type = detectFileType(value);
        setFileType(type);

        const mimeMap: Record<string, string> = {
            pdf: "application/pdf",
            txt: "text/plain",
            png: "image/png",
            jpg: "image/jpeg",
            gif: "image/gif",
            bin: "application/octet-stream",
        };

        try {
            const bytes = Uint8Array.from(atob(value), c => c.charCodeAt(0));
            const blob = new Blob([bytes], { type: mimeMap[type] || "application/octet-stream" });
            setFileUrl(URL.createObjectURL(blob));

            if (["pdf"].includes(type)) setPreviewType("pdf");
            else if (["png", "jpg", "gif"].includes(type)) setPreviewType("image");
            else if (type === "txt") setPreviewType("text");
            else setPreviewType(null);
        } catch {
            setFileUrl(null);
            setPreviewType(null);
        }
    };


    const handleClear = () => {
        setInput("");
        setFileUrl(null);
        setPreviewType(null);
        setFileType("bin");
    };

    const handleDownload = () => {
        if (!input) return;

        try {
            const bytes = Uint8Array.from(atob(input), c => c.charCodeAt(0));
            const blob = new Blob([bytes], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            const ext = previewType ? fileType : "bin";
            a.download = generateRandomName(ext);
            a.href = url;
            a.click();

            URL.revokeObjectURL(url);
        } catch {
            alert("Base64 inválido o error al generar el archivo");
        }
    };

    const handleSwitchTool = () => {
        navigate("/file-to-base64");
    };

    return (
        <motion.section
            className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-6 py-20 relative"
        >


            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                Base64 a Archivo
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Ingresa tu Base64. Vista previa solo para PDF, imágenes o texto. Otros archivos se descargan como .bin.
            </p>

            <div className="w-full max-w-5xl flex flex-col gap-4">
                <div className="relative flex flex-col gap-2">
                    <div className="flex gap-2 mb-2">
                        <button
                            onClick={handleClear}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Borrar contenido"
                        >
                            <FiTrash2 className="text-white w-5 h-5" />
                        </button>
                        {fileUrl && (
                            <button
                                onClick={handleDownload}
                                className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                                aria-label="Descargar archivo"
                            >
                                <FiDownload className="text-white w-5 h-5" />
                            </button>
                        )}

                        <button
                            onClick={handleSwitchTool}
                            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Regresar a File a Base64"
                        >
                            <FiRepeat className="text-white w-5 h-5" />
                        </button>
                    </div>

                    <textarea
                        value={input}
                        onChange={handleChange}
                        placeholder="Ingresa tu Base64 aquí..."
                        className="w-full h-40 p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none resize-none text-sm font-mono placeholder-gray-500 overflow-auto scrollbar-none"
                    />

                    {fileUrl && previewType === "pdf" && (
                        <iframe
                            src={fileUrl}
                            className="w-full h-[600px] rounded-xl border border-zinc-800"
                        />
                    )}
                    {fileUrl && previewType === "image" && (
                        <img
                            src={fileUrl}
                            alt="Preview"
                            className="w-full max-h-[600px] object-contain rounded-xl border border-zinc-800"
                        />
                    )}
                    {fileUrl && previewType === "text" && (
                        <pre className="w-full max-h-[600px] p-4 overflow-auto bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm">
                            {atob(input)}
                        </pre>
                    )}
                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
