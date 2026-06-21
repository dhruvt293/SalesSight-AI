import { DollarSign, TrendingUp, Calendar, BarChart3 } from "lucide-react";

interface KPIGridProps {
  metrics: {
    total_revenue: string;
    avg_monthly_sales: string;
    highest_month: string;
    growth_rate: string;
  } | null;
}

export default function KPIGrid({ metrics }: KPIGridProps) {
  if (!metrics) return null;

  const cards = [
    {
      title: "Total Revenue",
      value: metrics.total_revenue,
      icon: <DollarSign className="text-blue-400" size={24} />,
      gradient: "from-blue-500/10 to-transparent",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Avg Monthly Sales",
      value: metrics.avg_monthly_sales,
      icon: <BarChart3 className="text-indigo-400" size={24} />,
      gradient: "from-indigo-500/10 to-transparent",
      borderColor: "border-indigo-500/20"
    },
    {
      title: "Highest Sales Month",
      value: metrics.highest_month,
      icon: <Calendar className="text-purple-400" size={24} />,
      gradient: "from-purple-500/10 to-transparent",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Growth Rate",
      value: metrics.growth_rate,
      icon: <TrendingUp className="text-emerald-400" size={24} />,
      gradient: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`glass-panel rounded-xl p-6 bg-gradient-to-br ${card.gradient} border ${card.borderColor} flex items-center justify-between hover:scale-[1.02] transition-transform`}
        >
          <div>
            <p className="text-sm text-slate-400 mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-white">{card.value}</h3>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
