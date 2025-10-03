'use client';
import React from 'react';

type Opt = { k: string; v: string };

export function StepButtons(props: {
  label: string;
  options: Opt[];
  value: string | boolean | null;
  onSelect: (val: string) => void;
}) {
  const {label, options, value, onSelect} = props;

  const btnStyle: React.CSSProperties = {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: 6,
    cursor: 'pointer',
    background: '#fff'
  };
  const activeStyle: React.CSSProperties = { borderColor:'#000' };

  return (
    <div style={{marginBottom: 12}}>
      <div style={{fontWeight: 600, marginBottom: 6}}>{label}</div>
      <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
        {options.map(o=>(
          <button
            key={o.k}
            onClick={()=>onSelect(o.k)}
            style={{...btnStyle, ...(value==o.k?activeStyle:{})}}
          >
            {o.v}
          </button>
        ))}
      </div>
    </div>
  );
}
