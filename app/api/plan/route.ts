import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseServer';
import type { Answers, Plan, Job, Guide } from '../../../types';

function pickTasks(level: Answers['nihongo']): string[] {
  if (level === 'N5orBelow') return ['n5_starts','life_orient'];
  if (level === 'N4') return ['n4_bridge','life_orient'];
  return ['n3_jobprep']; // N3+
}

export async function POST(req: Request) {
  const body = await req.json() as Answers;

  // 1) 回答を保存
  await supabaseAdmin.from('responses').insert({
    lang: body.lang, source: body.source, purpose: body.purpose, residency: body.residency,
    prefecture: body.prefecture, nihongo: body.nihongo, care_exp: body.care_exp, housing: body.housing
  });

  // 2) 求人検索条件
  const tags: string[] = ['tokutei_ginou','sponsor_ok'];
  if (body.residency === 'overseas') tags.push('overseas_ok');

  let q = supabaseAdmin.from('jobs').select('*').order('created_at',{ascending:false}).limit(20);

  if (body.prefecture !== 'other') q = q.eq('prefecture', body.prefecture);

  if (body.nihongo === 'N4') q = q.in('nihongo_required', ['N4','N5orBelow']);
  else if (body.nihongo === 'N5orBelow') q = q.eq('nihongo_required', 'N5orBelow');

  if (!body.care_exp) q = q.eq('experience_required', false);
  if (body.housing === 'dorm') q = q.eq('housing_available', true);
  for (const t of tags) q = q.contains('visa_tags', [t]);

  const { data: jobsRaw, error: jobsErr } = await q;
  if (jobsErr) return NextResponse.json({ error: jobsErr.message }, { status: 500 });
  const jobs = (jobsRaw ?? []).slice(0,3) as Job[];

  // 3) 学習タスク
  const taskKeys = pickTasks(body.nihongo);
  const { data: tasks } = await supabaseAdmin.from('learning_tasks').select('*').in('key', taskKeys).limit(3);

  // 4) 生活ガイド
  let guide: Guide | null = null;
  if (body.prefecture !== 'other') {
    const { data: guides } = await supabaseAdmin.from('lifestyle_guides')
      .select('*').eq('prefecture', body.prefecture).limit(1) as any;
    guide = guides?.[0] ?? null;
  }

  const plan: Plan = { jobs, tasks: (tasks ?? []).slice(0,3), guide };
  return NextResponse.json(plan);
}
