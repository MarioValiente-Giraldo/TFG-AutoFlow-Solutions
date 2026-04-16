import type { Theme } from '../../context/ThemeContext';

export const styles = {
  wrapper: (theme: Theme) => `
    flex flex-col h-[500px] rounded-xl border overflow-hidden
    ${theme === 'dark' ? 'bg-[#0f172a] border-[#334155]' : 'bg-gray-50 border-gray-200'}
  `,
  header: (theme: Theme) => `
    px-4 py-3 border-b text-sm font-semibold
    ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155] text-[#f1f5f9]' : 'bg-white border-gray-200 text-gray-900'}
  `,
  messages: `flex-1 overflow-y-auto px-4 py-4`,
  empty: (theme: Theme) => `
    h-full flex items-center justify-center text-sm text-center
    ${theme === 'dark' ? 'text-[#475569]' : 'text-gray-400'}
  `,
  error: `h-full flex items-center justify-center text-sm text-center text-red-400`,
};
