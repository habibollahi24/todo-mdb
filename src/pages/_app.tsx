import type { AppProps } from "next/app";
import "../styles/globals.css";

import Header from "../components/Header";
import Modal from "../components/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Modal>
      <Header />
      <div className="container mx-auto max-w-screen-lg p-3">
        <Component {...pageProps} />
      </div>
    </Modal>
  );
}

export default MyApp;
