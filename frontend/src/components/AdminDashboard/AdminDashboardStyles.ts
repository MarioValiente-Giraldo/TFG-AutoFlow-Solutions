import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // --- PAGE ---
    page: (theme: Theme) => `
        min-h-screen px-4 py-10
        ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-gray-50'}
    `,
    container: `
        max-w-7xl mx-auto
    `,
    pageTitle: (theme: Theme) => `
        text-2xl sm:text-3xl font-bold mb-1
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
    `,
    pageSubtitle: (theme: Theme) => `
        text-sm mb-8
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-500'}
    `,

    // --- SECTION ---
    section: `
        mb-10
    `,
    sectionTitle: (theme: Theme) => `
        text-xs font-semibold uppercase tracking-widest mb-4
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    sectionDivider: (theme: Theme) => `
        border-t mb-4
        ${theme === 'dark' ? 'border-[#1e293b]' : 'border-gray-200'}
    `,
    emptySection: (theme: Theme) => `
        text-sm italic
        ${theme === 'dark' ? 'text-[#334155]' : 'text-gray-300'}
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
            aceptada_pendiente_cliente: 'Esperando cliente',
            en_desarrollo: 'En desarrollo',
            terminada: 'Terminada',
            rechazada: 'Rechazada',
        };
        return map[estado] ?? estado;
    },

    // --- ACTIONS ---
    actionsRow: `
        flex flex-wrap gap-2 mt-3
    `,
    btnAccept: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-cyan-400 text-[#0f172a]
        hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer
    `,
    btnReject: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-red-500/10 border border-red-500/30 text-red-400
        hover:bg-red-500/20 transition-colors duration-200 cursor-pointer
    `,
    btnDone: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-green-500/10 border border-green-500/30 text-green-400
        hover:bg-green-500/20 transition-colors duration-200 cursor-pointer
    `,

    // --- INLINE FORM ---
    inlineForm: (theme: Theme) => `
        mt-3 p-4 rounded-lg border
        ${theme === 'dark' ? 'bg-[#0f172a] border-[#334155]' : 'bg-gray-50 border-gray-200'}
    `,
    inlineLabel: (theme: Theme) => `
        block text-sm font-medium mb-1
        ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
    `,
    inlineInput: (theme: Theme) => `
        w-full h-10 px-3 rounded-lg border text-sm
        ${theme === 'dark'
            ? 'bg-[#1e293b] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
        }
        focus:outline-none focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-200
    `,
    inlineTextarea: (theme: Theme) => `
        w-full px-3 py-2 rounded-lg border text-sm resize-none
        ${theme === 'dark'
            ? 'bg-[#1e293b] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
        }
        focus:outline-none focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-200
    `,
    inlineActions: `
        flex gap-2 mt-3
    `,
    btnConfirm: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-[#22d3ee] text-[#0f172a]
        hover:bg-[#06b6d4] transition-colors duration-200 cursor-pointer
    `,
    btnCancel: (theme: Theme) => `
        px-4 py-2 rounded-lg text-sm font-semibold
        ${theme === 'dark' ? 'text-[#64748b] hover:text-[#94a3b8]' : 'text-gray-400 hover:text-gray-600'}
        transition-colors duration-200 cursor-pointer
    `,

    // --- TABS ---
    tabsWrapper: `
        flex flex-wrap gap-2 mb-8
    `,
    tab: (active: boolean, theme: Theme) => `
        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
        ${active
            ? 'bg-cyan-400 text-[#0f172a]'
            : theme === 'dark'
                ? 'bg-[#1e293b] border border-[#334155] text-[#64748b] hover:text-[#94a3b8]'
                : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-700'
        }
    `,
    tabCount: `
        ml-1.5 text-xs opacity-70
    `,

    // --- MOTIVO RECHAZO ---
    motivoRechazo: `
        mt-2 text-sm text-red-400
    `,

    // --- ACTUALIZACIONES (ADMIN) ---
    updateFormSection: (theme: Theme) => `
        mt-4 pt-4 border-t
        ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-100'}
    `,
    updateFormTitle: (theme: Theme) => `
        text-xs font-semibold uppercase tracking-widest mb-3
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    updateFormRow: `
        flex flex-col sm:flex-row gap-2 mb-2
    `,
    updateFormPctInput: (theme: Theme) => `
        w-full sm:w-24 h-10 px-3 rounded-lg border text-sm
        ${theme === 'dark'
            ? 'bg-[#1e293b] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
        }
        focus:outline-none focus:border-[#22d3ee] focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-200
    `,
    btnPublish: `
        px-4 py-2 rounded-lg text-sm font-semibold
        bg-violet-500/10 border border-violet-500/30 text-violet-400
        hover:bg-violet-500/20 transition-colors duration-200 cursor-pointer
    `,
    updateHistorySection: (theme: Theme) => `
        mt-4 pt-4 border-t
        ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-100'}
    `,
    updateHistoryTitle: (theme: Theme) => `
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
