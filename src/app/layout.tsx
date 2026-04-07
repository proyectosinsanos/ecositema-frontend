import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * General Sans — self-hosted en /public/fonts/
 * Agregar los archivos .woff2 antes de correr el proyecto.
 * Descargar desde: https://www.fontshare.com/fonts/general-sans
 */
const generalSans = localFont({
  src: [
    { path: "../../public/fonts/GeneralSans-Light.woff2",      weight: "300", style: "normal" },
    { path: "../../public/fonts/GeneralSans-Regular.woff2",    weight: "400", style: "normal" },
    { path: "../../public/fonts/GeneralSans-Medium.woff2",     weight: "500", style: "normal" },
    { path: "../../public/fonts/GeneralSans-Semibold.woff2",   weight: "600", style: "normal" },
    { path: "../../public/fonts/GeneralSans-Bold.woff2",       weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecosistema | Cistem Labs",
  description: "Pantalla de inicio del ecosistema de microservicios de Cistem Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={generalSans.variable}>
      <head>
        {/* Material Symbols Outlined — iconos via Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
