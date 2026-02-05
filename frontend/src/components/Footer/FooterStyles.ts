export const styles = {
    // Footer container styling (Solo Dark: Fondo Slate-900, Borde Slate-800)
    footer: `
        bg-slate-900 border-t border-slate-800 
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
    
    logoText: `
        font-bold text-lg text-slate-100
        transition-colors duration-300
    `,

    // --- COPYRIGHT ---
    copyright: `
        text-sm text-slate-400
        transition-colors duration-300 text-center md:text-left
    `,

    // --- REDES SOCIALES ---
    socialWrapper: `
        flex gap-6
    `,
    
    socialLink: `
        text-slate-500 hover:text-slate-100
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