# Otimizações PageSpeed Insights - Site Meu Agente

## Data: 06/12/2025

### Problemas Identificados (Mobile)

1. **Elementos de imagem sem `width` e `height` explícitos**
   - Logos do Meu Agente causando Layout Shift (CLS)
   - Imagens de blog e testimonials sem dimensões

2. **Minimizar o trabalho da thread principal: 2.1s**
   - Style & Layout: 723ms
   - Script Evaluation: 451ms
   - Rendering: 297ms

---

## Correções Implementadas

### 1. ✅ Dimensões Explícitas em Todas as Imagens

#### Header (`src/components/layout/Header.tsx`)
```tsx
// Logo escuro
<img 
  src="/meuagente_logo_transparente-preto.png" 
  alt="Meu Agente" 
  width="200"
  height="80"
  fetchpriority="high"
  className="h-16 sm:h-20 w-auto dark:hidden"
/>

// Logo claro
<img 
  src="/meuagente_logo_transparente-branco.png" 
  alt="Meu Agente" 
  width="200"
  height="80"
  fetchpriority="high"
  className="h-16 sm:h-20 w-auto hidden dark:block"
/>
```

#### Footer (`src/components/layout/Footer.tsx`)
```tsx
// Logos com loading="lazy" (abaixo da dobra)
<img
  src="/logo-horizontal-preto.png"
  alt="Meu Agente"
  width="240"
  height="80"
  loading="lazy"
  className="h-16 sm:h-20 w-auto dark:hidden"
/>
```

#### Blog (`src/pages/Blog.tsx` e `src/pages/BlogPost.tsx`)
```tsx
// Imagem destaque - primeira com eager loading
<img
  src={post.coverImage}
  alt={post.title}
  width="1200"
  height="630"
  loading={index === 0 ? "eager" : "lazy"}
  className="h-full w-full object-cover"
/>

// Imagens de posts relacionados
<img 
  src={relatedPost.coverImage} 
  alt={relatedPost.title}
  width="600"
  height="340"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

#### Testimonials (`src/components/sections/TestimonialsSection.tsx`)
```tsx
<img
  src={testimonial.src}
  alt={testimonial.name}
  width="320"
  height="320"
  loading="lazy"
  className="h-full w-full rounded-3xl object-cover"
/>
```

#### Team Grid (`src/components/about/TeamGrid.tsx`)
```tsx
<img
  src={member.src}
  alt={member.name}
  width="160"
  height="160"
  loading="lazy"
  className="h-full w-full object-cover"
/>
```

---

### 2. ✅ Otimização de Carregamento de Recursos

#### HTML (`index.html`)
```html
<!-- DNS Prefetch para domínios externos -->
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />

<!-- Preconnect para domínios críticos -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />

<!-- Preload de recursos críticos -->
<link rel="preload" as="image" href="/meuagente_logo_transparente-preto.png" fetchpriority="high" />
<link rel="preload" as="font" type="font/woff2" href="/assets/inter-latin-400-normal.woff2" crossorigin />
<link rel="preload" as="font" type="font/woff2" href="/assets/inter-latin-600-normal.woff2" crossorigin />
```

---

### 3. ✅ Otimização do Vite Config

#### Dependency Pre-bundling (`vite.config.ts`)
```typescript
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
```

**Benefícios:**
- Pre-bundle de dependências críticas
- Reduz número de requests HTTP
- Melhora tempo de inicialização

---

### 4. ✅ Estratégia de Loading

#### Priorização de Imagens
- **`fetchpriority="high"`**: Logos do header (above the fold)
- **`loading="eager"`**: Primeira imagem do blog (LCP candidate)
- **`loading="lazy"`**: Todas as outras imagens (below the fold)

#### Lazy Loading de Rotas (já implementado)
```typescript
// App.tsx - Rotas secundárias em lazy loading
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Planos = lazy(() => import("./pages/Planos"));
// ... outras rotas
```

---

## Impacto Esperado

### Cumulative Layout Shift (CLS)
- ✅ **Antes**: Imagens sem dimensões causavam layout shift
- ✅ **Depois**: Todas as imagens com `width` e `height` explícitos

### Largest Contentful Paint (LCP)
- ✅ Logo do header com `fetchpriority="high"`
- ✅ Primeira imagem do blog com `loading="eager"`
- ✅ Preconnect para domínios externos

### Total Blocking Time (TBT)
- ✅ Pre-bundling de dependências críticas
- ✅ Code splitting já implementado
- ✅ CSS não-bloqueante em produção

### First Input Delay (FID)
- ✅ Lazy loading de rotas secundárias
- ✅ Imagens com lazy loading (reduz trabalho inicial)

---

## Checklist de Validação

### Antes de Testar no PageSpeed
- [x] Build de produção: `npm run build`
- [x] Preview local: `npm run preview`
- [x] Verificar no DevTools:
  - [x] Network tab - recursos carregados corretamente
  - [x] Performance tab - sem layout shifts
  - [x] Lighthouse tab - pontuação mobile

### Comandos
```bash
# Build de produção
npm run build

# Preview local
npm run preview

# Deploy para Vercel/produção
git add .
git commit -m "fix: otimizações PageSpeed - dimensões em imagens e lazy loading"
git push
```

---

## Próximos Passos (Futuro)

### Otimizações Adicionais Possíveis
1. **WebP/AVIF**: Converter imagens para formatos modernos
2. **Critical CSS**: Inlining de CSS crítico
3. **Service Worker**: Cache de assets estáticos
4. **HTTP/3**: Habilitar no servidor
5. **CDN**: Servir imagens via CDN

### Monitoramento
- Rodar PageSpeed Insights após deploy
- Comparar métricas antes/depois
- Monitorar Core Web Vitals em produção

---

## Referências

- [Web.dev - Image Performance](https://web.dev/fast/#optimize-your-images)
- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [MDN - Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Vite - Performance](https://vitejs.dev/guide/performance.html)
