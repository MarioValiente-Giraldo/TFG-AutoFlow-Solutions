export const styles = {
    // Contenedor de la tarjeta
    // Usamos #1e293b (Slate-800) para el fondo de la tarjeta en modo oscuro
    // Esto coincide con el estilo de tus "Features Cards" en la Home
    loginContainer: `
        w-full max-w-[400px]
        bg-white dark:bg-[#1e293b]
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl shadow-black/10 dark:shadow-black/50
        transition-all duration-300
        border border-slate-200 dark:border-[#334155]
    `,

    // --- HEADER ---
    headerContent: `
        flex flex-col items-center mb-8
    `,
    // Estilo para la IMAGEN del logo (ya no SVG)
    logo: `
        h-14 w-auto object-contain mb-6
    `,
    title: `
        text-[#0f172a] dark:text-[#f1f5f9]
        text-2xl font-bold text-center leading-tight mb-3
    `,
    subtitle: `
        text-[#64748b] dark:text-[#94a3b8]
        text-sm text-center
    `,

    // --- FORMULARIO ---
    form: `
        flex flex-col gap-5
    `,
    formField: `
        flex flex-col gap-2
    `,
    labelWrapper: `
        flex justify-between items-center
    `,
    label: `
        text-[#334155] dark:text-[#cbd5e1]
        text-sm font-medium
    `,
    forgotPasswordLink: `
        text-[#22d3ee] text-xs font-medium
        hover:text-[#06b6d4] hover:underline
        transition-colors duration-300
    `,
    
    // Inputs
    // Fondo oscuro (#0f172a) para input en modo oscuro
    // Borde gris oscuro (#334155)
    input: `
        w-full h-11 px-4
        rounded-lg border bg-white
        text-[#0f172a] placeholder:text-[#94a3b8]
        border-[#cbd5e1]
        
        /* Modo Oscuro */
        dark:bg-[#0f172a] 
        dark:border-[#334155] 
        dark:text-[#f1f5f9] 
        dark:placeholder:text-[#64748b]
        
        /* Focus */
        focus:outline-none 
        focus:border-[#22d3ee] 
        focus:ring-2 focus:ring-[#22d3ee]/20
        dark:focus:border-[#22d3ee]
        
        transition-all duration-300
    `,

    // Botón Submit (Cyan brillante #22d3ee)
    submitButton: `
        w-full h-11 mt-4
        flex items-center justify-center
        bg-[#22d3ee] text-[#0f172a]
        text-[15px] font-bold tracking-wide
        rounded-lg border-none cursor-pointer
        
        hover:bg-[#06b6d4] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:-translate-y-0.5
        active:translate-y-0
        
        transition-all duration-300
    `,

    // --- FOOTER SIGNUP ---
    signupWrapper: `
        mt-8 text-center pt-6 border-t border-slate-200 dark:border-[#334155]
    `,
    signupText: `
        text-[#64748b] dark:text-[#94a3b8] text-sm
    `,
    signupLink: `
        text-[#22d3ee] font-bold ml-1
        hover:text-[#f1f5f9] hover:underline
        transition-colors duration-300
    `
};