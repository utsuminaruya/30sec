export type Lang = 'ja' | 'vi';
export type Pref = 'tokyo'|'kanagawa'|'aichi'|'other';

export type Answers = {
  lang: Lang;
  source: 'web'|'line'|'messenger'|'zalo';
  purpose: 'care'|'other';
  residency: 'in_japan'|'overseas';
  prefecture: Pref;
  nihongo: 'N3plus'|'N4'|'N5orBelow';
  care_exp: boolean;
  housing: 'dorm'|'self';
};

export type Job = {
  id: string;
  facility_name: string;
  title: string;
  prefecture: Pref;
  city: string | null;
  visa_tags: string[];
  nihongo_required: Answers['nihongo'];
  experience_required: boolean;
  housing_available: boolean;
  salary_min: number | null;
  salary_max: number | null;
  apply_url: string | null;
};

export type Task = {
  id: string; key: string; title: string; description: string | null; level_target: string; tags: string[];
};

export type Guide = { id: string; slug: string; title: string; body: string; };

export type Plan = {
  jobs: Job[];
  tasks: Task[];
  guide: Guide | null;
};
