import type { Theme } from '../../context/ThemeContext';

export const styles = {
  wrapper: (esPropio: boolean) => `
    flex mb-3
    ${esPropio ? 'justify-end' : 'justify-start'}
  `,
  bubble: (esPropio: boolean, theme: Theme) => `
    min-w-[80px] px-4 py-2 rounded-2xl text-sm leading-relaxed break-words
    ${esPropio
      ? 'bg-cyan-500 text-white rounded-br-none'
      : theme === 'dark'
        ? 'bg-[#1e293b] text-[#e2e8f0] border border-[#334155] rounded-bl-none'
        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
    }
  `,
  meta: (esPropio: boolean, theme: Theme) => `
    text-[10px] mt-1
    ${esPropio ? 'text-right text-cyan-100' : theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,
};
