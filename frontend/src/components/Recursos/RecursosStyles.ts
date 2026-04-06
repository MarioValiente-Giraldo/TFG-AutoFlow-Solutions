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
    relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center
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
  heroDesc: (theme: Theme) => `
    text-lg sm:text-xl leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,

  // ===========================
  // FAQ
  // ===========================
  faq: (theme: Theme) => `
    py-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}
  `,
  faqInner: `
    max-w-3xl mx-auto px-4 sm:px-6 lg:px-8
  `,
  faqLabel: (theme: Theme) => `
    text-center text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  faqTitle: (theme: Theme) => `
    text-center text-3xl sm:text-4xl font-bold mb-12
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  faqList: `
    flex flex-col gap-3
  `,
  faqItem: (theme: Theme) => `
    rounded-xl overflow-hidden border
    ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-gray-200 bg-white'}
  `,
  faqButton: (theme: Theme) => `
    w-full flex items-center justify-between gap-4 px-6 py-5 text-left
    ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}
    transition-colors duration-200
  `,
  faqQuestion: (theme: Theme) => `
    text-base font-semibold
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  faqChevron: (theme: Theme, open: boolean) => `
    w-5 h-5 flex-shrink-0 transition-transform duration-300
    ${open ? 'rotate-180' : ''}
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  faqAnswer: (theme: Theme) => `
    px-6 pb-5 text-sm leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,

  // ===========================
  // CASOS DE USO
  // ===========================
  casos: (theme: Theme) => `
    py-24 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
  `,
  casosInner: `
    max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  `,
  casosLabel: (theme: Theme) => `
    text-center text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  casosTitle: (theme: Theme) => `
    text-center text-3xl sm:text-4xl font-bold mb-4
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  casosDesc: (theme: Theme) => `
    text-center max-w-2xl mx-auto mb-16 text-base leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,
  casosGrid: `
    grid grid-cols-1 sm:grid-cols-3 gap-8
  `,
  casoCard: (theme: Theme) => `
    flex flex-col p-8 rounded-2xl
    ${theme === 'dark'
      ? 'bg-slate-800 border border-slate-700'
      : 'bg-gray-50 border border-gray-200'
    }
  `,
  casoIconWrapper: (theme: Theme, color: string) => `
    w-12 h-12 rounded-xl flex items-center justify-center mb-6 flex-shrink-0
    ${color === 'cyan'
      ? theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-100'
      : color === 'blue'
        ? theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'
        : theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-100'
    }
  `,
  casoIconSvg: (theme: Theme, color: string) => `
    w-6 h-6
    ${color === 'cyan'
      ? theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
      : color === 'blue'
        ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        : theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
    }
  `,
  casoTag: (theme: Theme, color: string) => `
    inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold
    ${color === 'cyan'
      ? theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
      : color === 'blue'
        ? theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-700'
        : theme === 'dark' ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-100 text-violet-700'
    }
  `,
  casoTitle: (theme: Theme) => `
    text-lg font-bold mb-3
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  casoDesc: (theme: Theme) => `
    text-sm leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,
};
