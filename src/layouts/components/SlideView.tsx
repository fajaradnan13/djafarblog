import React, { useState, useEffect, useRef, useCallback } from "react";
import DynamicIcon from "@/helpers/DynamicIcon";

type ThemeType = 'dark' | 'light' | 'midnight';

const THEMES = {
  dark: {
    bg: "bg-slate-950",
    text: "text-white",
    prose: "prose-invert",
    isDarkClass: "dark",
    controlsWrapper: "bg-gray-900/90 border-gray-700",
    controlsText: "text-white hover:text-primary",
    controlsDisabled: "disabled:opacity-30 disabled:hover:text-white",
    btnSecondary: "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white",
    pattern: { backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }
  },
  light: {
    bg: "bg-slate-50",
    text: "text-slate-900",
    prose: "prose-slate",
    isDarkClass: "",
    controlsWrapper: "bg-white/90 border-gray-200",
    controlsText: "text-slate-800 hover:text-primary",
    controlsDisabled: "disabled:opacity-30 disabled:hover:text-slate-800",
    btnSecondary: "bg-white border-gray-200 hover:bg-gray-100 text-slate-800",
    pattern: { backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }
  },
  midnight: {
    bg: "bg-[#0f172a]",
    text: "text-blue-50",
    prose: "prose-invert",
    isDarkClass: "dark",
    controlsWrapper: "bg-[#1e293b]/90 border-[#334155]",
    controlsText: "text-blue-100 hover:text-blue-400",
    controlsDisabled: "disabled:opacity-30 disabled:hover:text-blue-100",
    btnSecondary: "bg-[#1e293b] border-[#334155] hover:bg-[#334155] text-blue-100",
    pattern: { 
      backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)', 
      backgroundSize: '40px 40px' 
    }
  }
};

const SlideView = () => {
  const [isActive, setIsActive] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Parse slides
  const openSlideView = () => {
    const contentDiv = document.querySelector(".single-blog .content");
    if (!contentDiv) return;

    const parsedSlides: string[] = [];
    let currentSlideHTML = "";

    Array.from(contentDiv.children).forEach((child) => {
      if (child.tagName === "H2" || child.tagName === "H3") {
        if (currentSlideHTML.trim() !== "") {
          parsedSlides.push(currentSlideHTML);
        }
        currentSlideHTML = child.outerHTML;
      } else {
        currentSlideHTML += child.outerHTML;
      }
    });
    if (currentSlideHTML.trim() !== "") {
      parsedSlides.push(currentSlideHTML);
    }

    setSlides(parsedSlides);
    setCurrentSlideIndex(0);
    setIsActive(true);
    
    // Check global theme preference for initial state
    if (!document.documentElement.classList.contains('dark')) {
      setTheme('light');
    }
  };

  const closeSlideView = () => setIsActive(false);

  // Setup Canvas
  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = "#ef4444"; // Always red for contrast
        context.lineWidth = 4;
        contextRef.current = context;
      }
    }
  }, [isActive, currentSlideIndex]); // Reset canvas when slide changes

  useEffect(() => {
    const handleResize = () => {
      if (isActive && canvasRef.current && contextRef.current) {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
          
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          context.lineCap = "round";
          context.strokeStyle = "#ef4444";
          context.lineWidth = 4;
          
          context.drawImage(tempCanvas, 0, 0);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive]);

  // Drawing functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!contextRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX, clientY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = useCallback(() => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  // Forward wheel events from canvas to scroll container
  useEffect(() => {
    const canvas = canvasRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!canvas || !scrollContainer || !isActive) return;
    
    const handleWheel = (e: WheelEvent) => {
      scrollContainer.scrollBy({ top: e.deltaY, behavior: "auto" });
    };
    
    canvas.addEventListener("wheel", handleWheel, { passive: true });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [isActive]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      if (e.key === "Escape") {
        closeSlideView();
      } else if (e.key === "ArrowRight") {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollContainerRef.current?.scrollBy({ top: 150, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollContainerRef.current?.scrollBy({ top: -150, behavior: "smooth" });
      } else if (e.key.toLowerCase() === "c") {
        clearCanvas();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, slides.length, clearCanvas]);

  const currentStyle = THEMES[theme];

  return (
    <>
      <button
        onClick={openSlideView}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_20px_rgba(43,162,131,0.5)] hover:-translate-y-1 hover:scale-105 hover:bg-[#1E6250] transition-all"
        title="Buka Mode Presentasi"
      >
        <DynamicIcon icon="FaChalkboardUser" className="text-2xl" />
      </button>

      {isActive && (
        <div className={`fixed inset-0 z-[9999] ${currentStyle.bg} ${currentStyle.text} ${currentStyle.isDarkClass} transition-colors duration-500`} style={{ cursor: "crosshair" }}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none" style={currentStyle.pattern}></div>

          {/* Canvas for drawing */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-20 touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          {/* Slide Content */}
          <div 
            ref={scrollContainerRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-start p-8 pt-16 md:p-12 md:pt-16 overflow-y-auto pointer-events-none pb-24"
          >
            {/* Brand Identity - scrolls with content */}
            <div className="w-full max-w-5xl flex items-center space-x-3 opacity-60 mb-8 pointer-events-auto">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                <DynamicIcon icon="FaGraduationCap" className={`text-xl ${currentStyle.text}`} />
              </div>
              <div>
                <div className={`font-primary font-bold tracking-wider text-sm uppercase ${currentStyle.text}`}>
                  Teknologi Newbie
                </div>
                <div className="text-xs opacity-60 font-secondary tracking-widest">
                  Slide Presentation
                </div>
              </div>
            </div>

            <div 
              className={`prose ${currentStyle.prose} prose-lg md:prose-2xl max-w-5xl w-full slide-content-wrapper transition-colors duration-300`}
              dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex] }}
            />
          </div>

          {/* Theme Selector (Bottom Left) */}
          <div className={`absolute bottom-6 left-8 z-30 flex space-x-2 ${currentStyle.controlsWrapper} px-3 py-1.5 rounded-full backdrop-blur shadow-lg border text-xs`}>
            <button onClick={() => setTheme('light')} className={`px-3 py-1.5 rounded-full font-medium ${theme === 'light' ? 'bg-primary text-white shadow-md' : currentStyle.controlsText} transition-all`}>Light</button>
            <button onClick={() => setTheme('dark')} className={`px-3 py-1.5 rounded-full font-medium ${theme === 'dark' ? 'bg-primary text-white shadow-md' : currentStyle.controlsText} transition-all`}>Dark</button>
            <button onClick={() => setTheme('midnight')} className={`px-3 py-1.5 rounded-full font-medium ${theme === 'midnight' ? 'bg-blue-600 text-white shadow-md' : currentStyle.controlsText} transition-all`}>Midnight</button>
          </div>

          {/* Pagination Controls Container (Smaller and at Bottom Center) */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4 ${currentStyle.controlsWrapper} px-5 py-2.5 rounded-full backdrop-blur shadow-lg border text-sm`}>
            <button 
              onClick={() => setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0))}
              className={`${currentStyle.controlsText} ${currentStyle.controlsDisabled} transition-all hover:scale-110 active:scale-95`}
              disabled={currentSlideIndex === 0}
              title="Slide Sebelumnya (Panah Kiri)"
            >
              <DynamicIcon icon="FaChevronLeft" className="text-lg" />
            </button>
            <span className={`font-semibold min-w-[3rem] text-center tracking-widest ${currentStyle.controlsText.split(' ')[0]}`}>
              {currentSlideIndex + 1} <span className="opacity-40">/</span> {slides.length}
            </span>
            <button 
              onClick={() => setCurrentSlideIndex(Math.min(currentSlideIndex + 1, slides.length - 1))}
              className={`${currentStyle.controlsText} ${currentStyle.controlsDisabled} transition-all hover:scale-110 active:scale-95`}
              disabled={currentSlideIndex === slides.length - 1}
              title="Slide Selanjutnya (Panah Kanan)"
            >
              <DynamicIcon icon="FaChevronRight" className="text-lg" />
            </button>
          </div>
          
          {/* Action Buttons (Top Right) */}
          <div className="absolute top-6 right-8 z-30 flex space-x-3">
             <button
              onClick={clearCanvas}
              className={`flex items-center justify-center w-11 h-11 ${currentStyle.btnSecondary} rounded-full transition-all shadow-lg border hover:scale-105 active:scale-95`}
              title="Bersihkan Coretan (Tekan 'C')"
            >
              <DynamicIcon icon="FaEraser" className="text-lg" />
            </button>
            <button
              onClick={closeSlideView}
              className="flex items-center justify-center w-11 h-11 bg-red-500 hover:bg-red-600 border border-red-400 text-white rounded-full transition-all shadow-lg hover:scale-105 active:scale-95"
              title="Tutup Presentasi (Tekan 'ESC')"
            >
              <DynamicIcon icon="FaXmark" className="text-xl" />
            </button>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .slide-content-wrapper img {
               max-height: 50vh;
               object-fit: contain;
               margin: 0 auto;
               border-radius: 0.5rem;
               box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            }
            .slide-content-wrapper h2, .slide-content-wrapper h3 {
               color: #4ade80; 
               margin-top: 0;
               font-weight: 800;
               letter-spacing: -0.025em;
               border-bottom: 2px solid currentColor;
               padding-bottom: 1rem;
               margin-bottom: 2.5rem;
               opacity: 0.9;
            }
            .light .slide-content-wrapper h2, .light .slide-content-wrapper h3 {
               color: #059669; 
            }
            .midnight .slide-content-wrapper h2, .midnight .slide-content-wrapper h3 {
               color: #38bdf8; 
            }
          `}} />
        </div>
      )}
    </>
  );
};

export default SlideView;
