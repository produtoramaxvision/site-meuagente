# UI Kit Specification & Design System Hand-off

Este documento serve como especificação técnica completa para a reprodução fiel do Design System "Meu Agente". Ele é agnóstico ao conteúdo e foca puramente na estrutura visual, tokens e comportamento dos componentes.

---

## 1. Fundamentos (Global Styles)

### 1.1. Paleta de Cores (HSL)

Todas as cores são definidas em HSL para facilitar a manipulação de opacidade e temas (Light/Dark).

**Brand Colors (Monocromático com Gradientes)**
*   `brand-50`: `0 0% 98%` (Light) / `0 0% 10%` (Dark)
*   `brand-100`: `0 0% 95%` (Light) / `0 0% 15%` (Dark)
*   `brand-200`: `0 0% 88%` (Light) / `0 0% 20%` (Dark)
*   `brand-300`: `0 0% 70%` (Light) / `0 0% 35%` (Dark)
*   `brand-400`: `0 0% 50%` (Light) / `0 0% 55%` (Dark)
*   `brand-500`: `0 0% 30%` (Light) / `0 0% 70%` (Dark)
*   `brand-600`: `0 0% 20%` (Light) / `0 0% 80%` (Dark)
*   `brand-700`: `0 0% 30%` (Light) / `0 0% 75%` (Dark)
*   `brand-800`: `0 0% 15%` (Light) / `0 0% 88%` (Dark)
*   `brand-900`: `0 0% 10%` (Light) / `0 0% 95%` (Dark)
*   `brand-950`: `0 0% 5%` (Light) / `0 0% 8%` (Dark)

**Surface & Background**
*   `bg`: `0 0% 98%` (Light) / `0 0% 5%` (Dark)
*   `surface`: `0 0% 100%` (Light) / `0 0% 8%` (Dark)
*   `surface-2`: `0 0% 96%` (Light) / `0 0% 12%` (Dark)
*   `surface-3`: `0 0% 92%` (Light) / `0 0% 16%` (Dark)

**Text**
*   `text`: `0 0% 0%` (Light) / `0 0% 100%` (Dark)
*   `text-muted`: `0 0% 40%` (Light) / `0 0% 60%` (Dark)
*   `text-subtle`: `0 0% 60%` (Light) / `0 0% 40%` (Dark)

**Semantic**
*   `success`: `142 71% 45%`
*   `error`: `0 65% 51%`
*   `warning`: `38 92% 50%`
*   `info`: `217 91% 60%`

**Gradients**
*   `gradient-primary`: `linear-gradient(135deg, hsl(0 0% 10%), hsl(0 0% 30%))` (Light) / `linear-gradient(135deg, hsl(0 0% 100%), hsl(0 0% 80%))` (Dark)
*   `gradient-subtle`: `linear-gradient(180deg, hsl(0 0% 100%), hsl(0 0% 98%))` (Light) / `linear-gradient(180deg, hsl(0 0% 8%), hsl(0 0% 12%))` (Dark)
*   `gradient-hover`: `linear-gradient(135deg, hsl(0 0% 5%), hsl(0 0% 25%))` (Light) / `linear-gradient(135deg, hsl(0 0% 95%), hsl(0 0% 75%))` (Dark)

### 1.2. Tipografia

*   **Font Family**: `Inter`, system-ui, -apple-system, sans-serif.
*   **Feature Settings**: `'cv11', 'ss01'` (para melhor legibilidade e estilo).
*   **Scale**:
    *   `xs`: 0.75rem (12px)
    *   `sm`: 0.875rem (14px)
    *   `base`: 1rem (16px)
    *   `lg`: 1.125rem (18px)
    *   `xl`: 1.25rem (20px)
    *   `2xl`: 1.5rem (24px)
    *   `3xl`: 1.875rem (30px)
    *   `4xl`: 2.25rem (36px)
    *   `5xl`: 3rem (48px)
    *   `6xl`: 3.75rem (60px)

### 1.3. Espaçamento e Layout

*   **Container**: Centralizado, padding `2rem`, max-width `1400px` (2xl).
*   **Radius**: `0.5rem` (8px) padrão.
*   **Spacing Scale**: Baseado em múltiplos de 4px (Tailwind default).

### 1.4. Efeitos Visuais

**Shadows (Adaptive)**
*   `shadow-adaptive`: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` (Light) / Mais intenso no Dark.
*   `shadow-xl-adaptive`: `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`
*   `shadow-2xl-adaptive`: `0 25px 50px -12px rgb(0 0 0 / 0.25)`
*   `shadow-glow`: `0 0 40px rgb(0 0 0 / 0.15)`

**Glassmorphism**
*   Class `.glass`:
    *   Background: `rgba(255, 255, 255, 0.7)` (Light) / `rgba(0, 0, 0, 0.3)` (Dark)
    *   Backdrop-filter: `blur(12px)`
    *   Border: `1px solid rgba(255, 255, 255, 0.3)` (Light) / `1px solid rgba(255, 255, 255, 0.1)` (Dark)

**Animations**
*   `fade-in`: Opacity 0 -> 1, TranslateY 20px -> 0 (0.6s ease-out)
*   `scale-in`: Opacity 0 -> 1, Scale 0.95 -> 1 (0.4s ease-out)
*   `float`: TranslateY 0 -> -10px -> 0 (3s ease-in-out infinite)
*   `shimmer`: Background position move (2s infinite)
*   `badge-pulse`: Box-shadow pulse effect (2s ease-out infinite)

---

## 2. Biblioteca de Componentes (Atomic Design)

### 2.1. Átomos

**Botões (`Button`)**
*   **Primary Gradient**: Background `gradient-primary`, texto branco/preto (contraste), shadow `xl-adaptive`. Hover: Scale 1.02, shadow `2xl-adaptive`.
*   **Secondary**: Borda 2px solid `hsl(0 0% 88%)`, bg transparente. Hover: bg `hsl(0 0% 96%)`, border `hsl(0 0% 50%)`.
*   **Outline**: Borda 1px `input`, bg `background`. Hover: bg `accent`, text `accent-foreground`.
*   **Ghost**: Sem borda/bg. Hover: bg `accent`.
*   **Sizes**: `sm` (h-9 px-3), `default` (h-10 px-4), `lg` (h-11 px-8), `icon` (h-10 w-10).

**Inputs (`Input`)**
*   Height: 10 (40px).
*   Border: `input`.
*   Focus: Ring 2px `ring`, offset 2px.
*   Placeholder: `text-muted-foreground`.

**Badges (`Badge`)**
*   **Default**: Bg `primary`, text `primary-foreground`.
*   **Outline**: Border `border`, text `foreground`.
*   **Secondary**: Bg `secondary`, text `secondary-foreground`.
*   **Highlight**: Bg `hsl(0 0% 10% / 0.1)`, border `hsl(0 0% 10% / 0.3)`.

### 2.2. Moléculas

**Cards (`Card`)**
*   Bg: `surface` ou `background`.
*   Border: `border/50` ou `border/60`.
*   Shadow: `shadow-adaptive`.
*   Hover Effect: `hover:shadow-xl-adaptive`, `hover:-translate-y-1`, `hover:scale-[1.02]`.
*   **CardHighlight**: Variante com gradiente sutil no background e borda mais evidente.

**Accordion (`Accordion`)**
*   Item: Border-b.
*   Trigger: Flex, justify-between, hover:underline. Icon chevron rotate 180deg on open.
*   Content: Animação `accordion-down`/`accordion-up`.

### 2.3. Organismos

**Navbar (`Header`)**
*   Position: Sticky top-0.
*   Bg: `background/80` com `backdrop-blur-md`.
*   Border: Bottom `border/50`.
*   Content: Logo (esquerda), Links (centro - desktop), CTAs + Theme Toggle (direita).
*   Mobile: Menu hambúrguer que expande drawer/collapse.

**Footer (`Footer`)**
*   Bg: `neutral-900` (Dark theme forçado ou adaptativo).
*   Structure: Grid responsivo (Logo/Social + 4 colunas de links).
*   Bottom Bar: Copyright e créditos.
*   Decoration: Grid pattern overlay com opacidade baixa.

**Pricing Cards**
*   **Standard**: Card vertical, título, preço (NumberFlow), lista de features (Check/X), CTA outline.
*   **Popular**: Scale 1.05, Ring highlight, Badge "Mais Popular", CTA Primary Gradient, Shadow mais intensa.

---

## 3. Análise Específica por Página

### 3.1. Home (`Index.tsx`)
*   **Hero Section**:
    *   Layout: Centralizado, texto grande (`text-5xl` a `7xl`), badge animado no topo.
    *   Background: Gradiente sutil + Grid pattern + Blobs (glows) animados flutuando.
    *   CTAs: Dois botões (Primary Gradient + Secondary Outline com ícone Play).
    *   Visual: Demo preview (imagem/vídeo) em container glassmorphism com shadow `2xl-adaptive`.
*   **Logos Section**: Carrossel ou grid de logos monocromáticos (opacity 50-70%).
*   **Sticky Nav**: Barra de navegação secundária abaixo do Hero para pular entre seções da landing page.
*   **Product Showcase**: Tabs ou ScrollSpy mostrando features com prints do sistema.
*   **Agents Section**: Grid de cards ou Tabs mostrando os diferentes agentes (Financeiro, SDR, etc.).
*   **Features Section**: Grid bento ou cards detalhando funcionalidades do app web.
*   **Testimonials**: Grid de cards de depoimentos.
*   **FAQ + CTA Final**: Accordion de dúvidas e bloco final de conversão com fundo escuro.

### 3.2. Blog (`Blog.tsx`)
*   **Hero**: Título grande, badge de categoria, campo de busca com shadow.
*   **Sticky Filters**: Barra com Tabs (pílulas) para filtrar categorias, sticky no topo.
*   **Layout**: Grid assimétrico.
    *   **Main**: Grid de posts (Cards com imagem cover, tags, título, resumo, autor/data).
    *   **Sidebar**: "Leituras recomendadas" (lista compacta), Newsletter box, CTA para o produto.
*   **Post Card**: Efeito de hover com leve lift (translate-y) e sombra. Imagem com aspect-ratio 16/9.

### 3.3. Como Funciona (`ComoFunciona.tsx`)
*   **Hero**: Título focado em "Do WhatsApp ao resultado".
*   **Jornada**: 3 passos ilustrados (Card horizontal com steps 1, 2, 3).
*   **Camadas**: Visualização em "stack" de cards (Camada 1: WhatsApp, Camada 2: Agentes, Camada 3: App Web).
*   **Agents Tabs**: Seção interativa onde clicar na tab do agente (ícone + nome) muda o conteúdo do card principal (descrição, exemplos de prompt, casos de uso).
*   **SDR Timeline**: Linha do tempo horizontal (desktop) ou vertical (mobile) mostrando o fluxo de qualificação de leads.

### 3.4. Planos (`Planos.tsx`)
*   **Hero**: Título focado em preços.
*   **Toggle**: Switch Mensal/Anual com destaque "1 mês grátis". Efeito de confetti ao ativar anual.
*   **Planos Grid**:
    *   3 planos iniciais (Free, Lite, Basic) em grid.
    *   2 planos Enterprise (Business, Premium) em cards horizontais largos abaixo.
*   **Comparison Table**: Tabela completa de features (linhas) x planos (colunas) com sticky header em mobile/desktop se necessário.
*   **ROI Calculator**: Calculadora interativa (Sliders para horas gastas, custo hora, leads perdidos) que atualiza o valor de economia em tempo real.

### 3.5. FAQ (`FAQ.tsx`)
*   **Hero**: Título e busca centralizada grande.
*   **Layout**:
    *   **Esquerda**: Tabs verticais ou lista de categorias (Geral, Planos, Uso, Segurança).
    *   **Direita**: Lista de Accordions filtrada pela categoria selecionada.
*   **Sidebar**: Card de "Suporte Humano" com botões para WhatsApp/Email.

---

## 4. Assets & Icons
*   **Icons**: Lucide React (stroke-width 2px, tamanhos 16px a 24px geralmente).
*   **Logos**: Versões monocromáticas (preto/branco) para headers/footers e coloridas para parceiros.
*   **Fontes**: Inter (Google Fonts).

## 5. Responsividade
*   **Mobile First**: Todo o CSS é mobile-first.
*   **Breakpoints**:
    *   `sm`: 640px
    *   `md`: 768px
    *   `lg`: 1024px
    *   `xl`: 1280px
    *   `2xl`: 1400px