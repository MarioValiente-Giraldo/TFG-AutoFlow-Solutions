import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // Footer container styling
    footer: (theme: Theme) => `
        ${theme === 'dark' ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-gray-200'}
        py-8 md:py-12
        transition-colors duration-300
    `,

    // Flex container responsive
    container: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        flex flex-col md:flex-row justify-between items-center gap-6
    `,

    // --- LOGO ---
    logoWrapper: `
        flex items-center gap-3
    `,

    logoImage: `
        h-8 w-auto object-contain
    `,

    logoText: (theme: Theme) => `
        font-bold text-lg ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
        transition-colors duration-300
    `,

    // --- COPYRIGHT ---
    copyright: (theme: Theme) => `
        text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
        transition-colors duration-300 text-center md:text-left
    `,

    // --- REDES SOCIALES ---
    socialWrapper: `
        flex gap-6
    `,

    socialLink: (theme: Theme) => `
        ${theme === 'dark' ? 'text-slate-500 hover:text-slate-100' : 'text-gray-500 hover:text-gray-900'}
        transition-colors duration-300
    `,

    socialIcon: `
        h-5 w-5
    `,

    // Utilidad para accesibilidad
    srOnly: `
        sr-only
    `
};