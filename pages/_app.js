import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <main className="select-none">
      <Component {...pageProps} />
    </main>
  );
}
