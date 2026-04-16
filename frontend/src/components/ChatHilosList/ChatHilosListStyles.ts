import type { Theme } from '../../context/ThemeContext';

export const styles = {
  wrapper: (theme: Theme) => `
    w-64 flex-shrink-0 border-r flex flex-col
    ${theme === 'dark' ? 'border-[#334155] bg-[#1e293b]' : 'border-gray-200 bg-white'}
  `,
  header: (theme: Theme) => `
    px-4 py-3 border-b text-sm font-semibold
    ${theme === 'dark' ? 'border-[#334155] text-[#f1f5f9]' : 'border-gray-200 text-gray-900'}
  `,
  list: `flex-1 overflow-y-auto`,
  item: (activo: boolean, theme: Theme) => `
    px-4 py-3 cursor-pointer border-b transition-colors
    ${theme === 'dark'
      ? `border-[#334155] hover:bg-[#0f172a] ${activo ? 'bg-[#0f172a] border-l-2 border-l-cyan-500' : ''}`
      : `border-gray-100 hover:bg-gray-50 ${activo ? 'bg-cyan-50 border-l-2 border-l-cyan-500' : ''}`
    }
  `,
  nombre: (theme: Theme) => `
    text-sm font-medium truncate
    ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
  `,
  preview: (theme: Theme) => `
    text-xs truncate mt-0.5
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}
  `,
  badge: `
    ml-auto flex-shrink-0 bg-cyan-500 text-white text-[10px]
    font-bold rounded-full w-5 h-5 flex items-center justify-center
  `,
  row: `flex items-center gap-2`,
  empty: (theme: Theme) => `
    p-4 text-sm text-center
    ${theme === 'dark' ? 'text-[#475569]' : 'text-gray-400'}
  `,
  searchWrapper: (theme: Theme) => `
    px-3 py-2 border-b
    ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-200'}
  `,
  searchInput: (theme: Theme) => `
    w-full rounded-lg px-3 py-1.5 text-xs outline-none
    ${theme === 'dark'
      ? 'bg-[#0f172a] border border-[#334155] text-[#e2e8f0] placeholder-[#475569] focus:border-cyan-500'
      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-400'
    }
    transition-colors
  `,
};
