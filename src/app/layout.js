import { Kanit, Pattaya, Pridi } from "next/font/google";
import "./globals.css";

const kanitFont = Kanit({
  subsets: ["thai", "latin"],
  variable: "--font-sans-thai",
  weight: ["300", "400", "500", "600", "700"],
});

const pattayaFont = Pattaya({
  subsets: ["thai", "latin"],
  variable: "--font-pattaya",
  weight: ["400"],
});

const pridiFont = Pridi({
  subsets: ["thai", "latin"],
  variable: "--font-pridi",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Makro-Click | ให้เช่ารถแม็คโคร รถดัมพ์ กรุงเทพฯ ปริมณฑล",
  description: "Makro-Click บริการให้เช่ารถแม็คโคร รถแบคโฮ (PC30, PC120) รถดัมพ์ 6 ล้อ 10 ล้อ รับเหมาเคลียร์ริ่งพื้นที่ ถมดิน ปรับหน้าดิน ทั่วกรุงเทพฯ และปริมณฑล รถใหม่พร้อมคนขับมืออาชีพ ราคามาตรฐาน",
  keywords: ["ให้เช่ารถแม็คโคร", "เช่ารถแบคโฮ", "เช่ารถดัมพ์", "รับเหมาถมที่", "เคลียร์ริ่งพื้นที่", "รถแม็คโคร กรุงเทพ", "รถดัมพ์ ปริมณฑล", "Makro-Click"],
  openGraph: {
    title: "Makro-Click | บริการให้เช่ารถแม็คโคร รถดัมพ์ กรุงเทพฯ ปริมณฑล",
    description: "บริการให้เช่ารถเครื่องจักรหนัก รถแม็คโคร รถดัมพ์ รับเคลียร์ริ่งพื้นที่ พร้อมคนขับมืออาชีพ",
    type: "website",
    locale: "th_TH",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${kanitFont.variable} ${pattayaFont.variable} ${pridiFont.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-slate-900 bg-slate-950">
        {children}
      </body>
    </html>
  );
}
