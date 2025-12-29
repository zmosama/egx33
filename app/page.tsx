'use client';

import { useState, useEffect } from 'react';
import CandlestickChart from '@/components/CandlestickChart';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Info, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MarketData {
  current: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

export default function Home() {
  const [marketData, setMarketData] = useState<MarketData>({
    current: 2847.50,
    change: 45.30,
    changePercent: 1.62,
    high: 2865.20,
    low: 2795.40,
    volume: '450.2M',
  });

  // بيانات تجريبية للشموع اليابانية - في الواقع ستأتي من API
  const candleData = [
    { time: '2024-01-02', open: 2650, high: 2680, low: 2640, close: 2670 },
    { time: '2024-01-03', open: 2670, high: 2710, low: 2665, close: 2695 },
    { time: '2024-01-04', open: 2695, high: 2720, low: 2685, close: 2700 },
    { time: '2024-01-05', open: 2700, high: 2735, low: 2695, close: 2730 },
    { time: '2024-01-08', open: 2730, high: 2760, low: 2720, close: 2745 },
    { time: '2024-01-09', open: 2745, high: 2775, low: 2735, close: 2750 },
    { time: '2024-01-10', open: 2750, high: 2780, low: 2740, close: 2765 },
    { time: '2024-01-11', open: 2765, high: 2795, low: 2760, close: 2785 },
    { time: '2024-01-12', open: 2785, high: 2810, low: 2775, close: 2802 },
    { time: '2024-01-15', open: 2802, high: 2847, low: 2795, close: 2847.5 },
  ];

  type NewsImpact = 'positive' | 'negative' | 'neutral';

  const news: Array<{title: string; reason: string; time: string; impact: NewsImpact}> = [
    {
      title: 'ارتفاع قوي في مؤشر EGX33',
      reason: 'تحسن في أداء القطاع المصرفي بنسبة 2.1% وارتفاع أسهم الاتصالات',
      time: 'منذ ساعة',
      impact: 'positive',
    },
    {
      title: 'زيادة في حجم التداول',
      reason: 'دخول مستثمرين مؤسسيين جدد في السوق المصري',
      time: 'منذ 3 ساعات',
      impact: 'positive',
    },
    {
      title: 'تذبذب في أسعار الطاقة',
      reason: 'تأثر قطاع الطاقة بارتفاع أسعار النفط العالمية',
      time: 'منذ 5 ساعات',
      impact: 'neutral',
    },
  ];

  const analysis = {
    trend: 'صاعد',
    strength: 'قوي',
    support: 2795,
    resistance: 2870,
    recommendation: 'شراء',
    reasoning: [
      'المؤشر يتداول فوق المتوسط المتحرك لـ 50 يوماً',
      'حجم التداول أعلى من المعدل بنسبة 25%',
      'مؤشر القوة النسبية RSI عند 65 (منطقة إيجابية)',
      'القطاع المصرفي يقود الصعود',
    ],
    risks: [
      'مقاومة قوية عند 2870 نقطة',
      'احتمال جني أرباح قصير المدى',
      'تأثر بالأحداث الاقتصادية العالمية',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-emerald-500" />
              <div>
                <h1 className="text-2xl font-bold">مؤشر EGX33</h1>
                <p className="text-sm text-gray-400">البورصة المصرية</p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold">{marketData.current.toLocaleString()}</div>
              <div className={`flex items-center gap-1 ${marketData.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {marketData.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">
                  {marketData.change >= 0 ? '+' : ''}{marketData.change} ({marketData.changePercent >= 0 ? '+' : ''}{marketData.changePercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">أعلى سعر</div>
            <div className="text-2xl font-bold text-emerald-500">{marketData.high.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">أقل سعر</div>
            <div className="text-2xl font-bold text-red-500">{marketData.low.toLocaleString()}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">حجم التداول</div>
            <div className="text-2xl font-bold">{marketData.volume}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">الاتجاه</div>
            <div className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              {analysis.trend}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            الرسم البياني (الشموع اليابانية)
          </h2>
          <CandlestickChart data={candleData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* News & Reasons */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              الأخبار والأسباب
            </h2>
            <div className="space-y-4">
              {news.map((item, index) => (
                <div key={index} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      item.impact === 'positive' ? 'text-emerald-500' :
                      item.impact === 'negative' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {item.impact === 'positive' ? <TrendingUp className="w-5 h-5" /> :
                       item.impact === 'negative' ? <TrendingDown className="w-5 h-5" /> :
                       <Activity className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{item.reason}</p>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis & Recommendations */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-500" />
              التحليل والتوصيات
            </h2>

            {/* Recommendation Badge */}
            <div className={`mb-6 p-4 rounded-lg border-2 ${
              analysis.recommendation === 'شراء' ? 'bg-emerald-500/10 border-emerald-500' :
              analysis.recommendation === 'بيع' ? 'bg-red-500/10 border-red-500' :
              'bg-yellow-500/10 border-yellow-500'
            }`}>
              <div className="flex items-center gap-3">
                {analysis.recommendation === 'شراء' ? <ThumbsUp className="w-8 h-8 text-emerald-500" /> :
                 analysis.recommendation === 'بيع' ? <ThumbsDown className="w-8 h-8 text-red-500" /> :
                 <Activity className="w-8 h-8 text-yellow-500" />}
                <div>
                  <div className="text-sm text-gray-400">التوصية</div>
                  <div className="text-2xl font-bold">{analysis.recommendation}</div>
                </div>
              </div>
            </div>

            {/* Support & Resistance */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">الدعم</div>
                <div className="text-lg font-bold text-emerald-500">{analysis.support}</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-400 mb-1">المقاومة</div>
                <div className="text-lg font-bold text-red-500">{analysis.resistance}</div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-emerald-500">نقاط إيجابية:</h3>
              <ul className="space-y-2">
                {analysis.reasoning.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-gray-300">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div>
              <h3 className="font-semibold mb-3 text-yellow-500">محاذير:</h3>
              <ul className="space-y-2">
                {analysis.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-yellow-500 mt-1">⚠</span>
                    <span className="text-gray-300">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400 text-center">
            <AlertCircle className="w-4 h-4 inline ml-2" />
            تنويه: هذه المعلومات لأغراض تعليمية فقط وليست نصيحة استثمارية. يرجى استشارة مستشار مالي مرخص قبل اتخاذ أي قرارات استثمارية.
          </p>
        </div>
      </main>
    </div>
  );
}
