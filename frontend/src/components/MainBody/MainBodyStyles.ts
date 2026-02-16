import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // ===========================
    // HERO SECTION
    // ===========================
    heroSection: (theme: Theme) => `
        relative pt-16 pb-20 overflow-hidden
        ${theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-b from-gray-50 to-white'}
        lg:pt-32 lg:pb-32
        transition-colors duration-300
    `,

    // Decoraciones de fondo (Glow effects)
    heroDecoration1: (theme: Theme) => `
        absolute top-0 right-0 -mr-20 -mt-20
        w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none
        ${theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-300/30'}
    `,
    heroDecoration2: (theme: Theme) => `
        absolute bottom-0 left-0 -ml-20 -mb-20
        w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none
        ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-300/30'}
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
    heroTitle: (theme: Theme) => `
        text-4xl sm:text-5xl lg:text-6xl
        font-extrabold tracking-tight mb-6
        ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
    `,
    heroTitleGradient: `
        text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600
    `,
    heroSubtitle: (theme: Theme) => `
        block text-lg sm:text-xl font-semibold mb-2
        ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
    `,
    heroDescription: (theme: Theme) => `
        text-base sm:text-lg
        ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}
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

    imageWrapper: (theme: Theme) => `
        relative rounded-2xl overflow-hidden aspect-video
        ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}
        shadow-2xl ${theme === 'dark' ? 'shadow-black/50' : 'shadow-gray-400/30'}
    `,

    heroImage: `
        w-full h-full object-cover
        transition-transform duration-700 ease-out
        hover:scale-[1.02]
    `,

    imageOverlay: (theme: Theme) => `
        absolute inset-0 pointer-events-none
        ${theme === 'dark' ? 'bg-gradient-to-tr from-black/40 to-transparent' : 'bg-gradient-to-tr from-gray-900/20 to-transparent'}
    `,

    // --- BADGES FLOTANTES ---
    floatingBadge: (theme: Theme) => `
        absolute flex items-center gap-2 p-2.5 rounded-xl
        ${theme === 'dark'
            ? 'bg-slate-900/90 backdrop-blur-sm shadow-xl shadow-black/30'
            : 'bg-white/90 backdrop-blur-sm shadow-xl shadow-gray-400/20'
        }
        border
    `,
    badge1: (theme: Theme) => `top-1/4 right-1/4 ${theme === 'dark' ? 'border-cyan-900' : 'border-cyan-300'}`,
    badge2: (theme: Theme) => `bottom-1/3 left-1/3 ${theme === 'dark' ? 'border-green-900' : 'border-green-300'}`,
    badge3: (theme: Theme) => `top-1/2 left-2/3 ${theme === 'dark' ? 'border-blue-900' : 'border-blue-300'}`,

    badgeText: (theme: Theme) => `
        text-xs font-mono font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
    `,

    // ===========================
    // FEATURES SECTION
    // ===========================
    featuresSection: (theme: Theme) => `
        py-24 ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-100'}
    `,
    featuresContainer: `
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
    `,
    featuresGrid: `
        grid grid-cols-1 md:grid-cols-3 gap-8
    `,

    // Feature Card
    featureCard: (theme: Theme) => `
        flex flex-col items-center text-center p-8 rounded-2xl
        ${theme === 'dark' ? 'bg-slate-900 shadow-sm hover:shadow-md hover:shadow-black/30' : 'bg-white shadow-md hover:shadow-lg'}
        transition-all duration-300 h-full
    `,

    // Icon Wrapper
    iconWrapper: `
        w-24 h-24 rounded-2xl flex items-center justify-center mb-6
        transition-transform duration-300 hover:scale-110 flex-shrink-0
    `,
    iconCyan: (theme: Theme) => `${theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-100'}`,
    iconBlue: (theme: Theme) => `${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'}`,
    iconTeal: (theme: Theme) => `${theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-100'}`,

    // --- ICONOS DE CARACTERÍSTICAS (Imágenes) ---
    featureIcon: `
        h-16 w-16 object-contain
    `,
    featureIconLarge: `
        h-20 w-20 object-contain
    `,

    featureTitle: (theme: Theme) => `
        text-xl font-bold mb-3 ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
    `,
    featureDesc: (theme: Theme) => `
        text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'} leading-relaxed
    `
};