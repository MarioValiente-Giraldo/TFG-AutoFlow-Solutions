import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // Contenedor principal
    registerContainer: (theme: Theme) => `
        w-full max-w-[500px]
        ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155] shadow-black/50' : 'bg-white border-gray-200 shadow-gray-400/30'}
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl
        transition-all duration-300
        border
    `,

    // --- HEADER ---
    header: `
        text-center mb-8
    `,
    title: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
        text-2xl font-bold text-center leading-tight mb-3
    `,
    subtitle: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
        text-sm text-center
    `,

    // --- BARRA DE PROGRESO (Exclusivo de Register) ---
    progressContainer: `
        flex flex-col gap-2 mb-8
    `,
    progressHeader: `
        flex justify-between items-end mb-1
    `,
    progressStep: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'} text-sm font-medium
    `,
    progressLabel: `
        text-[#22d3ee] text-sm font-medium
    `,
    progressBarBg: (theme: Theme) => `
        h-1.5 w-full ${theme === 'dark' ? 'bg-[#334155]' : 'bg-gray-300'} rounded-full overflow-hidden
    `,
    progressBarFill: `
        h-full bg-[#22d3ee] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]
    `,

    // --- FORMULARIO ---
    form: `
        flex flex-col gap-5
    `,
    formField: `
        flex flex-col gap-2
    `,
    label: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
        text-sm font-medium
    `,

    // Inputs
    input: (theme: Theme) => `
        w-full h-11 px-4
        rounded-lg border
        ${theme === 'dark'
            ? 'bg-[#0f172a] border-[#334155] text-[#f1f5f9] placeholder:text-[#64748b]'
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400'
        }

        /* Focus */
        focus:outline-none
        focus:border-[#22d3ee]
        focus:ring-2 focus:ring-[#22d3ee]/20

        transition-all duration-300
    `,

    // --- TERMS CHECKBOX ---
    termsWrapper: `
        flex items-start gap-3 py-2 mt-1
    `,
    checkbox: (theme: Theme) => `
        mt-0.5 h-4 w-4 rounded
        border ${theme === 'dark' ? 'border-[#334155] bg-[#0f172a]' : 'border-gray-300 bg-white'}
        text-[#22d3ee]
        focus:ring-offset-0 focus:ring-2 focus:ring-[#22d3ee]/20
        cursor-pointer
        accent-[#22d3ee]
    `,
    termsLabel: (theme: Theme) => `
        text-xs ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'} leading-relaxed
    `,
    termsLink: `
        text-[#22d3ee] hover:text-[#06b6d4] hover:underline cursor-pointer transition-colors
    `,

    // --- BOTÓN SUBMIT ---
    submitButton: `
        w-full h-11 mt-4
        flex items-center justify-center
        bg-[#22d3ee] text-[#0f172a]
        text-[15px] font-bold tracking-wide
        rounded-lg border-none cursor-pointer

        hover:bg-[#06b6d4] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:-translate-y-0.5
        active:translate-y-0

        transition-all duration-300
    `,

    // --- LOGIN LINK (Footer) ---
    loginLinkWrapper: (theme: Theme) => `
        mt-8 text-center pt-6 border-t ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-200'}
    `,
    loginText: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'} text-sm
    `,
    loginLink: (theme: Theme) => `
        text-[#22d3ee] font-bold ml-1
        ${theme === 'dark' ? 'hover:text-[#f1f5f9]' : 'hover:text-cyan-600'} hover:underline
        transition-colors duration-300
    `
};