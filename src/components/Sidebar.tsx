import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Key, FileJson, QrCode, MessageSquare } from "lucide-react";
import { SiJsonwebtokens } from "react-icons/si";

const menuItems = [
    { name: "Inicio", path: "/", icon: <FileCode size={18} /> },
    { name: "Lazy Notes", path: "/lazy-notes", icon: <MessageSquare size={18} /> },
    { name: "Conversores", path: "/converters", icon: <SiJsonwebtokens size={18} /> },
    { name: "Hash & Seguridad", path: "/security", icon: <Key size={18} /> },
    { name: "JSON / XML", path: "/formatter", icon: <FileJson size={18} /> },
    { name: "Generador QR", path: "/qr", icon: <QrCode size={18} /> },
];

export const Sidebar: React.FC = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    // bloqueo de scroll cuando el panel móvil está abierto
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // cerrar con ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const isActive = (path: string) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

    return (
        <>
            {/* boton hamburguesa (visible solo en móvil) */}
            <button
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-zinc-900 text-gray-200 hover:bg-zinc-800 transition"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* overlay móvil */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        aria-hidden
                    />
                )}
            </AnimatePresence>

            {/* sidebar (overlay en móvil, fijo en md+) */}
            <motion.aside
                initial={{ x: -320 }}
                animate={{ x: open ? 0 : -320 }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
                className="
          fixed top-0 left-0 h-screen w-64 bg-black border-r border-zinc-800 flex flex-col z-50
          md:static md:translate-x-0 md:flex
        "
                aria-label="Menú lateral"
            >
                {/* header */}
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-white">Syntaxia Tools</h1>
                        <p className="text-xs text-gray-500">Utilidades para desarrolladores</p>
                    </div>

                    {/* cerrar (solo mobile) */}
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Cerrar menú"
                        className="md:hidden p-1 rounded hover:bg-zinc-800"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* nav */}
                <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Herramientas">
                    {menuItems.map((item, idx) => {
                        const active = isActive(item.path);
                        return (
                            <motion.div key={item.path} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive: navIsActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
                      ${navIsActive ? "bg-[#aa0000] text-white" : "text-gray-400 hover:bg-zinc-900 hover:text-white"}`
                                    }
                                    aria-current={active ? "page" : undefined}
                                    title={item.name}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </NavLink>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* footer */}
                <div className="p-4 border-t border-zinc-800 text-xs text-gray-600">
                    © {new Date().getFullYear()} Syntaxia MX
                </div>
            </motion.aside>
        </>
    );
};
