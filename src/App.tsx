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
import { ShaEncrypt } from "./pages/ShaEncrypt";
import { PasswordGenerator } from "./pages/PasswordGenerator";
import { JsonFormatter } from "./pages/JsonFormatter";
import { XmlFormatter } from "./pages/XmlFormatter";
import { QrGenerator } from "./pages/QrGenerator";

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
        <Route path="/sha-encrypt" element={<ShaEncrypt />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/json-prettifier" element={<JsonFormatter />} />
        <Route path="/xml-prettifier" element={<XmlFormatter />} />
        <Route path="/generate-qr" element={<QrGenerator />} />
      </Routes>
    </>
  );
}

export default App;
