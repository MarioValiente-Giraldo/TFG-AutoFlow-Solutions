import type { Theme } from '../../context/ThemeContext';

type StepStatus = 'done' | 'current' | 'future' | 'rejected';

export const styles = {
  wrapper: `
    flex items-start gap-0 mb-5
  `,

  step: `
    flex flex-col items-center flex-1
  `,

  circle: (status: StepStatus) => {
    const base = 'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300';
    const map: Record<StepStatus, string> = {
      done:     'bg-green-500/20 border-green-500 text-green-400',
      current:  'bg-cyan-400/20 border-cyan-400 text-cyan-400',
      future:   'bg-transparent border-slate-600 text-slate-600',
      rejected: 'bg-red-500/20 border-red-500 text-red-400',
    };
    return `${base} ${map[status]}`;
  },

  label: (status: StepStatus, theme: Theme) => {
    const base = 'text-xs mt-1.5 text-center leading-tight transition-colors duration-300';
    const colorMap: Record<StepStatus, string> = {
      done:     'text-green-400',
      current:  'text-cyan-400 font-semibold',
      future:   theme === 'dark' ? 'text-slate-600' : 'text-gray-400',
      rejected: 'text-red-400',
    };
    return `${base} ${colorMap[status]}`;
  },

  connector: (done: boolean, theme: Theme) => `
    flex-1 h-0.5 mt-3.5 transition-colors duration-300
    ${done
      ? 'bg-green-500/50'
      : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
    }
  `,
};
