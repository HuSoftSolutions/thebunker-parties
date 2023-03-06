import '@/styles/globals.css';
import { Allerta } from 'next/font/google';
const inter = Allerta({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={`select-none ${inter.className}`}>
      <Component {...pageProps} />
    </main>
  );
}
