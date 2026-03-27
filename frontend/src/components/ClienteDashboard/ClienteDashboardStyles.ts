import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // --- PAGE ---
    page: (theme: Theme) => `
        min-h-screen px-4 py-10
        ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-50'}
    `,
    container: `
        max-w-3xl mx-auto
    `,
    pageTitle: (theme: Theme) => `
        text-2xl sm:text-3xl font-bold mb-1
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
    `,
    pageSubtitle: (theme: Theme) => `
        text-sm mb-8
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}
    `,

    // --- CARD ---
    card: (theme: Theme) => `
        rounded-xl border p-5 mb-4
        ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155]' : 'bg-white border-gray-200'}
        transition-all duration-200
    `,
    cardHeader: `
        flex items-start justify-between gap-4 mb-3
    `,
    cardTitle: (theme: Theme) => `
        text-base font-semibold
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
    `,
    cardMeta: (theme: Theme) => `
        text-xs
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}
    `,
    cardDescription: (theme: Theme) => `
        text-sm mb-4
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
    `,

    // --- BADGE ---
    badge: (estado: string) => {
        const map: Record<string, string> = {
            pendiente_revision: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
            aceptada_pendiente_cliente: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400',
            en_desarrollo: 'bg-violet-400/10 border-violet-400/30 text-violet-400',
            terminada: 'bg-green-500/10 border-green-500/30 text-green-400',
            rechazada: 'bg-red-500/10 border-red-500/30 text-red-400',
        };
        return `text-xs font-medium px-2.5 py-1 rounded-full border ${map[estado] ?? 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`;
    },

    badgeLabel: (estado: string): string => {
        const map: Record<string, string> = {
            pendiente_revision: 'Pendiente revisión',
            aceptada_pendiente_cliente: 'Propuesta recibida',
            en_desarrollo: 'En desarrollo',
            terminada: 'Terminada',
            rechazada: 'Rechazada',
        };
        return map[estado] ?? estado;
    },

    // --- PROPUESTA ---
    propuestaBox: (theme: Theme) => `
        mt-3 p-4 rounded-lg border
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
    btnAceptar: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-cyan-400 text-[#0f172a]
        hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer
    `,
    btnRechazar: `
        px-4 py-2 rounded-lg text-sm font-semibold
        border border-red-400/50 text-red-400
        hover:bg-red-400/10 transition-colors duration-200 cursor-pointer
    `,

    // --- RECHAZO ---
    motivoRechazo: `
        mt-2 text-sm text-red-400
    `,

    // --- EMPTY ---
    emptyWrapper: (theme: Theme) => `
        text-center py-20
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    emptyTitle: (theme: Theme) => `
        text-lg font-semibold mb-2
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
    `,
    emptyLink: `
        inline-block mt-4 px-5 py-2.5 rounded-lg text-sm font-semibold
        bg-cyan-400 text-[#0f172a]
        hover:bg-[#06b6d4] transition-colors duration-200
    `,

    // --- ACTUALIZACIONES (CLIENTE) ---
    updatesSection: (theme: Theme) => `
        mt-4 pt-4 border-t
        ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-100'}
    `,
    updatesSectionTitle: (theme: Theme) => `
        text-xs font-semibold uppercase tracking-widest mb-3
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    updateItem: (theme: Theme) => `
        mb-3 p-3 rounded-lg
        ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-50'}
    `,
    updateItemHeader: `
        flex items-center justify-between mb-1
    `,
    updateItemMsg: (theme: Theme) => `
        text-sm
        ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
    `,
    updateItemDate: (theme: Theme) => `
        text-xs
        ${theme === 'dark' ? 'text-[#475569]' : 'text-gray-400'}
    `,
    updateItemPct: `
        text-xs font-semibold text-violet-400
    `,
    progressBarTrack: (theme: Theme) => `
        w-full h-1.5 rounded-full mt-2 overflow-hidden
        ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-gray-200'}
    `,
    progressBarFill: `
        h-full rounded-full bg-violet-400 transition-all duration-500
    `,

    // --- LOADING / ERROR ---
    loadingText: (theme: Theme) => `
        text-center py-20 text-sm
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    errorText: `
        text-center py-20 text-sm text-red-400
    `,
};
