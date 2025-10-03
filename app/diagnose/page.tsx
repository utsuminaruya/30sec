'use client';
import { useMemo, useState } from 'react';
import { StepButtons } from '../../components/StepButtons';
import { t } from '../../lib/texts';
import type { Answers, Plan, Lang } from '../../types';
import { useSearchParams } from 'next/navigation';

export default function DiagnosePage() {
  const sp = useSearchParams();
  const lang = (sp.get('lang') as Lang) || 'ja';
  const source = (sp.get('source') as Answers['source']) || 'web';
  const i18n = useMemo(()=>t(lang),[lang]);

  const [ans,setAns] = useState<Answers>({
    lang, source, purpose:'care', residency:'in_japan',
    prefecture:'tokyo', nihongo:'N4', care_exp:false, housing:'dorm'
  });

  const [plan, setPlan] = useState<Plan|null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch('/api/plan', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(ans)
    });
    const data = await res.json();
    setPlan(data as Plan);
    setLoading(false);
  };

  const btnStyle = { padding:'8px 12px', border:'1px solid #ccc', borderRadius:6 };

  return (
    <div>
      <h1 style={{fontSize:20, fontWeight:700, marginBottom:12}}>{i18n.title}</h1>

      <StepButtons label={i18n.steps.purpose}  options={i18n.options.purpose}  value={ans.purpose}  onSelect={k=>setAns({...ans, purpose: k as any})}/>
      <StepButtons label={i18n.steps.residency} options={i18n.options.residency} value={ans.residency} onSelect={k=>setAns({...ans, residency: k as any})}/>
      <StepButtons label={i18n.steps.prefecture} options={i18n.options.prefecture} value={ans.prefecture} onSelect={k=>setAns({...ans, prefecture: k as any})}/>
      <StepButtons label={i18n.steps.nihongo} options={i18n.options.nihongo} value={ans.nihongo} onSelect={k=>setAns({...ans, nihongo: k as any})}/>
      <StepButtons label={i18n.steps.care_exp} options={i18n.options.care_exp} value={String(ans.care_exp)} onSelect={k=>setAns({...ans, care_exp: k==='true'})}/>
      <StepButtons label={i18n.steps.housing} options={i18n.options.housing} value={ans.housing} onSelect={k=>setAns({...ans, housing: k as any})}/>

      <button onClick={submit} style={btnStyle} disabled={loading}>
        {loading ? 'Loading...' : i18n.steps.submit}
      </button>

      {plan && (
        <div style={{marginTop:16}}>
          <h2 style={{fontSize:18, fontWeight:600}}>✅ {i18n.resultTitle}</h2>

          <div style={{marginTop:8}}>
            <div style={{fontWeight:600}}>{i18n.jobs}</div>
            <ul>
              {plan.jobs.map(j=>(
                <li key={j.id}>
                  {j.facility_name}（{j.prefecture.toUpperCase()} {j.city ?? ''}） / {j.title}
                  {j.apply_url ? <> — <a style={{textDecoration:'underline'}} href={j.apply_url} target="_blank">Apply</a></> : null}
                </li>
              ))}
            </ul>
          </div>

          <div style={{marginTop:8}}>
            <div style={{fontWeight:600}}>{i18n.tasks}</div>
            <ol>
              {plan.tasks.map(t=>(
                <li key={t.id}><span style={{fontWeight:600}}>{t.title}</span>{t.description?`: ${t.description}`:''}</li>
              ))}
            </ol>
          </div>

          <div style={{marginTop:8}}>
            <div style={{fontWeight:600}}>{i18n.guide}</div>
            {plan.guide ? (
              <div>
                <div style={{fontWeight:700}}>{plan.guide.title}</div>
                <p>{plan.guide.body}</p>
              </div>
            ) : <p>—</p>}
          </div>

          <div style={{display:'flex', gap:12, paddingTop:8}}>
            <a style={{textDecoration:'underline'}} href="https://lin.ee/xUocVyI" target="_blank">{i18n.ctaLine}</a>
            <a style={{textDecoration:'underline'}} href="https://www.facebook.com/MediflowKK" target="_blank">{i18n.ctaMsg}</a>
            <a style={{textDecoration:'underline'}} href="#" target="_blank">{i18n.ctaZalo}</a>
          </div>
        </div>
      )}
    </div>
  );
}
