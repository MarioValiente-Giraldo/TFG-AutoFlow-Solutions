import type { Theme } from '../../context/ThemeContext';

export const styles = {
    // --- ESTRUCTURA GENERAL ---
    navbar: (theme: Theme) => `
        sticky top-0 z-50 w-full
        backdrop-blur-md ${theme === 'dark'
            ? 'bg-slate-900/90 border-b border-slate-700'
            : 'bg-white/90 border-b border-gray-200'
        }
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
    logoTitle: (theme: Theme) => `
        font-bold text-xl tracking-tighter leading-none ${theme === 'dark' ? 'text-slate-100' : 'text-gray-900'}
    `,
    logoSubtitle: (theme: Theme) => `
        text-sm font-light tracking-wide leading-none ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}
    `,

    // --- MENÚ ESCRITORIO ---
    menuWrapper: `
        hidden md:block
    `,
    menuList: `
        ml-10 flex items-baseline space-x-8
    `,
    menuLink: (theme: Theme) => `
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${theme === 'dark'
            ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
            : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
        } cursor-pointer
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
    ctaLoginBtn: (theme: Theme) => `
        flex items-center gap-2
        ${theme === 'dark'
            ? 'text-slate-200 border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800'
            : 'text-gray-700 border-gray-300 bg-white hover:border-cyan-500 hover:text-cyan-600 hover:bg-gray-50'
        }
        font-medium text-sm
        px-4 py-2.5 rounded-lg
        border
        transition-all duration-300
    `,

    // 3. Botón Cerrar Sesión - Discreto (Ghost) con hover rojo
    logoutBtn: (theme: Theme) => `
        group flex items-center gap-2
        ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}
        text-sm font-medium
        px-3 py-2 rounded-lg
        border border-transparent
        transition-all duration-200
        hover:text-red-400 hover:bg-red-500/10 cursor-pointer
    `,

    // 4. Botón de Tema (Nuevo)
    themeBtn: (theme: Theme) => `
        flex items-center justify-center
        w-10 h-10 rounded-lg
        ${theme === 'dark'
            ? 'text-yellow-400 bg-slate-800/50 hover:bg-slate-700'
            : 'text-orange-500 bg-gray-100 hover:bg-gray-200'
        }
        transition-all duration-200
        cursor-pointer
    `,

    // --- MENÚ MÓVIL (Hamburguesa) ---
    mobileBtnWrapper: `
        flex items-center gap-2 md:hidden
    `,
    mobileBtn: (theme: Theme) => `
        inline-flex items-center justify-center p-2 rounded-md
        ${theme === 'dark'
            ? 'text-slate-400 hover:text-white hover:bg-slate-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }
        transition-colors focus:outline-none
    `,

    // --- MENÚ DESPLEGABLE MÓVIL ---
    mobileMenu: (theme: Theme) => `
        md:hidden border-t
        ${theme === 'dark' ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-200'}
        backdrop-blur-md px-4 py-4 flex flex-col gap-2
    `,
    mobileMenuLink: (theme: Theme) => `
        px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200
        ${theme === 'dark'
            ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
            : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
        }
    `,
    mobileMenuDivider: (theme: Theme) => `
        border-t my-2 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}
    `,
    mobileMenuBtn: (theme: Theme) => `
        w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200
        ${theme === 'dark'
            ? 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
            : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
        }
    `,
};