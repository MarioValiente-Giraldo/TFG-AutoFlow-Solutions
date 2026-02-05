export const styles = {
    // Contenedor de la tarjeta (Solo Dark: Fondo Slate-800 #1e293b)
    loginContainer: `
        w-full max-w-[400px]
        bg-[#1e293b]
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl shadow-black/50
        transition-all duration-300
        border border-[#334155]
    `,

    // --- HEADER ---
    headerContent: `
        flex flex-col items-center mb-8
    `,
    
    logo: `
        h-14 w-auto object-contain mb-6
    `,
    
    title: `
        text-[#f1f5f9]
        text-2xl font-bold text-center leading-tight mb-3
    `,
    
    subtitle: `
        text-[#94a3b8]
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
        text-[#cbd5e1]
        text-sm font-medium
    `,
    forgotPasswordLink: `
        text-[#22d3ee] text-xs font-medium
        hover:text-[#06b6d4] hover:underline
        transition-colors duration-300
    `,
    
    // Inputs (Solo Dark: Fondo Slate-900 #0f172a, Borde Slate-700 #334155)
    input: `
        w-full h-11 px-4
        rounded-lg border
        bg-[#0f172a] 
        border-[#334155] 
        text-[#f1f5f9] 
        placeholder:text-[#64748b]
        
        /* Focus */
        focus:outline-none 
        focus:border-[#22d3ee] 
        focus:ring-2 focus:ring-[#22d3ee]/20
        
        transition-all duration-300
    `,

    // Botón Submit (Cyan brillante #22d3ee con texto oscuro)
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
        mt-8 text-center pt-6 border-t border-[#334155]
    `,
    signupText: `
        text-[#94a3b8] text-sm
    `,
    signupLink: `
        text-[#22d3ee] font-bold ml-1
        hover:text-[#f1f5f9] hover:underline
        transition-colors duration-300
    `
};