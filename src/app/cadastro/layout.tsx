import "../css/globals.css";
import "../css/cadastro.css";

import Images from '../components/images';
import Header from '../components/header-log';

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <Images />
        <Header />
        {children}
      </body>
    </html>
  );
}