import Link from 'next/link';

export default function Home() {
  const linkStyle = { padding:'8px 12px', border:'1px solid #ccc', borderRadius:6, display:'inline-block' } as const;
  return (
    <div>
      <h1>30秒仕事診断</h1>
      <p>VI/JA 対応の超高速診断。6タップであなたの進路プランを返します。</p>
      <div style={{display:'flex', gap:12}}>
        <Link href="/diagnose?lang=ja" style={linkStyle}>日本語で開始</Link>
        <Link href="/diagnose?lang=vi" style={linkStyle}>Tiếng Việt</Link>
      </div>
    </div>
  );
}
