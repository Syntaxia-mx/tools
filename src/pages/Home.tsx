import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

const tools = [
    {
        category: "Conversores",
        items: [
            { title: "Base64 a Texto", desc: "Convierte cadenas en Base64 a texto legible.", link: "/base64-to-text" },
            { title: "Texto a Base64", desc: "Convierte texto a Base64 fácilmente.", link: "/text-to-base64" },
            { title: "Bytes[] a Texto", desc: "Transforma arreglos de bytes a texto en un clic.", link: "/bytes-to-text" },
            { title: "Texto a Bytes[]", desc: "Transforma texto en arreglos de bytes en un clic.", link: "/text-to-bytes" },
            { title: "Texto a Hex", desc: "Convierte texto a su representación en Hex.", link: "/text-to-hex" },
            { title: "Hex a Texto", desc: "Convierte datos Hex a texto legible.", link: "/hex-to-text" },
            { title: "Archivo a Base64", desc: "Convierte cualquier archivo a Base64.", link: "/file-to-base64" },
            { title: "Base64 a Archivo", desc: "Convierte Base64 de vuelta a archivos descargables.", link: "/base64-to-file" },
            { title: "Base64 a PDF", desc: "Convierte cualquier archivo a PDF.", link: "/base64-to-pdf" },
            { title: "Byte[] a PDF", desc: "Transforma arreglos de bytes directamente en archivos PDF.", link: "/bytes-to-pdf" },
        ],
    },
    {
        category: "Seguridad",
        items: [
            { title: "SHA Cifrado", desc: "Genera claves seguras aplicando algoritmos SHA.", link: "/sha-encrypt" },
            { title: "Generador de Contraseñas", desc: "Crea contraseñas seguras de forma rápida y confiable.", link: "/password-generator" },
        ],
    },
    {
        category: "Prettifiers",
        items: [
            { title: "JSON Prettifier", desc: "Da formato legible y bonito a tus archivos JSON.", link: "/json-prettifier" },
            { title: "XML Prettifier", desc: "Da formato legible y bonito a tus archivos XML.", link: "/xml-prettifier" },
        ],
    },
    {
        category: "Otros",
        items: [
            { title: "Generar QR", desc: "Crea tus propios códigos QR de manera rápida.", link: "/generate-qr" },
        ],
    },
];

export const Home = () => {
    const navigate = useNavigate();
    return (
        <section className="min-h-screen bg-black text-white px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#aa0000]"
            >
                Herramientas para Desarrolladores
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-400 mb-16 max-w-3xl mx-auto text-center text-lg"
            >
                Explora nuestras herramientas diseñadas para aumentar tu productividad y facilitar tu trabajo como desarrollador.
            </motion.p>

            {/* Categorías */}
            {tools.map((category, catIndex) => (
                <div key={catIndex} className="mb-12 w-full max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold mb-6 text-[#aa0000]"
                    >
                        {category.category}
                    </motion.h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {category.items.map((tool, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-[#aa0000] cursor-pointer shadow-lg flex flex-col justify-between"
                                role="listitem"
                                onClick={() => navigate(tool.link)}
                            >
                                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                                <p className="text-gray-400 text-sm">{tool.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
            <Footer />
        </section>

    );
};
