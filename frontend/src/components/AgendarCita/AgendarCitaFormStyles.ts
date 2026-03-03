import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // --- CARD ---
    card: (theme: Theme) => `
        w-full max-w-2xl
        ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155] shadow-black/50' : 'bg-white border-gray-200 shadow-gray-400/30'}
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl
        border
        transition-all duration-300
    `,

    // --- HEADER ---
    title: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
        text-2xl sm:text-3xl font-bold leading-tight mb-2
    `,
    subtitle: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
        text-sm
    `,

    // --- SECTION ---
    sectionTitle: (theme: Theme) => `
        text-xs font-semibold uppercase tracking-widest mb-4
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    sectionDivider: (theme: Theme) => `
        border-t ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-200'}
        pt-5
    `,

    // --- FORM LAYOUT ---
    form: `
        flex flex-col gap-5
    `,
    formRow: `
        grid grid-cols-1 sm:grid-cols-2 gap-5
    `,
    formField: `
        flex flex-col gap-2
    `,
    label: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
        text-sm font-medium
    `,
    required: `
        text-cyan-400 ml-0.5
    `,

    // --- INPUTS ---
    input: (theme: Theme) => `
        w-full h-11 px-4
        rounded-lg border
        ${theme === 'dark'
            ? 'bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400'
        }
        focus:outline-none
        focus:border-[#22d3ee]
        focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-300
    `,
    selectWrapper: `
        relative
    `,
    select: (theme: Theme) => `
        w-full h-11 px-4 pr-10
        rounded-lg border
        appearance-none
        ${theme === 'dark'
            ? 'bg-[#0f172a] border-[#334155] text-[#f1f5f9]'
            : 'bg-gray-50 border-gray-300 text-gray-900'
        }
        focus:outline-none
        focus:border-[#22d3ee]
        focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-300
        cursor-pointer
    `,
    selectArrow: (theme: Theme) => `
        pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,
    textarea: (theme: Theme) => `
        w-full px-4 py-3
        rounded-lg border
        ${theme === 'dark'
            ? 'bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400'
        }
        focus:outline-none
        focus:border-[#22d3ee]
        focus:ring-2 focus:ring-[#22d3ee]/20
        transition-all duration-300
        resize-none
    `,
    charCount: (theme: Theme) => `
        text-xs text-right
        ${theme === 'dark' ? 'text-[#64748b]' : 'text-gray-400'}
    `,

    // --- TOGGLE BUTTONS (Franja / Presupuesto) ---
    radioGroup: `
        flex flex-wrap gap-2
    `,
    radioButton: (theme: Theme, selected: boolean) => `
        flex-1 min-w-[90px] py-2.5 px-3
        rounded-lg border cursor-pointer
        text-sm font-medium text-center
        transition-all duration-200
        ${selected
            ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
            : theme === 'dark'
                ? 'bg-[#0f172a] border-[#334155] text-[#94a3b8] hover:border-[#22d3ee]/40 hover:text-[#cbd5e1]'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:border-cyan-300 hover:text-gray-900'
        }
    `,

    // --- VIDEOCALL INFO ---
    videoInfo: (theme: Theme) => `
        flex items-start gap-3 p-3.5 rounded-lg mt-4
        ${theme === 'dark' ? 'bg-cyan-400/5 border border-cyan-400/20' : 'bg-cyan-50 border border-cyan-200'}
        text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
    `,
    videoIcon: `
        text-cyan-400 flex-shrink-0 mt-0.5
    `,

    // --- CHECKBOX ---
    checkboxWrapper: `
        flex items-center gap-3
    `,
    checkbox: `
        w-4 h-4 accent-[#22d3ee] cursor-pointer flex-shrink-0
    `,
    checkboxLabel: (theme: Theme) => `
        text-sm ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
        cursor-pointer
    `,

    // --- SUBMIT ---
    submitButton: `
        w-full h-11 mt-2
        flex items-center justify-center
        bg-[#22d3ee] text-[#0f172a]
        text-[15px] font-bold tracking-wide
        rounded-lg border-none cursor-pointer
        hover:bg-[#06b6d4] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:-translate-y-0.5
        active:translate-y-0
        transition-all duration-300
    `,

    // --- STATUS MESSAGE ---
    statusMessage: (success: boolean) => `
        p-3 rounded-lg text-sm text-center border transition-all duration-300
        ${success
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }
    `,

    // --- SUCCESS STATE ---
    successWrapper: `
        flex flex-col items-center text-center gap-5 py-8
    `,
    successIconWrapper: `
        w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20
        flex items-center justify-center
    `,
    successTitle: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
        text-xl font-bold
    `,
    successText: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
        text-sm max-w-xs leading-relaxed
    `,
    backButton: `
        mt-2 px-6 py-2.5
        bg-[#22d3ee] text-[#0f172a]
        text-sm font-bold rounded-lg
        hover:bg-[#06b6d4]
        transition-colors duration-300
    `,
};
