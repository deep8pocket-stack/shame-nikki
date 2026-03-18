export const metadata = {
  title: '写メ日記メーカー',
  description: '風俗向けの写メ日記を簡単に生成するミニWebサービス',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
