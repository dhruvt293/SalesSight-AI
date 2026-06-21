import { Lightbulb, AlertTriangle, Target, CheckCircle2 } from "lucide-react";

interface AIInsightsProps {
  insights: {
    observations: string[];
    risks: string[];
    opportunities: string[];
    recommendations: string[];
  } | null;
  loading: boolean;
}

export default function AIInsights({ insights, loading }: AIInsightsProps) {
  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-blue-400 font-medium animate-pulse">Gemini is analyzing your data...</p>
      </div>
    );
  }

  if (!insights) return null;

  const sections = [
    {
      title: "Key Observations",
      icon: <Lightbulb className="text-amber-400" size={20} />,
      items: insights.observations,
      color: "border-amber-500/20 bg-amber-500/5",
      bullet: "bg-amber-400"
    },
    {
      title: "Potential Risks",
      icon: <AlertTriangle className="text-red-400" size={20} />,
      items: insights.risks,
      color: "border-red-500/20 bg-red-500/5",
      bullet: "bg-red-400"
    },
    {
      title: "Opportunities",
      icon: <Target className="text-emerald-400" size={20} />,
      items: insights.opportunities,
      color: "border-emerald-500/20 bg-emerald-500/5",
      bullet: "bg-emerald-400"
    },
    {
      title: "Recommendations",
      icon: <CheckCircle2 className="text-blue-400" size={20} />,
      items: insights.recommendations,
      color: "border-blue-500/20 bg-blue-500/5",
      bullet: "bg-blue-400"
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg shadow-indigo-500/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">AI Business Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, idx) => (
          <div key={idx} className={`p-5 rounded-xl border ${section.color} transition-colors hover:bg-opacity-80`}>
            <div className="flex items-center gap-2 mb-3">
              {section.icon}
              <h4 className="font-semibold text-slate-200">{section.title}</h4>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-400">
                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${section.bullet}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
