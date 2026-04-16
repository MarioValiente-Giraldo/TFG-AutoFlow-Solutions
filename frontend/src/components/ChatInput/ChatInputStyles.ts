import type { Theme } from '../../context/ThemeContext';

export const styles = {
  wrapper: (theme: Theme) => `
    border-t p-3 flex flex-col gap-1
    ${theme === 'dark' ? 'border-[#334155] bg-[#0f172a]' : 'border-gray-200 bg-white'}
  `,
  row: `flex gap-2 items-end`,
  textarea: (theme: Theme) => `
    flex-1 resize-none rounded-xl px-3 py-2 text-sm outline-none
    min-h-[40px] max-h-[120px]
    ${theme === 'dark'
      ? 'bg-[#1e293b] border border-[#334155] text-[#e2e8f0] placeholder-[#475569] focus:border-cyan-500'
      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-cyan-400'
    }
    transition-colors
  `,
  btn: (disabled: boolean) => `
    px-4 py-2 rounded-xl text-sm font-medium transition-colors
    ${disabled
      ? 'bg-cyan-500/30 text-cyan-300/50 cursor-not-allowed'
      : 'bg-cyan-500 hover:bg-cyan-400 text-white cursor-pointer'
    }
  `,
  counter: (cerca: boolean, theme: Theme) => `
    text-[10px] text-right
    ${cerca ? 'text-amber-400' : theme === 'dark' ? 'text-[#475569]' : 'text-gray-400'}
  `,
};
