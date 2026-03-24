export default function Loading() {
  return (
    <div className="page-loader fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="text-center max-w-[400px] w-full px-4">
        
        {/* Logo */}
        <div className="flex flex-col gap-2 mb-8 animate-fadeInUp">
          <span className="text-[2rem] font-extrabold bg-gradient-to-br from-accent to-[#00d4ff] bg-clip-text text-transparent leading-tight animate-[fadeInUp_0.6s_ease-out_both] [animation-delay:0.1s]">
            Appogeal
          </span>
          <span className="text-[2rem] font-extrabold bg-gradient-to-br from-accent to-[#00d4ff] bg-clip-text text-transparent leading-tight animate-[fadeInUp_0.6s_ease-out_both] [animation-delay:0.2s]">
            TechLabs
          </span>
        </div>

        {/* Spinner Rings */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 border-[3px] border-transparent border-t-accent rounded-full animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite] [animation-delay:-0.45s]"></div>
          <div className="absolute inset-0 border-[3px] border-transparent border-t-[#00d4ff] rounded-full animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite] [animation-delay:-0.3s]"></div>
          <div className="absolute inset-0 border-[3px] border-transparent border-t-[#0ea5e9] rounded-full animate-[spin_1.5s_cubic-bezier(0.5,0,0.5,1)_infinite] [animation-delay:-0.15s]"></div>
        </div>

        {/* Text */}
        <p className="text-text-secondary text-base mb-6 animate-[pulse_2s_ease-in-out_infinite]">
          Loading amazing experiences...
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[rgba(100,255,218,0.1)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-[#00d4ff] rounded-full animate-[progress_2s_ease-out_forwards] shadow-[0_0_10px_rgba(100,255,218,0.5)]"></div>
        </div>
        
      </div>
    </div>
  );
}
