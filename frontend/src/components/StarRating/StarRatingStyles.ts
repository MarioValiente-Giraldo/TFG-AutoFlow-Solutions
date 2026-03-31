import type { Theme } from '../../context/ThemeContext';

export const styles = {
  wrapper: `mt-4 pt-4 border-t`,
  wrapperBorder: (theme: Theme) =>
    theme === 'dark' ? 'border-[#334155]' : 'border-gray-100',

  label: (theme: Theme) => `
    text-xs font-semibold uppercase tracking-widest mb-3
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,

  starsRow: `flex gap-1 mb-3`,

  textarea: (theme: Theme) => `
    w-full rounded-lg border px-3 py-2 text-sm resize-none mb-3
    ${theme === 'dark'
      ? 'bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder-[#475569]'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}
    focus:outline-none focus:border-cyan-400
  `,

  btnEnviar: `
    px-4 py-2 rounded-lg text-sm font-semibold
    bg-cyan-400 text-[#0f172a]
    hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `,

  readonlyComment: (theme: Theme) => `
    text-sm mt-2
    ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
  `,

  readonlyDate: (theme: Theme) => `
    text-xs mt-1
    ${theme === 'dark' ? 'text-[#475569]' : 'text-gray-400'}
  `,
};
