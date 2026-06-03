import { Playfair_Display, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  variable: "--font-sans-thai",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "THE GOLDEN DEVELOPMENT | ที่ปรึกษาสินเชื่อและบริการอสังหาริมทรัพย์",
  description: "ที่ปรึกษาสินเชื่ออสังหาริมทรัพย์ ช่วยคุณขอสินเชื่อที่เหมาะที่สุด เป็นเจ้าของบ้านและคอนโดในฝันง่ายกว่าที่คิด ปรึกษาฟรี!",
  keywords: ["ที่ปรึกษาสินเชื่อ", "สินเชื่อบ้าน", "คอนโด", "THE GOLDEN DEVELOPMENT", "บริการอสังหาริมทรัพย์", "ปิดหนี้ก่อนกู้", "ตรวจ defect"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${playfair.variable} ${ibmPlexThai.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-slate-900 bg-cream-50">
        {children}
      </body>
    </html>
  );
}
