import type { Theme } from '../../context/ThemeContext';

export const styles = {
  page: (theme: Theme) => `
    min-h-screen
    ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}
    transition-colors duration-300
  `,

  // ===========================
  // HERO
  // ===========================
  hero: (theme: Theme) => `
    relative pt-24 pb-20 overflow-hidden
    ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}
  `,
  heroDecoration1: (theme: Theme) => `
    absolute top-0 right-0 -mr-20 -mt-20
    w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none
    ${theme === 'dark' ? 'bg-cyan-500/15' : 'bg-cyan-300/25'}
  `,
  heroDecoration2: (theme: Theme) => `
    absolute bottom-0 left-0 -ml-20 -mb-20
    w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none
    ${theme === 'dark' ? 'bg-blue-500/15' : 'bg-blue-300/25'}
  `,
  heroInner: `
    relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center
  `,
  heroBadge: (theme: Theme) => `
    inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest
    ${theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-100 text-cyan-700 border border-cyan-200'}
  `,
  heroTitle: (theme: Theme) => `
    text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  heroTitleGradient: `
    text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
  `,
  heroSubtitle: (theme: Theme) => `
    text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,

  // ===========================
  // SERVICES GRID
  // ===========================
  section: (theme: Theme) => `
    py-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}
  `,
  sectionInner: `
    max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  `,
  sectionLabel: (theme: Theme) => `
    text-center text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  sectionTitle: (theme: Theme) => `
    text-center text-3xl sm:text-4xl font-bold mb-4
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  sectionDesc: (theme: Theme) => `
    text-center max-w-2xl mx-auto mb-16 text-base leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,
  grid: `
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
  `,

  // Service Card
  card: (theme: Theme) => `
    group flex flex-col p-8 rounded-2xl
    ${theme === 'dark'
      ? 'bg-slate-900 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10'
      : 'bg-white border border-gray-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100'
    }
    transition-all duration-300
  `,
  cardIconWrapper: (theme: Theme, color: string) => `
    w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0
    ${color === 'cyan'
      ? theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-100'
      : color === 'blue'
        ? theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'
        : color === 'violet'
          ? theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-100'
          : color === 'teal'
            ? theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-100'
            : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
    }
    transition-transform duration-300 group-hover:scale-110
  `,
  cardIconSvg: (theme: Theme, color: string) => `
    w-7 h-7
    ${color === 'cyan'
      ? theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
      : color === 'blue'
        ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        : color === 'violet'
          ? theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
          : color === 'teal'
            ? theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
            : theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
    }
  `,
  cardTitle: (theme: Theme) => `
    text-lg font-bold mb-3
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  cardDesc: (theme: Theme) => `
    text-sm leading-relaxed flex-1
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,

  // ===========================
  // CTA FINAL
  // ===========================
  cta: (theme: Theme) => `
    py-24
    ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
  `,
  ctaInner: `
    max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center
  `,
  ctaBox: (theme: Theme) => `
    relative rounded-3xl p-12 overflow-hidden
    ${theme === 'dark'
      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
      : 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200'
    }
  `,
  ctaGlow: (theme: Theme) => `
    absolute inset-0 pointer-events-none rounded-3xl
    ${theme === 'dark' ? 'bg-cyan-500/5' : 'bg-cyan-300/10'}
  `,
  ctaTitle: (theme: Theme) => `
    relative z-10 text-2xl sm:text-3xl font-bold mb-4
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  ctaDesc: (theme: Theme) => `
    relative z-10 text-base mb-8 leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,
  ctaButton: `
    relative z-10 inline-flex items-center gap-2 group
    bg-cyan-400 text-slate-900 font-bold text-lg
    px-8 py-3.5 rounded-lg shadow-lg shadow-cyan-400/25
    transition-all duration-300 hover:bg-cyan-500 hover:-translate-y-1
  `,
};
