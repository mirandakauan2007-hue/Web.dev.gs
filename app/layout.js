import './globals.css';

export const metadata = {
  title: 'LotaTrem | Viaje com mais conforto',
  description: 'Consulte a lotação da estação, escolha o melhor horário e compartilhe avisos de viagem.',
};

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
