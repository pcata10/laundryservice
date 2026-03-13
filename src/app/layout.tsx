import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AquaClean | Servizi di Lavanderia Professionali',
  description: 'Servizi premium di lavanderia e lavaggio a secco con prenotazione online e ritiro a domicilio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
            <div className="container">
              <p>&copy; {new Date().getFullYear()} AquaClean. Tutti i diritti riservati.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
