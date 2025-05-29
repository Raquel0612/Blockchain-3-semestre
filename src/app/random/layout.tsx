import "../css/globals.css";
import "../css/random.css";

import Images from '../components/images';
import Header from '../components/header';

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