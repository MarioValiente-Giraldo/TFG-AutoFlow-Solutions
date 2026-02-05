export const styles = {
    // Footer container styling
    footer: `
        bg-white border-t border-slate-200 
        py-8 md:py-12
        dark:bg-slate-900 dark:border-slate-800
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
    // NUEVO: Clase específica para la imagen del logo pequeña
    logoImage: `
        h-8 w-auto object-contain
    `,
    logoText: `
        font-bold text-lg text-slate-800 
        dark:text-slate-100
        transition-colors duration-300
    `,

    // --- COPYRIGHT ---
    copyright: `
        text-sm text-slate-500 
        dark:text-slate-400
        transition-colors duration-300 text-center md:text-left
    `,

    // --- REDES SOCIALES ---
    socialWrapper: `
        flex gap-6
    `,
    socialLink: `
        text-slate-400 hover:text-slate-800
        dark:text-slate-500 dark:hover:text-slate-100
        transition-colors duration-300
    `,
    socialIcon: `
        h-5 w-5
    `,
    
    // Utilidad para accesibilidad (Screen Reader Only)
    srOnly: `
        sr-only
    `
};