import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { Footer } from "../components/Footer";

export const QrGenerator = () => {
    const [text, setText] = useState("https://example.com");
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [, setLogoFile] = useState<File | null>(null);
    const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const canvasRef = useRef<HTMLDivElement>(null);

    const QR_SIZE = 300;
    const LOGO_SIZE = 80;

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoDataUrl(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoFile(null);
            setLogoDataUrl(null);
        }
    };

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current.querySelector("canvas");
        if (!canvas) return;

        const tempCanvas = document.createElement("canvas");
        const ctx = tempCanvas.getContext("2d");
        if (!ctx) return;

        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        ctx.drawImage(canvas, 0, 0);

        if (logoDataUrl) {
            const img = new Image();
            img.src = logoDataUrl;
            img.onload = () => {
                const x = (canvas.width - LOGO_SIZE) / 2;
                const y = (canvas.height - LOGO_SIZE) / 2;
                const radius = 12;
                ctx.fillStyle = bgColor;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + LOGO_SIZE - radius, y);
                ctx.quadraticCurveTo(x + LOGO_SIZE, y, x + LOGO_SIZE, y + radius);
                ctx.lineTo(x + LOGO_SIZE, y + LOGO_SIZE - radius);
                ctx.quadraticCurveTo(x + LOGO_SIZE, y + LOGO_SIZE, x + LOGO_SIZE - radius, y + LOGO_SIZE);
                ctx.lineTo(x + radius, y + LOGO_SIZE);
                ctx.quadraticCurveTo(x, y + LOGO_SIZE, x, y + LOGO_SIZE - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();
                ctx.save();
                ctx.clip();
                ctx.drawImage(img, x, y, LOGO_SIZE, LOGO_SIZE);
                ctx.restore();

                const link = document.createElement("a");
                link.download = "qr.png";
                link.href = tempCanvas.toDataURL("image/png");
                link.click();

                setToastMessage("QR descargado ✅");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
            };
        }
        else {
            const link = document.createElement("a");
            link.download = "qr.png";
            link.href = tempCanvas.toDataURL("image/png");
            link.click();

            setToastMessage("QR descargado ✅");
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
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#aa0000] text-center">
                QR Generator
            </h1>

            <p className="text-gray-400 mb-6 text-center max-w-3xl text-lg">
                Genera un QR elegante. Personaliza colores, agrega un logo y descárgalo.
            </p>

            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                {/* Input */}
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ingresa texto o URL..."
                        className="w-full h-[120px] p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-[#aa0000] resize-none text-lg font-mono placeholder-gray-500"
                    />

                    <label className="flex flex-col mt-2">
                        Cargar logo (opcional)
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="mt-1 w-full text-sm text-white file:bg-zinc-700 file:border file:border-zinc-800 file:p-2 file:rounded-xl file:cursor-pointer file:hover:bg-zinc-600"
                        />
                    </label>

                    <div className="flex gap-2 mt-2">
                        <label className="flex-1 flex flex-col">
                            Color QR
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-full h-10 cursor-pointer rounded"
                            />
                        </label>
                        <label className="flex-1 flex flex-col">
                            Fondo
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full h-10 cursor-pointer rounded"
                            />
                        </label>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2 items-center">
                    <div
                        ref={canvasRef}
                        className="relative w-[300px] h-[300px] bg-white rounded-xl flex items-center justify-center"
                    >
                        <QRCodeCanvas
                            value={text}
                            size={QR_SIZE}
                            fgColor={fgColor}
                            bgColor={bgColor}
                            includeMargin={true}
                            level="H"
                        />
                        {logoDataUrl && (
                            <div
                                className="absolute flex items-center justify-center"
                                style={{
                                    width: LOGO_SIZE,
                                    height: LOGO_SIZE,
                                    overflow: "hidden",
                                    borderRadius: "12px",
                                    backgroundColor: bgColor,
                                }}
                            >
                                <img
                                    src={logoDataUrl}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4 w-full">
                        <button
                            onClick={handleDownload}
                            className="flex-1 p-2 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <FiDownload /> Descargar
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </motion.section>
    );
};
