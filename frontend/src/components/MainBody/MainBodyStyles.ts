export const styles = {
    // ===========================
    // HERO SECTION (SOLO OSCURO)
    // ===========================
    heroSection: `
        relative pt-16 pb-20 overflow-hidden 
        bg-slate-900
        lg:pt-32 lg:pb-32 
        transition-colors duration-300
    `,

    // Decoraciones de fondo (Glow effects)
    heroDecoration1: `
        absolute top-0 right-0 -mr-20 -mt-20 
        w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none
        bg-cyan-500/20
    `,
    heroDecoration2: `
        absolute bottom-0 left-0 -ml-20 -mb-20 
        w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none
        bg-blue-500/20
    `,

    // Container principal del Hero
    heroContainer: `
        relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,
    heroGrid: `
        grid grid-cols-1 gap-12 items-center lg:grid-cols-2
    `,

    // --- COLUMNA DE TEXTO ---
    textColumn: `
        text-center lg:text-left
    `,
    heroTitle: `
        text-4xl sm:text-5xl lg:text-6xl
        font-extrabold tracking-tight mb-6
        text-slate-100
    `,
    heroTitleGradient: `
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
    `,
    heroSubtitle: `
        block text-lg sm:text-xl font-semibold mb-2
        text-blue-400
    `,
    heroDescription: `
        text-base sm:text-lg text-slate-300
        mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed
    `,

    // --- BOTONES HERO ---
    buttonGroup: `
        flex flex-col sm:flex-row gap-4 justify-center lg:justify-start
    `,
    ctaPrimary: `
        bg-cyan-400 text-slate-900 font-bold text-lg 
        px-8 py-3.5 rounded-lg shadow-lg shadow-cyan-400/25
        transition-all duration-300 transform
        hover:bg-cyan-500 hover:-translate-y-1
    `,

    // --- COLUMNA DE IMAGEN ---
    imageColumn: `
        relative mt-12 lg:mt-0
    `,
    
    imageWrapper: `
        relative rounded-2xl overflow-hidden aspect-video
        bg-slate-800
        shadow-2xl shadow-black/50
    `,
    
    heroImage: `
        w-full h-full object-cover 
        transition-transform duration-700 ease-out 
        hover:scale-[1.02]
    `,
    
    imageOverlay: `
        absolute inset-0 pointer-events-none
        bg-gradient-to-tr from-black/40 to-transparent
    `,

    // --- BADGES FLOTANTES ---
    floatingBadge: `
        absolute flex items-center gap-2 p-2.5 rounded-xl
        bg-slate-900/90 backdrop-blur-sm shadow-xl shadow-black/30
        border
    `,
    badge1: `top-1/4 right-1/4 border-cyan-900`,
    badge2: `bottom-1/3 left-1/3 border-green-900`,
    badge3: `top-1/2 left-2/3 border-blue-900`,
    
    badgeText: `
        text-xs font-mono font-bold text-slate-100
    `,

    // ===========================
    // FEATURES SECTION (SOLO OSCURO)
    // ===========================
    featuresSection: `
        py-24 bg-slate-950
    `,
    featuresContainer: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,
    featuresGrid: `
        grid grid-cols-1 md:grid-cols-3 gap-8
    `,

    // Feature Card
    featureCard: `
        flex flex-col items-center text-center p-8 rounded-2xl
        bg-slate-900 shadow-sm
        transition-all duration-300 h-full
        hover:shadow-md hover:shadow-black/30
    `,
    
    // Icon Wrapper
    iconWrapper: `
        w-24 h-24 rounded-2xl flex items-center justify-center mb-6
        transition-transform duration-300 hover:scale-110 flex-shrink-0
    `,
    iconCyan: `bg-cyan-500/10`,
    iconBlue: `bg-blue-500/10`,
    iconTeal: `bg-teal-500/10`,

    // --- ICONOS DE CARACTERÍSTICAS (Imágenes) ---
    featureIcon: `
        h-16 w-16 object-contain
    `,
    featureIconLarge: `
        h-20 w-20 object-contain
    `,

    featureTitle: `
        text-xl font-bold mb-3 text-slate-100
    `,
    featureDesc: `
        text-sm text-slate-400 leading-relaxed
    `
};