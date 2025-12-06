import {
  Shield,
  Award,
  Zap,
  Cpu,
  HeartPulse,
  BookOpen,
  ShoppingBag,
  BarChart3,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";

const LogosSection = () => {
  const badges = [
    {
      icon: Shield,
      label: "LGPD Compliant",
      href: "/politica-de-privacidade",
      bg: "bg-gradient-to-r from-emerald-500/14 via-emerald-500/8 to-emerald-500/0",
      border: "border-emerald-400/50",
      text: "text-emerald-700",
      iconClass: "text-emerald-500",
      shadow: "shadow-[0_18px_50px_-28px_rgba(16,185,129,0.55)]",
    },
    {
      icon: Award,
      label: "Segurança Garantida",
      href: "/termos-de-uso",
      bg: "bg-gradient-to-r from-amber-500/14 via-amber-500/8 to-amber-500/0",
      border: "border-amber-400/50",
      text: "text-amber-800",
      iconClass: "text-amber-500",
      shadow: "shadow-[0_18px_50px_-28px_rgba(245,158,11,0.55)]",
    },
    {
      icon: Zap,
      label: "99.9% Uptime",
      href: "/status-do-sistema",
      bg: "bg-gradient-to-r from-sky-500/14 via-sky-500/8 to-sky-500/0",
      border: "border-sky-400/50",
      text: "text-sky-800",
      iconClass: "text-sky-500",
      shadow: "shadow-[0_18px_50px_-28px_rgba(14,165,233,0.55)]",
    },
  ];

  const sectors = [
    { label: "Tecnologia", icon: Cpu },
    { label: "Saúde", icon: HeartPulse },
    { label: "Educação", icon: BookOpen },
    { label: "Varejo", icon: ShoppingBag },
    { label: "Finanças", icon: BarChart3 },
    { label: "Consultoria", icon: Handshake },
  ];

  return (
    <section className="py-16 bg-surface/50 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {badges.map((badge, index) => (
            <Link
              key={index}
              to={badge.href}
              className={`flex items-center gap-3 px-6 py-3 rounded-full ${badge.bg} backdrop-blur-sm border ${badge.border} ${badge.shadow} hover:border-accent transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 cursor-pointer`}
            >
              <badge.icon className={`w-5 h-5 ${badge.iconClass}`} />
              <span className={`text-sm font-semibold ${badge.text}`}>{badge.label}</span>
            </Link>
          ))}
        </div>

        {/* Trusted by sectors */}
        <div className="text-center">
          <p className="text-sm text-text-muted mb-6 font-medium">
            Confiança de empresas dos setores:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <div
                  key={index}
                  className="group inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs sm:text-sm text-text-muted shadow-sm transition-all duration-300 hover:border-accent hover:bg-surface/80 hover:text-text"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface/70 icon-accent group-hover:bg-text group-hover:text-background transition-colors duration-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{sector.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosSection;
