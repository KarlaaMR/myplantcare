import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "MyPlantCare",
  description: "Bitácora y guía de plantas de interior y huerto urbano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}