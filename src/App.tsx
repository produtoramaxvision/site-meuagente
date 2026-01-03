import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
const ChatWidget = lazy(() => import("./components/ChatWidget"));
import Index from "./pages/Index";

// Rotas secundárias em lazy para reduzir payload inicial (etapa 1 do plano)
const TrabalheConosco = lazy(() => import("./pages/TrabalheConosco"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const Planos = lazy(() => import("./pages/Planos"));
const ComoFunciona = lazy(() => import("./pages/ComoFunciona"));
const Blog = lazy(() => import("./pages/Blog"));
const StatusDoSistema = lazy(() => import("./pages/StatusDoSistema"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contato = lazy(() => import("./pages/Contato"));
const SobreNos = lazy(() => import("./pages/SobreNos"));
const GuiaDoUsuario = lazy(() => import("./pages/GuiaDoUsuario"));
const SalesPage = lazy(() => import("./pages/SalesPage"));
const SuccessPage = lazy(() => import("./pages/SuccessPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isSalesPage = location.pathname === "/oferta";
  const isSuccessPage = location.pathname === "/sucesso";
  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <div className="flex flex-col min-h-screen">
      {!isSalesPage && !isSuccessPage && !isCheckoutPage && <Header />}
      <main className="flex-1">
        <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Carregando...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/termos-de-uso" element={<TermosDeUso />} />
            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/status-do-sistema" element={<StatusDoSistema />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/guia-do-usuario" element={<GuiaDoUsuario />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/oferta" element={<SalesPage />} />
            <Route path="/sucesso" element={<SuccessPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isSalesPage && !isSuccessPage && !isCheckoutPage && <Footer />}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
      </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
