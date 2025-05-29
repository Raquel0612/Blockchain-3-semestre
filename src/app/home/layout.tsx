import "../css/globals.css";
import "../css/home.css";

import Images from '../components/images';
import Header from '../components/header';
import Footer from '../components/footer';

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <Images />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}