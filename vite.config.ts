import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/**
 * Plugin para otimizar carregamento de CSS (não-bloqueante)
 * Transforma <link rel="stylesheet"> em preload com fallback
 * Isso resolve o problema de "Render-blocking resources" do PageSpeed
 */
function cssNonBlockingPlugin(): Plugin {
  return {
    name: "css-non-blocking",
    enforce: "post",
    transformIndexHtml(html) {
      // Encontra todos os links de stylesheet
      const stylesheetRegex = /<link rel="stylesheet"([^>]*?)href="([^"]+)"([^>]*?)>/g;
      
      let match;
      const stylesheets: string[] = [];
      
      // Coleta todos os CSS files
      while ((match = stylesheetRegex.exec(html)) !== null) {
        stylesheets.push(match[2]);
      }
      
      if (stylesheets.length === 0) return html;
      
      // Substitui stylesheet por preload (carregamento assíncrono)
      let modifiedHtml = html.replace(
        stylesheetRegex,
        '<link rel="preload" as="style"$1href="$2"$3 onload="this.onload=null;this.rel=\'stylesheet\'">'
      );
      
      // Adiciona fallback noscript para navegadores sem JS
      const noscriptFallback = stylesheets
        .map(href => `<link rel="stylesheet" href="${href}">`)
        .join('\n    ');
      
      modifiedHtml = modifiedHtml.replace(
        '</head>',
        `  <noscript>\n    ${noscriptFallback}\n  </noscript>\n  </head>`
      );
      
      return modifiedHtml;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  // Configuração dinâmica baseada no ambiente
  const serverConfig: import("vite").ServerOptions = {
    host: "0.0.0.0",
    port: 8181,
    strictPort: true,
    cors: true,
    headers: {
      // Headers CORS / COEP
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Resource-Policy": "cross-origin",

      // Headers de Segurança HTTP
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "0",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
    },
  };

  // Em desenvolvimento, permitir embed em webviews (ex: VS Code Simple Browser)
  // removendo o cabeçalho que impede frames. Mantemos os headers de segurança
  // para produção/preview.
  if (isDevelopment && serverConfig.headers) {
    delete serverConfig.headers["X-Frame-Options"];
    delete serverConfig.headers["Strict-Transport-Security"];
  }
  // Configuração específica para desenvolvimento
  if (isDevelopment) {
    serverConfig.hmr = {
      host: "localhost",
      port: 8181,
      // Permitir acesso externo para testes (ajustável via env)
      clientPort: process.env.VITE_HMR_CLIENT_PORT
        ? parseInt(process.env.VITE_HMR_CLIENT_PORT)
        : undefined,
    };

    serverConfig.allowedHosts = [
      "localhost",
      "127.0.0.1",
      "site.meuagente.api.br",
    ];
  }

  // Configuração específica para produção
  if (isProduction) {
    serverConfig.hmr = {
      host: "site.meuagente.api.br",
      port: 8181,
    };

    serverConfig.allowedHosts = ["site.meuagente.api.br"];
  }

  return {
    server: serverConfig,
    plugins: [
      react(),
      isDevelopment && componentTagger(),
      // Plugin para CSS não-bloqueante (resolve render-blocking do PageSpeed)
      isProduction && cssNonBlockingPlugin(),
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 1024, // Apenas arquivos > 1KB
        deleteOriginFile: false,
        verbose: true,
      }),
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024, // Apenas arquivos > 1KB
        deleteOriginFile: false,
        verbose: true,
      }),
      isProduction &&
        ViteImageOptimizer({
          // Otimizar imagens do public e assets estáticos
          includePublic: true,
          logStats: true,
          // Compressão moderada para WebP/AVIF; mantém fallback png/jpg
          webp: { quality: 82, lossless: false },
          avif: { quality: 70, lossless: false },
          png: { quality: 80 },
          jpeg: { quality: 80, mozjpeg: true, progressive: true },
          svg: { multipass: true },
      }),
    ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    // Otimização de dependências
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "lucide-react",
      ],
      exclude: ["@fontsource/inter"],
    },
    // Configuração de CSS otimizada
    css: {
      // Minificar CSS com esbuild (mais rápido)
      devSourcemap: isDevelopment,
    },
    // Configurações de build otimizadas
    build: {
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: isProduction, // Remove console.log apenas em produção
          drop_debugger: true,
          pure_funcs: isProduction ? ["console.log", "console.info"] : [],
          passes: 2, // 2 passes de compressão para melhor resultado
        },
        format: {
          comments: false, // Remove comentários
        },
        mangle: {
          safari10: true, // Compatibilidade com Safari 10
        },
      },
      sourcemap: isDevelopment,
      // CSS code splitting - separa CSS por chunk para carregamento mais eficiente
      cssCodeSplit: true,
      // Minificação de CSS
      cssMinify: "esbuild",
      // Aumentar limite para reduzir warnings desnecessários
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          manualChunks: {
            // React core (react + react-dom + react-router)
            "react-vendor": ["react", "react-dom", "react-router-dom"],

            // Framer Motion (separado pois é pesado)
            "vendor-animation": ["framer-motion"],

            // Embla Carousel (separado pois é pesado)
            "vendor-carousel": ["embla-carousel-react"],

            // Supabase
            supabase: ["@supabase/supabase-js"],

            // TanStack Query (separado para melhor cache)
            tanstack: ["@tanstack/react-query"],

            // UI Components (Radix UI + Shadcn)
            ui: [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-select",
              "@radix-ui/react-popover",
              "@radix-ui/react-tabs",
              "@radix-ui/react-toast",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-avatar",
              "@radix-ui/react-checkbox",
              "@radix-ui/react-label",
              "@radix-ui/react-switch",
              "@radix-ui/react-slot",
              "@radix-ui/react-accordion",
            ],

            // Charts
            charts: ["recharts"],

            // Date utilities
            "date-utils": ["date-fns"],

            // Icons
            icons: ["lucide-react"],
          },
        },
      },
    },
    // Configuração de preview para produção
    preview: {
      host: "0.0.0.0",
      port: 8181,
      cors: true,
      headers: {
        // Headers de Segurança HTTP para produção
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "0",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy":
          "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        "Strict-Transport-Security":
          "max-age=31536000; includeSubDomains; preload",
      },
    },
  };
});
