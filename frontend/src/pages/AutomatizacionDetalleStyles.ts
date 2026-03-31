import type { Theme } from '../context/ThemeContext';

export const detalleStyles = {
  container: `max-w-3xl mx-auto px-4 py-10`,

  btnVolver: (theme: Theme) => `
    mb-6 flex items-center gap-2 text-sm font-medium transition-colors duration-200 cursor-pointer
    ${theme === 'dark' ? 'text-[#64748b] hover:text-[#94a3b8]' : 'text-gray-400 hover:text-gray-600'}
  `,

  header: `flex items-start justify-between gap-4 mb-6`,

  timelineWrapper: `mb-6`,

  section: (theme: Theme) => `
    rounded-xl border p-5 mb-4
    ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}
  `,

  sectionLabel: (theme: Theme) => `
    text-xs font-semibold uppercase tracking-widest mb-2
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,

  sectionLabelMb3: (theme: Theme) => `
    text-xs font-semibold uppercase tracking-widest mb-3
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,

  gastoText: (theme: Theme) => `
    mt-2 text-sm font-semibold
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,

  propuestaBox: (theme: Theme) => `
    rounded-xl border p-5 mb-4
    ${theme === 'dark' ? 'bg-cyan-400/5 border-cyan-400/20' : 'bg-cyan-50 border-cyan-200'}
  `,

  propuestaLabel: (theme: Theme) => `
    text-xs font-semibold uppercase tracking-widest mb-1
    ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}
  `,

  propuestaGasto: (theme: Theme) => `
    text-lg font-bold mb-3
    ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
  `,

  propuestaActions: `flex gap-3`,

  btnAceptarPropuesta: `
    px-4 py-2 rounded-lg text-sm font-semibold
    bg-cyan-400 text-[#0f172a]
    hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer
  `,

  btnRechazarPropuesta: `
    px-4 py-2 rounded-lg text-sm font-semibold
    border border-red-400/50 text-red-400
    hover:bg-red-400/10 transition-colors duration-200 cursor-pointer
  `,

  cancelWrapper: `mb-4`,
};
