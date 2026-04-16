import type { Theme } from '../../context/ThemeContext';

export const styles = {
  grid: `
    grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8
  `,
  card: (theme: Theme) => `
    rounded-xl border p-5
    ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}
  `,
  label: (theme: Theme) => `
    text-xs mb-1
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,
  value: (theme: Theme) => `
    text-xl sm:text-2xl font-bold
    ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
  `,
};
