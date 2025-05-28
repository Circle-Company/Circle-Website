"use client";

import { useEffect, useState } from "react";

export function QRCodeSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('qr-code-section');
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionHeight = section.offsetHeight;
          
          // Validar valores numéricos
          if (isNaN(rect.top) || isNaN(rect.bottom) || isNaN(sectionHeight) || isNaN(windowHeight)) {
            ticking = false;
            return;
          }
          
          // Calcular progresso baseado na posição da seção na tela
          let progress = 0;
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            if (rect.top <= 0) {
              // Seção está sendo scrollada
              const scrolledIntoSection = Math.abs(rect.top);
              const maxScrollInSection = Math.max(1, sectionHeight - windowHeight);
              progress = Math.min(1, scrolledIntoSection / maxScrollInSection);
            } else {
              // Seção está entrando na tela
              progress = Math.max(0, (windowHeight - rect.top) / windowHeight);
            }
          } else if (rect.bottom <= 0) {
            // Seção passou completamente
            progress = 1;
          }
          
          // Garantir que progress está sempre entre 0 e 1
          progress = Math.max(0, Math.min(1, progress));
          
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Executar uma vez no mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Função para interpolar animações com o scroll
  const getScrollInterpolation = (offset: number = 0, intensity: number = 1) => {
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity));
    
    // Interpolação do blur (de 8px para 0px)
    const blur = (1 - adjustedProgress) * 8;
    
    // Interpolação da opacity (de 0 para 1)
    const opacity = adjustedProgress;
    
    // Interpolação da escala (de 0.95 para 1.0)
    const scale = 0.95 + (adjustedProgress * 0.05);
    
    // Interpolação do translateY (de 30px para 0px)
    const translateY = (1 - adjustedProgress) * 30;
    
    return {
      filter: `blur(${blur.toFixed(1)}px)`,
      opacity: opacity.toFixed(3),
      transform: `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`,
      transition: 'none'
    };
  };

  // Função específica para texto
  const getTextInterpolation = (offset: number = 0, intensity: number = 1) => {
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity));
    
    // Blur mais sutil para texto
    const blur = (1 - adjustedProgress) * 5;
    
    // Opacity
    const opacity = Math.max(0.2, adjustedProgress);
    
    // Escala sutil
    const scale = 0.98 + (adjustedProgress * 0.02);
    
    return {
      filter: `blur(${blur.toFixed(1)}px)`,
      opacity: opacity.toFixed(3),
      transform: `scale(${scale.toFixed(3)})`,
      transition: 'none'
    };
  };

  return (
    <section 
      id="qr-code-section"
      className="py-20 bg-black text-white"
    >
      <div
        className="container mx-auto px-4"
        style={getScrollInterpolation(0, 3)} // Container aparece rapidamente
      >
        <div 
          className="max-w-4xl mx-auto text-center"
          style={getScrollInterpolation(0.1, 2.5)} // Seção principal
        >
          {/* QR Code Container */}
          <div 
            className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center qr-animation"
            style={getScrollInterpolation(0.2, 2.0)} // QR Code container
          >
            <div className="w-24 h-24 bg-black rounded grid grid-cols-8 gap-px p-2">
              {/* QR Code pattern simulation */}
              {Array.from({ length: 64 }).map((_, i) => {
                // Cada pixel aparece rapidamente com interpolação suave
                const pixelOffset = 0.3 + (i / 64) * 0.15; // Entre 30% e 45% (range expandido)
                const pixelProgress = Math.max(0, Math.min(1, (scrollProgress - pixelOffset) * 4)); // Intensity 4x para rapidez
                
                return (
                  <div 
                    key={i} 
                    className={`w-full h-full ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}
                    style={{
                      filter: `blur(${((1 - pixelProgress) * 2).toFixed(1)}px)`, // Blur reduzido para 2px
                      opacity: pixelProgress.toFixed(3),
                      transform: `scale(${(0.9 + pixelProgress * 0.1).toFixed(3)})`, // Scale reduzido
                      transition: 'none'
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* QR Code Description */}
          <p 
            className="text-sm text-neutral-400 mt-4"
            style={getTextInterpolation(0.25, 3.5)} // Texto do QR aparece mais rápido
          >
            QR Code para baixar o Circle
          </p>
          
          {/* Made in Brazil */}
          <h4 
            className="text-lg font-bold mt-8 bg-gradient-to-r from-[#038fab] to-[#fac92a] bg-clip-text text-transparent"
            style={getTextInterpolation(0.3, 4.0)} // Texto Brasil aparece mais rápido
          >
            Feito com amor no Brasil 💚
          </h4>
          
          {/* Additional info */}
          <div 
            className="mt-8 space-y-4"
            style={getScrollInterpolation(0.35, 3.5)} // Informações adicionais aparecem mais rápido
          >
            <p 
              className="text-gray-400 text-sm"
              style={getTextInterpolation(0.4, 4.0)}
            >
              Disponível para Android
            </p>
            
            <div 
              className="flex justify-center space-x-4 mt-6"
              style={getScrollInterpolation(0.45, 4.5)} // Badges das lojas aparecem mais rápido
            >
              <div 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm"
                style={getTextInterpolation(0.49, 5.0)}
              >
                Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 