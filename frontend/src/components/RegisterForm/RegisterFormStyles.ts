export const styles = {
    // Contenedor principal
    // Igual que el Login, pero un poco más ancho (max-w-[500px]) para que el formulario respire mejor
    registerContainer: `
        w-full max-w-[500px]
        bg-[#1e293b]
        p-8 sm:p-10
        rounded-2xl
        shadow-2xl shadow-black/50
        transition-all duration-300
        border border-[#334155]
    `,

    // --- HEADER ---
    header: `
        text-center mb-8
    `,
    title: `
        text-[#f1f5f9]
        text-2xl font-bold text-center leading-tight mb-3
    `,
    subtitle: `
        text-[#94a3b8]
        text-sm text-center
    `,

    // --- BARRA DE PROGRESO (Exclusivo de Register) ---
    progressContainer: `
        flex flex-col gap-2 mb-8
    `,
    progressHeader: `
        flex justify-between items-end mb-1
    `,
    progressStep: `
        text-[#f1f5f9] text-sm font-medium
    `,
    progressLabel: `
        text-[#22d3ee] text-sm font-medium
    `,
    progressBarBg: `
        h-1.5 w-full bg-[#334155] rounded-full overflow-hidden
    `,
    progressBarFill: `
        h-full bg-[#22d3ee] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]
    `,

    // --- FORMULARIO ---
    form: `
        flex flex-col gap-5
    `,
    formField: `
        flex flex-col gap-2
    `,
    label: `
        text-[#cbd5e1]
        text-sm font-medium
    `,
    
    // Inputs (Copiado exacto del Login)
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

    // --- TERMS CHECKBOX ---
    termsWrapper: `
        flex items-start gap-3 py-2 mt-1
    `,
    checkbox: `
        mt-0.5 h-4 w-4 rounded 
        border border-[#334155] 
        bg-[#0f172a] 
        text-[#22d3ee]
        focus:ring-offset-0 focus:ring-2 focus:ring-[#22d3ee]/20
        cursor-pointer
        accent-[#22d3ee]
    `,
    termsLabel: `
        text-xs text-[#94a3b8] leading-relaxed
    `,
    termsLink: `
        text-[#22d3ee] hover:text-[#06b6d4] hover:underline cursor-pointer transition-colors
    `,

    // --- BOTÓN SUBMIT (Copiado exacto del Login) ---
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

    // --- LOGIN LINK (Footer) ---
    loginLinkWrapper: `
        mt-8 text-center pt-6 border-t border-[#334155]
    `,
    loginText: `
        text-[#94a3b8] text-sm
    `,
    loginLink: `
        text-[#22d3ee] font-bold ml-1
        hover:text-[#f1f5f9] hover:underline
        transition-colors duration-300
    `
};