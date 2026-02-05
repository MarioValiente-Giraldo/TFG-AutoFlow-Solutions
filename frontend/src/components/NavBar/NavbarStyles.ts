export const styles = {
    // Navbar: Sticky, Blur, Bordes
    navbar: `
        sticky top-0 z-50 w-full 
        backdrop-blur-md bg-white/90 border-b border-slate-200
        transition-colors duration-300
        dark:bg-slate-900/90 dark:border-slate-700
    `,

    // Container
    container: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,

    // Content: Altura y alineación
    content: `
        flex items-center justify-between h-20
    `,

    // --- LOGO ---
    logoContainer: `
        flex-shrink-0 flex items-center gap-3 cursor-pointer
    `,
    logoImage: `
        h-10 w-auto object-contain
    `,
    logoTextWrapper: `
        flex flex-col
    `,
    logoTitle: `
        font-bold text-xl tracking-tighter leading-none text-slate-800 transition-colors duration-300
        dark:text-slate-100
    `,
    logoSubtitle: `
        text-sm font-light tracking-wide leading-none text-slate-500 transition-colors duration-300
        dark:text-slate-400
    `,

    // --- MENÚ DESKTOP ---
    menuWrapper: `
        hidden md:block
    `,
    menuList: `
        ml-10 flex items-baseline space-x-8
    `,
    menuLink: `
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
        text-slate-600 hover:text-cyan-400
        dark:text-slate-300 dark:hover:text-cyan-400
    `,

    // --- CTA WRAPPER (Ahora con gap para separar botones) ---
    ctaWrapper: `
        hidden md:flex items-center gap-3
    `,

    // Botón Principal (Consultoría)
    ctaButton: `
        bg-cyan-400 text-slate-900 font-semibold 
        px-5 py-2.5 rounded-lg
        shadow-lg shadow-cyan-400/20
        transition-all duration-300 transform
        hover:bg-cyan-300 hover:-translate-y-0.5
        dark:text-slate-900 dark:hover:bg-cyan-500
    `,

    // === NUEVO === Botón Secundario (Identifíquese)
    ctaLoginBtn: `
        text-slate-600 font-medium
        px-4 py-2.5 rounded-lg border border-transparent
        transition-all duration-300
        hover:text-cyan-500 hover:bg-slate-50
        dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-slate-800
    `,

    // --- MENÚ MÓVIL ---
    mobileBtnWrapper: `
        flex items-center md:hidden
    `,
    mobileBtn: `
        inline-flex items-center justify-center p-2 rounded-md transition-all duration-300
        text-slate-500 hover:text-slate-800 hover:bg-slate-100
        dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700
        focus:outline-none
    `
};