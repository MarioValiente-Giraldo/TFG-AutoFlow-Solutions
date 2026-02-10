export const styles = {
    // Contenedor principal (Slate-800 background para coincidir con Login)
    registerContainer: `
        w-full max-w-[520px]
        bg-[#1e293b]
        p-8 sm:p-10
        rounded-xl
        shadow-2xl shadow-black/50
        border border-[#334155]
        transition-all duration-300
    `,

    // --- HEADER ---
    header: `
        text-center mb-6
    `,
    title: `
        text-[#f1f5f9]
        text-3xl font-bold tracking-tight mb-2
        font-sans
    `,
    subtitle: `
        text-[#94a3b8]
        text-base
    `,

    // --- PROGRESS BAR ---
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
        text-[#22d3ee] text-sm
    `,
    progressBarBg: `
        h-1.5 w-full bg-[#334155] rounded-full overflow-hidden
    `,
    progressBarFill: `
        h-full bg-[#22d3ee] rounded-full transition-all duration-300 ease-out
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
        text-sm font-semibold
    `,
    
    // Inputs (Slate-900 background)
    input: `
        w-full h-12 px-4
        rounded-lg border
        bg-[#0f172a] 
        border-[#334155] 
        text-[#f1f5f9] 
        placeholder:text-[#64748b]
        
        focus:outline-none 
        focus:border-[#22d3ee] 
        focus:ring-1 focus:ring-[#22d3ee]
        
        transition-all duration-300
    `,

    // --- TERMS CHECKBOX ---
    termsWrapper: `
        flex items-start gap-3 py-2
    `,
    checkbox: `
        mt-1 h-5 w-5 rounded 
        border border-[#334155] 
        bg-[#0f172a] 
        text-[#22d3ee]
        focus:ring-offset-0 focus:ring-[#22d3ee]
        cursor-pointer
    `,
    termsLabel: `
        text-sm text-[#94a3b8] leading-relaxed
    `,
    termsLink: `
        text-[#22d3ee] hover:underline cursor-pointer
    `,

    // --- SUBMIT BUTTON ---
    submitButton: `
        w-full h-12 mt-2
        flex items-center justify-center
        bg-[#22d3ee] text-[#0f172a]
        text-base font-bold
        rounded-lg border-none cursor-pointer
        shadow-lg shadow-cyan-500/10
        
        hover:bg-[#06b6d4] hover:-translate-y-0.5
        active:translate-y-0
        
        transition-all duration-300
    `,

    // --- DIVIDER ---
    divider: `
        relative py-4
    `,
    dividerLine: `
        absolute inset-0 flex items-center
    `,
    dividerLineInner: `
        w-full border-t border-[#334155]
    `,
    dividerTextWrapper: `
        relative flex justify-center text-xs uppercase
    `,
    dividerText: `
        bg-[#1e293b] px-3 text-[#94a3b8]
    `,

    // --- GOOGLE BUTTON ---
    googleButton: `
        w-full h-12
        flex items-center justify-center gap-3
        bg-[#0f172a] 
        border border-[#334155] 
        text-white
        rounded-lg font-medium text-base cursor-pointer
        
        hover:bg-[#1e293b]
        transition-all duration-300
    `,
    googleIcon: `
        h-5 w-5
    `,

    // --- LOGIN LINK ---
    loginLinkWrapper: `
        mt-8 text-center
    `,
    loginText: `
        text-[#94a3b8] text-sm
    `,
    loginLink: `
        text-[#22d3ee] font-bold ml-1
        hover:underline cursor-pointer
    `
};