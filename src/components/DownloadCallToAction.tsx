"use client";

import { useEffect, useState } from "react";

export function DownloadCallToAction() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('download-cta-section');
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
    // Aumentar a intensidade para que as animações completem mais cedo
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity * 2));
    
    // Interpolação do blur (de 8px para 0px) - completa mais cedo
    const blur = (1 - adjustedProgress) * 8;
    
    // Interpolação da opacity (de 0 para 1) - completa mais cedo
    const opacity = adjustedProgress;
    
    // Interpolação da escala (de 0.95 para 1.0) - completa mais cedo
    const scale = 0.95 + (adjustedProgress * 0.05);
    
    // Interpolação do translateY (de 30px para 0px) - completa mais cedo
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
    // Aumentar a intensidade para que as animações de texto completem mais cedo
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity * 2.5));
    
    // Blur mais sutil para texto - completa mais cedo
    const blur = (1 - adjustedProgress) * 5;
    
    // Opacity - completa mais cedo
    const opacity = Math.max(0.2, adjustedProgress);
    
    // Escala sutil - completa mais cedo
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
      id="download-cta-section"
      className="py-20 bg-gradient-to-b from-[#0f0f0f] to-[#000000] text-white"
    >
      <div
        className="container mx-auto px-4"
        style={getScrollInterpolation(0, 3)} // Container aparece rapidamente
      >
        {/* Call to action */}
        <div 
          className="text-center flex flex-col items-center"
          style={getScrollInterpolation(0.1, 2.5)} // CTA aparece com delay
        >
          <h2 
            className="text-3xl md:text-5xl bg-gradient-to-b font-bold from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            style={getTextInterpolation(0.2, 2.0)} // Título do CTA
          >
            Baixe Agora{" "}
            <span 
              className="italic relative"
              style={getTextInterpolation(0.25, 1.8)} // "Circle App" com delay
            >
              Circle App
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mt-6"
            style={getTextInterpolation(0.3, 1.6)} // Descrição adicional
          >
            Junte-se à revolução das redes sociais. Baixe agora e faça parte de uma comunidade que valoriza você.
          </p>
        </div>
      </div>
    </section>
  );
} 