// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Base64ToText } from "./pages/Base64ToText";
import { BytesToText } from "./pages/BytesToText";
import { FileToBase64 } from "./pages/FileToBase64";
import { HexToText } from "./pages/HexToText";
import { Home } from "./pages/Home";
import { TextToBase64 } from "./pages/TextToBase64";
import { TextToBytes } from "./pages/TextToBytes";
import { TextToHex } from "./pages/TextToHex";
import { Base64ToPDF } from "./pages/Base64ToPDF";
import { Base64ToFile } from "./pages/Base64ToFile";
import { BytesToPDF } from "./pages/BytesToPDF";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base64-to-text" element={<Base64ToText />} />
        <Route path="/text-to-base64" element={<TextToBase64 />} />
        <Route path="/bytes-to-text" element={<BytesToText />} />
        <Route path="/text-to-bytes" element={<TextToBytes />} />
        <Route path="/text-to-hex" element={<TextToHex />} />
        <Route path="/hex-to-text" element={<HexToText />} />
        <Route path="/file-to-base64" element={<FileToBase64 />} />
        <Route path="/base64-to-pdf" element={<Base64ToPDF />} />
        <Route path="/base64-to-file" element={<Base64ToFile />} />
        <Route path="/bytes-to-pdf" element={<BytesToPDF />} />
        <Route path="/sha-encrypt" element={<div>SHA Cifrado</div>} />
        <Route path="/password-generator" element={<div>Generador de Contraseñas</div>} />
        <Route path="/json-prettifier" element={<div>JSON Prettifier</div>} />
        <Route path="/xml-prettifier" element={<div>XML Prettifier</div>} />
        <Route path="/generate-qr" element={<div>Generar QR</div>} />
      </Routes>
    </>
  );
}

export default App;
