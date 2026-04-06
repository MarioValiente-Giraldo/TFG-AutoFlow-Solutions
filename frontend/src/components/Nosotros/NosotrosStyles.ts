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
  // MISIÓN
  // ===========================
  mision: (theme: Theme) => `
    py-20 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}
  `,
  misionInner: `
    max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center
  `,
  misionLabel: (theme: Theme) => `
    text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  misionQuote: (theme: Theme) => `
    text-2xl sm:text-3xl font-bold leading-snug
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  misionQuoteAccent: `
    text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
  `,

  // ===========================
  // VALORES
  // ===========================
  valores: (theme: Theme) => `
    py-24 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
  `,
  valoresInner: `
    max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  `,
  valoresLabel: (theme: Theme) => `
    text-center text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  valoresTitle: (theme: Theme) => `
    text-center text-3xl sm:text-4xl font-bold mb-16
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  valoresGrid: `
    grid grid-cols-1 sm:grid-cols-3 gap-8
  `,
  valorCard: (theme: Theme) => `
    flex flex-col items-center text-center p-8 rounded-2xl
    ${theme === 'dark'
      ? 'bg-slate-800 border border-slate-700'
      : 'bg-gray-50 border border-gray-200'
    }
  `,
  valorIconWrapper: (theme: Theme, color: string) => `
    w-14 h-14 rounded-xl flex items-center justify-center mb-5
    ${color === 'cyan'
      ? theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-100'
      : color === 'blue'
        ? theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'
        : theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-100'
    }
  `,
  valorIconSvg: (theme: Theme, color: string) => `
    w-7 h-7
    ${color === 'cyan'
      ? theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
      : color === 'blue'
        ? theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        : theme === 'dark' ? 'text-violet-400' : 'text-violet-600'
    }
  `,
  valorTitle: (theme: Theme) => `
    text-lg font-bold mb-2
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  valorDesc: (theme: Theme) => `
    text-sm leading-relaxed
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,

  // ===========================
  // CONTACTO
  // ===========================
  contacto: (theme: Theme) => `
    py-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}
  `,
  contactoInner: `
    max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center
  `,
  contactoLabel: (theme: Theme) => `
    text-sm font-semibold uppercase tracking-widest mb-4
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  contactoTitle: (theme: Theme) => `
    text-3xl sm:text-4xl font-bold mb-4
    ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
  `,
  contactoDesc: (theme: Theme) => `
    text-base leading-relaxed mb-10
    ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
  `,
  contactoBox: (theme: Theme) => `
    flex items-center justify-center gap-4 p-6 rounded-2xl
    ${theme === 'dark'
      ? 'bg-slate-800 border border-slate-700'
      : 'bg-white border border-gray-200 shadow-sm'
    }
  `,
  contactoIconWrapper: (theme: Theme) => `
    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
    ${theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-100'}
  `,
  contactoIconSvg: (theme: Theme) => `
    w-6 h-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,
  contactoEmail: (theme: Theme) => `
    text-lg font-semibold
    ${theme === 'dark' ? 'text-slate-100 hover:text-cyan-400' : 'text-gray-900 hover:text-cyan-600'}
    transition-colors duration-200
  `,
};
