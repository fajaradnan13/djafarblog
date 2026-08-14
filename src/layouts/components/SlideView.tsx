import React, { useState, useEffect, useRef, useCallback } from "react";
import DynamicIcon from "@/helpers/DynamicIcon";

const SlideView = () => {
  const [isActive, setIsActive] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
  };

  const closeSlideView = () => setIsActive(false);

  // Setup Canvas
  useEffect(() => {
    if (isActive && canvasRef.current) {
      const canvas = canvasRef.current;
      // Make canvas full screen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = "red";
        context.lineWidth = 4;
        contextRef.current = context;
      }
    }
  }, [isActive, currentSlideIndex]); // Reset canvas when slide changes

  useEffect(() => {
    const handleResize = () => {
      if (isActive && canvasRef.current && contextRef.current) {
        // Save current drawing
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
          
          // Restore context settings
          context.lineCap = "round";
          context.strokeStyle = "red";
          context.lineWidth = 4;
          
          // Restore drawing
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
        e.preventDefault(); // Prevent default page scroll
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
        <div className="fixed inset-0 z-[9999] bg-slate-950 text-white" style={{ cursor: "crosshair" }}>
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
            className="absolute inset-0 z-10 flex flex-col items-center justify-start p-8 pt-24 md:p-16 md:pt-24 overflow-y-auto pointer-events-none pb-32"
          >
            <div 
              className="prose prose-invert prose-lg md:prose-2xl max-w-5xl w-full slide-content-wrapper"
              dangerouslySetInnerHTML={{ __html: slides[currentSlideIndex] }}
            />
          </div>

          {/* Controls Container */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6 bg-gray-900/90 border border-gray-700 px-6 py-3 rounded-full backdrop-blur shadow-2xl">
            <button 
              onClick={() => setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0))}
              className="text-white hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-white"
              disabled={currentSlideIndex === 0}
              title="Slide Sebelumnya (Panah Kiri)"
            >
              <DynamicIcon icon="FaChevronLeft" className="text-xl" />
            </button>
            <span className="font-semibold text-gray-300 min-w-[3rem] text-center">
              {currentSlideIndex + 1} / {slides.length}
            </span>
            <button 
              onClick={() => setCurrentSlideIndex(Math.min(currentSlideIndex + 1, slides.length - 1))}
              className="text-white hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-white"
              disabled={currentSlideIndex === slides.length - 1}
              title="Slide Selanjutnya (Panah Kanan)"
            >
              <DynamicIcon icon="FaChevronRight" className="text-xl" />
            </button>
          </div>
          
          <div className="absolute top-6 right-6 z-30 flex space-x-4">
             <button
              onClick={clearCanvas}
              className="flex items-center justify-center w-12 h-12 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white rounded-full transition-colors shadow-lg"
              title="Bersihkan Coretan (Tekan 'C')"
            >
              <DynamicIcon icon="FaEraser" className="text-lg" />
            </button>
            <button
              onClick={closeSlideView}
              className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg"
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
            }
            .slide-content-wrapper h2, .slide-content-wrapper h3 {
               color: #4ade80; 
               margin-top: 0;
            }
          `}} />
        </div>
      )}
    </>
  );
};

export default SlideView;
