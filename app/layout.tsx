export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="ja">
        <body style={{maxWidth: 720, margin: '0 auto', padding: 16, fontFamily:'system-ui, -apple-system, Segoe UI, Roboto'}}>
          {children}
        </body>
      </html>
    );
  }
  