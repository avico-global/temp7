import { Frank_Ruhl_Libre } from "next/font/google";
import "@/styles/globals.css";

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={frankRuhlLibre.className}>
      <Component {...pageProps} />
    </div>
  );
}
