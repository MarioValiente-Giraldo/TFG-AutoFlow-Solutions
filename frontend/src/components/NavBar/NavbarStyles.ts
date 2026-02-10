export const styles = {
    // --- ESTRUCTURA GENERAL ---
    navbar: `
        sticky top-0 z-50 w-full 
        backdrop-blur-md bg-slate-900/90 border-b border-slate-700
        transition-colors duration-300
    `,
    container: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,
    content: `
        flex items-center justify-between h-20
    `,

    // --- LOGO ---
    logoContainer: `
        flex-shrink-0 flex items-center gap-3 cursor-pointer select-none group
    `,
    logoImage: `
        h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105
    `,
    logoTextWrapper: `
        flex flex-col
    `,
    logoTitle: `
        font-bold text-xl tracking-tighter leading-none text-slate-100
    `,
    logoSubtitle: `
        text-sm font-light tracking-wide leading-none text-slate-400
    `,

    // --- MENÚ ESCRITORIO ---
    menuWrapper: `
        hidden md:block
    `,
    menuList: `
        ml-10 flex items-baseline space-x-8
    `,
    menuLink: `
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 cursor-pointer
    `,

    // --- CTA (BOTONES ACCIÓN) ---
    ctaWrapper: `
        hidden md:flex items-center gap-4
    `,

    // 1. Botón Principal (Agendar) - Resalta mucho (Cyan)
    ctaButton: `
        group relative flex items-center gap-2
        bg-cyan-400 text-slate-900 font-bold text-sm
        px-5 py-2.5 rounded-lg
        shadow-lg shadow-cyan-400/20
        transition-all duration-300 transform
        hover:bg-cyan-300 hover:-translate-y-0.5 hover:shadow-cyan-400/40
    `,

    // 2. Botón Secundario (Mi Espacio / Login) - Borde sutil
    ctaLoginBtn: `
        flex items-center gap-2
        text-slate-200 font-medium text-sm
        px-4 py-2.5 rounded-lg 
        border border-slate-700 bg-slate-800/50
        transition-all duration-300
        hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800
    `,

    // 3. Botón Cerrar Sesión - Discreto (Ghost) con hover rojo
    logoutBtn: `
        group flex items-center gap-2
        text-slate-400 text-sm font-medium
        px-3 py-2 rounded-lg
        border border-transparent
        transition-all duration-200
        hover:text-red-400 hover:bg-red-500/10 cursor-pointer
    `,

    // --- MENÚ MÓVIL (Hamburguesa) ---
    mobileBtnWrapper: `
        flex items-center md:hidden
    `,
    mobileBtn: `
        inline-flex items-center justify-center p-2 rounded-md 
        text-slate-400 hover:text-white hover:bg-slate-700 
        transition-colors focus:outline-none
    `
};