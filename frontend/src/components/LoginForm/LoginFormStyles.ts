import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // Contenedor de la tarjeta
    loginContainer: (theme: Theme) => `
        w-full max-w-[400px]
        ${theme === 'dark' ? 'bg-[#1e293b] border-[#334155] shadow-black/50' : 'bg-white border-gray-200 shadow-gray-400/30'}
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl
        transition-all duration-300
        border
    `,

    // --- HEADER ---
    headerContent: `
        flex flex-col items-center mb-8
    `,

    logo: `
        h-14 w-auto object-contain mb-6
    `,

    title: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#f1f5f9]' : 'text-gray-900'}
        text-2xl font-bold text-center leading-tight mb-3
    `,

    subtitle: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'}
        text-sm text-center
    `,

    // --- FORMULARIO ---
    form: `
        flex flex-col gap-5
    `,
    formField: `
        flex flex-col gap-2
    `,
    labelWrapper: `
        flex justify-between items-center
    `,
    label: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#cbd5e1]' : 'text-gray-700'}
        text-sm font-medium
    `,
    forgotPasswordLink: `
        text-[#22d3ee] text-xs font-medium
        hover:text-[#06b6d4] hover:underline
        transition-colors duration-300
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

    // Botón Submit
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

    // --- FOOTER SIGNUP ---
    signupWrapper: (theme: Theme) => `
        mt-8 text-center pt-6 border-t ${theme === 'dark' ? 'border-[#334155]' : 'border-gray-200'}
    `,
    signupText: (theme: Theme) => `
        ${theme === 'dark' ? 'text-[#94a3b8]' : 'text-gray-600'} text-sm
    `,
    signupLink: (theme: Theme) => `
        text-[#22d3ee] font-bold ml-1
        ${theme === 'dark' ? 'hover:text-[#f1f5f9]' : 'hover:text-cyan-600'} hover:underline
        transition-colors duration-300
    `
};