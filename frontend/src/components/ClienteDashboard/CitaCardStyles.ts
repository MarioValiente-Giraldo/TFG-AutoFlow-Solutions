import type { Theme } from '../../context/ThemeContext';

export const styles = {
  card: (theme: Theme) => `
    rounded-xl border p-5 mb-4
    ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}
    transition-colors duration-300
  `,
  header: `
    flex items-start justify-between gap-4 mb-3
  `,
  title: (theme: Theme) => `
    text-base font-semibold
    ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
  `,
  meta: (theme: Theme) => `
    text-xs mt-0.5
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}
  `,
  badge: (estado: 'pendiente' | 'atendida') => {
    const map = {
      pendiente: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
      atendida:  'bg-green-500/10 border-green-500/30 text-green-400',
    };
    return `text-xs font-medium px-2.5 py-1 rounded-full border ${map[estado]}`;
  },
  badgeLabel: (estado: 'pendiente' | 'atendida') => {
    const map = { pendiente: 'Pendiente', atendida: 'Atendida' };
    return map[estado];
  },
  description: (theme: Theme) => `
    text-sm mb-3
    ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
  `,
  detailRow: `
    flex flex-wrap gap-4 text-xs
  `,
  detailItem: (theme: Theme) => `
    ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
  `,
  detailValue: (theme: Theme) => `
    font-medium
    ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
  `,
  btnEditar: `
    mt-4 px-4 py-2 rounded-lg text-sm font-semibold
    bg-cyan-400/10 border border-cyan-400/30 text-cyan-400
    hover:bg-cyan-400/20 transition-colors duration-200 cursor-pointer
  `,
};
