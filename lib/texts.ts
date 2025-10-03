import { Lang } from '../types';
export const t = (lang: Lang) => ({
  title: lang==='ja' ? '30秒仕事診断' : 'Chẩn đoán việc làm 30 giây',
  steps: {
    purpose: lang==='ja' ? '目的（仕事）' : 'Mục tiêu (công việc)',
    residency: lang==='ja' ? '在留状況' : 'Tình trạng lưu trú',
    prefecture: lang==='ja' ? '勤務地' : 'Khu vực làm việc',
    nihongo: lang==='ja' ? '日本語レベル' : 'Trình độ tiếng Nhật',
    care_exp: lang==='ja' ? '介護経験' : 'Kinh nghiệm điều dưỡng',
    housing: lang==='ja' ? '住居希望' : 'Nơi ở',
    submit: lang==='ja' ? '診断する' : 'Xem kết quả',
  },
  options: {
    purpose: [{k:'care',v:lang==='ja'?'介護職をしたい':'Muốn làm điều dưỡng'},{k:'other',v:lang==='ja'?'別の仕事を希望':'Công việc khác'}],
    residency: [{k:'in_japan',v:lang==='ja'?'日本に在住':'Đang ở Nhật'},{k:'overseas',v:lang==='ja'?'これから日本へ':'Đang ở nước ngoài'}],
    prefecture: [{k:'tokyo',v:'Tokyo'},{k:'kanagawa',v:'Kanagawa'},{k:'aichi',v:'Aichi'},{k:'other',v:lang==='ja'?'その他':'Khác'}],
    nihongo: [{k:'N3plus',v:'N3+'},{k:'N4',v:'N4'},{k:'N5orBelow',v:lang==='ja'?'N5以下':'N5 hoặc thấp hơn'}],
    care_exp: [{k:'true',v:lang==='ja'?'あり':'Có'},{k:'false',v:lang==='ja'?'なし':'Không'}],
    housing: [{k:'dorm',v:lang==='ja'?'寮あり希望':'Muốn ký túc xá'},{k:'self',v:lang==='ja'?'自分で探す':'Tự tìm chỗ ở'}],
  },
  resultTitle: lang==='ja' ? 'あなた専用の進路プラン' : 'Kế hoạch dành riêng cho bạn',
  jobs: lang==='ja' ? '求人' : 'Việc làm',
  tasks: lang==='ja' ? '学習タスク' : 'Nhiệm vụ học tập',
  guide: lang==='ja' ? '生活ガイド' : 'Hướng dẫn cuộc sống',
  ctaLine: lang==='ja' ? 'LINEで相談' : 'Tư vấn qua LINE',
  ctaMsg: lang==='ja' ? 'Messengerで相談' : 'Tư vấn qua Messenger',
  ctaZalo: 'Zalo',
});
