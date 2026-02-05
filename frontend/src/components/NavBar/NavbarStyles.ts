export const styles = {
    // Navbar: Sticky, Blur, Bordes (Estilo Dark por defecto)
    navbar: `
        sticky top-0 z-50 w-full 
        backdrop-blur-md bg-slate-900/90 border-b border-slate-700
        transition-colors duration-300
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
        font-bold text-xl tracking-tighter leading-none text-slate-100
    `,
    logoSubtitle: `
        text-sm font-light tracking-wide leading-none text-slate-400
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
        text-slate-300 hover:text-cyan-400
    `,

    // --- CTA WRAPPER ---
    ctaWrapper: `
        hidden md:flex items-center gap-3
    `,

    // Botón Principal (Consultoría)
    ctaButton: `
        bg-cyan-400 text-slate-900 font-semibold 
        px-5 py-2.5 rounded-lg
        shadow-lg shadow-cyan-400/20
        transition-all duration-300 transform
        hover:bg-cyan-500 hover:-translate-y-0.5
    `,

    // Botón Secundario (Identifíquese)
    ctaLoginBtn: `
        text-slate-300 font-medium
        px-4 py-2.5 rounded-lg border border-transparent
        transition-all duration-300
        hover:text-cyan-400 hover:bg-slate-800
    `,

    // --- MENÚ MÓVIL ---
    mobileBtnWrapper: `
        flex items-center md:hidden
    `,
    mobileBtn: `
        inline-flex items-center justify-center p-2 rounded-md transition-all duration-300
        text-slate-400 hover:text-slate-100 hover:bg-slate-700
        focus:outline-none
    `
};