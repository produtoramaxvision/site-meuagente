import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop = ({ threshold = 300, className }: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 left-8 z-[60] h-12 w-12 rounded-full transition-all duration-300 ease-out",
        "backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10",
        "hover:bg-white/20 dark:hover:bg-black/30 hover:scale-110 hover:border-white/30",
        "shadow-lg hover:shadow-xl",
        "text-white dark:text-white",
        isVisible
          ? "translate-y-0 !opacity-100"
          : "pointer-events-none translate-y-16 !opacity-0",
        className
      )}
      size="icon"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-5 w-5 stroke-[2.5]" />
    </Button>
  );
};
