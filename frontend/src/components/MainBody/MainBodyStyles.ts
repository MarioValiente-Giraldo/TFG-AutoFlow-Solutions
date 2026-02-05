export const styles = {
    // ===========================
    // HERO SECTION
    // ===========================
    heroSection: `
        relative pt-16 pb-20 overflow-hidden 
        bg-white dark:bg-slate-900 
        lg:pt-32 lg:pb-32 
        transition-colors duration-300
    `,

    // Decoraciones de fondo (Glow effects)
    heroDecoration1: `
        absolute top-0 right-0 -mr-20 -mt-20 
        w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none
        bg-cyan-200/40 dark:bg-cyan-500/20
        transition-colors duration-300
    `,
    heroDecoration2: `
        absolute bottom-0 left-0 -ml-20 -mb-20 
        w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none
        bg-blue-200/40 dark:bg-blue-500/20
        transition-colors duration-300
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
        text-slate-900 dark:text-slate-100
        transition-colors duration-300
    `,
    heroTitleGradient: `
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
    `,
    heroSubtitle: `
        block text-lg sm:text-xl font-semibold mb-2
        text-blue-600 dark:text-blue-400
        transition-colors duration-300
    `,
    heroDescription: `
        text-base sm:text-lg text-slate-600 dark:text-slate-300
        mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed
        transition-colors duration-300
    `,

    // --- BOTONES HERO ---
    buttonGroup: `
        flex flex-col sm:flex-row gap-4 justify-center lg:justify-start
    `,
    ctaPrimary: `
        bg-cyan-400 text-slate-900 font-bold text-lg 
        px-8 py-3.5 rounded-lg shadow-lg shadow-cyan-400/25
        transition-all duration-300 transform
        hover:bg-cyan-300 hover:-translate-y-1
        dark:bg-cyan-400 dark:text-slate-900 dark:hover:bg-cyan-500
    `,

    // --- COLUMNA DE IMAGEN ---
    imageColumn: `
        relative mt-12 lg:mt-0
    `,
    // CAMBIO: Eliminado 'border border-white dark:border-slate-700'
    imageWrapper: `
        relative rounded-2xl overflow-hidden aspect-video
        bg-slate-100 dark:bg-slate-800
        shadow-2xl shadow-black/10 dark:shadow-black/50
        transition-colors duration-300
    `,
    
    // Zoom muy sutil (scale-[1.02])
    heroImage: `
        w-full h-full object-cover 
        transition-transform duration-700 ease-out 
        hover:scale-[1.02]
    `,
    
    imageOverlay: `
        absolute inset-0 pointer-events-none
        bg-gradient-to-tr from-white/40 to-transparent
        dark:from-black/40
    `,

    // --- BADGES FLOTANTES ---
    floatingBadge: `
        absolute flex items-center gap-2 p-2.5 rounded-xl
        bg-white/90 backdrop-blur-sm shadow-xl
        border transition-colors duration-300
        dark:bg-slate-900/90 dark:shadow-black/30
    `,
    badge1: `top-1/4 right-1/4 border-cyan-200 dark:border-cyan-900`,
    badge2: `bottom-1/3 left-1/3 border-green-200 dark:border-green-900`,
    badge3: `top-1/2 left-2/3 border-blue-200 dark:border-blue-900`,
    
    badgeText: `
        text-xs font-mono font-bold text-slate-800 dark:text-slate-100
    `,

    // ===========================
    // FEATURES SECTION
    // ===========================
    featuresSection: `
        py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300
    `,
    featuresContainer: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,
    featuresGrid: `
        grid grid-cols-1 md:grid-cols-3 gap-8
    `,

    // Feature Card
    // CAMBIO: Eliminado 'border border-slate-100' y 'dark:border-slate-800'
    // Se confía solo en shadow-sm para definir la tarjeta.
    featureCard: `
        flex flex-col items-center text-center p-8 rounded-2xl
        bg-white shadow-sm
        transition-all duration-300 h-full
        hover:shadow-md
        dark:bg-slate-900 dark:hover:shadow-black/30
    `,
    
    // Icon Wrapper
    iconWrapper: `
        w-24 h-24 rounded-2xl flex items-center justify-center mb-6
        transition-transform duration-300 hover:scale-110 flex-shrink-0
    `,
    iconCyan: `bg-cyan-50 dark:bg-cyan-500/10`,
    iconBlue: `bg-blue-50 dark:bg-blue-500/10`,
    iconTeal: `bg-teal-50 dark:bg-teal-500/10`,

    // --- ICONOS DE CARACTERÍSTICAS (Imágenes) ---
    
    // Icono estándar
    featureIcon: `
        h-16 w-16 object-contain
    `,

    // Icono GRANDE (Escudo)
    featureIconLarge: `
        h-20 w-20 object-contain
    `,

    featureTitle: `
        text-xl font-bold mb-3 text-slate-900 dark:text-slate-100
    `,
    featureDesc: `
        text-sm text-slate-600 dark:text-slate-400 leading-relaxed
    `
};