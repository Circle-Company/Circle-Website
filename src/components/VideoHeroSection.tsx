"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

export function VideoHeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('video-hero-section');
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          
          let progress = 0;
          
          // Validar se os valores são números válidos
          if (isNaN(rect.top) || isNaN(rect.bottom) || isNaN(sectionHeight) || isNaN(windowHeight)) {
            ticking = false;
            return;
          }
          
          // Calcular progresso baseado na posição da seção
          if (rect.top <= 0 && rect.bottom >= 0) {
            // Seção está sendo scrollada
            const scrolledIntoSection = Math.abs(rect.top);
            const maxScrollInSection = Math.max(1, sectionHeight - windowHeight);
            const rawProgress = scrolledIntoSection / maxScrollInSection;
            
            // Gradiente aparece gradualmente, não desde o início
            if (rawProgress < 0.3) {
              // Primeira parte: sem gradiente (0-30%)
              progress = 0;
            } else if (rawProgress < 0.6) {
              // Gradiente começa a aparecer suavemente (30-60%)
              progress = ((rawProgress - 0.3) / 0.3) * 0.5; // 0 to 0.5
            } else {
              // Intensificação final (60-100%)
              progress = Math.min(1.0, 0.5 + ((rawProgress - 0.6) / 0.4) * 0.5); // 0.5 to 1.0
            }
          } else if (rect.bottom <= 0) {
            // Seção passou completamente
            progress = 1.0;
          } else if (rect.top >= windowHeight) {
            // Seção ainda não entrou na tela
            progress = 0;
          } else if (rect.top > 0 && rect.top < windowHeight) {
            // Seção está entrando na tela (de cima ou voltando)
            const visibilityRatio = (windowHeight - rect.top) / windowHeight;
            progress = Math.max(0, visibilityRatio * 0.2); // Fade in muito suave
          }
          
          // Aplicar easing suave para transições naturais
          const easedProgress = progress < 0.5 
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          // Garantir que progress está entre 0 e 1
          progress = Math.max(0, Math.min(1, easedProgress));
          
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
  }, []); // Remover dependência para evitar loops

  return (
    <section 
      id="video-hero-section"
      className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.prod.website-files.com/606764a311491eafe0e305af%2F674fcb3399948a3f066e362d_8_Header_Video%207-poster-00001.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
              >
          {/* Fixed vertical black gradient overlay */}
          <div 
            className="absolute inset-0 z-5"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 1) 100%)'
            }}
          ></div>
          
          {/* Dynamic gradient overlay that appears gradually */}
          <div 
            className="absolute inset-0 z-10 transition-all duration-400 ease-out"
            style={{
              background: scrollProgress === 0 ? 'transparent' : `linear-gradient(to bottom, 
                rgba(0, 0, 0, ${scrollProgress * 0.15}) 0%, 
                rgba(0, 0, 0, ${scrollProgress * 0.25}) 30%, 
                rgba(0, 0, 0, ${scrollProgress * 0.4}) 60%, 
                rgba(0, 0, 0, ${scrollProgress * 0.6}) 100%)`
            }}
          ></div>
        </div>
      
      {/* Content with innovative scroll animations */}
      <div className="container mx-auto px-4 text-center relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Text content with dust-like disintegration effect */}
            <div 
              className="text-center max-w-4xl mx-auto transition-all duration-300 ease-out"
              style={{
                transform: `scale(${1 + scrollProgress * 2.5}) translateY(${scrollProgress * -120}px)`,
                filter: `blur(${scrollProgress * 25}px)`,
                opacity: Math.max(0, 1 - scrollProgress * 3.5),
              }}
            >
              {/* Animated subtitle with dust effect */}
              <h1 
                className="text-2xl md:text-6xl lg:text-5xl italic font-bold mb-8 leading-tight transition-all duration-300"
                style={{
                  transform: `scale(${1 + scrollProgress * 3.0}) rotateX(${scrollProgress * 60}deg)`,
                  filter: `blur(${scrollProgress * 30}px)`,
                  opacity: Math.max(0, 1 - scrollProgress * 4.0),
                }}
              >
                Circle App
              </h1>

              {/* Main title with dust disintegration effect */}
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-300"
                style={{
                  transform: `scale(${1 + scrollProgress * 4.0}) rotateY(${scrollProgress * 80}deg) rotateX(${scrollProgress * 40}deg)`,
                  filter: `blur(${scrollProgress * 35}px) contrast(${Math.max(0.1, 1 - scrollProgress * 0.8)})`,
                  textShadow: `
                    0 ${scrollProgress * 60}px ${scrollProgress * 100}px rgba(0, 0, 0, ${scrollProgress * 1.2})
                  `,
                  opacity: Math.max(0, 1 - scrollProgress * 3.8),
                }}
              >
                A Rede social que traz a{" "}
                <span 
                  className="italic relative"
                  style={{
                    transform: `scale(${1 + scrollProgress * 5.0}) rotateZ(${scrollProgress * 180}deg)`,
                    filter: `blur(${scrollProgress * 40}px)`,
                    opacity: Math.max(0, 1 - scrollProgress * 4.5),
                  }}
                >
                  Humanidade
                </span>{" "}
                de volta
              </h1>
              
              {/* Download button with dust disintegration */}
              <div 
                className="flex justify-center mt-8 transition-all duration-300"
                style={{
                  transform: `translateY(${scrollProgress * 200}px) scale(${1 + scrollProgress * 3.5}) rotateX(${scrollProgress * 120}deg) rotateZ(${scrollProgress * 90}deg)`,
                  filter: `blur(${scrollProgress * 30}px)`,
                  opacity: Math.max(0, 1 - scrollProgress * 4.2),
                }}
              >
                <div 
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255, 255, 255, ${Math.max(0, 1 - scrollProgress * 2.0)}) 0%, 
                      rgba(240, 240, 240, ${Math.max(0, 1 - scrollProgress * 1.5)}) 100%)`,
                    color: `rgba(0, 0, 0, ${Math.max(0, 1 - scrollProgress * 2.5)})`,
                    boxShadow: `
                      0 ${scrollProgress * 80}px ${scrollProgress * 150}px rgba(0, 0, 0, ${scrollProgress * 1.5}),
                      0 0 ${scrollProgress * 200}px rgba(255, 255, 255, ${scrollProgress * 2.0}),
                      inset 0 1px 0 rgba(255, 255, 255, ${Math.max(0, 0.3 - scrollProgress * 0.3)})
                    `,
                    border: `1px solid rgba(255, 255, 255, ${Math.max(0, 0.3 - scrollProgress * 0.3)})`,
                    transform: `scale(${1 + scrollProgress * 2.0}) rotateX(${scrollProgress * 180}deg)`,
                    filter: `blur(${scrollProgress * 20}px)`,
                  }}
                >
                  <span 
                    className="font-semibold text-lg transition-all duration-300"
                    style={{
                      textShadow: `0 1px 2px rgba(0, 0, 0, ${scrollProgress * 1.0})`,
                    }}
                  >
                    Download
                  </span>
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(0, 0, 0, ${Math.max(0, 1 - scrollProgress * 1.5)}) 0%, 
                        rgba(50, 50, 50, ${Math.max(0, 1 - scrollProgress * 1.2)}) 100%)`,
                      color: `rgba(255, 255, 255, ${Math.max(0, 1 - scrollProgress * 2.0)})`,
                      boxShadow: `
                        0 ${scrollProgress * 20}px ${scrollProgress * 40}px rgba(0, 0, 0, ${scrollProgress * 1.5}),
                        inset 0 1px 0 rgba(255, 255, 255, ${Math.max(0, 0.2 - scrollProgress * 0.2)})
                      `,
                      transform: `rotate(${scrollProgress * 1440}deg) scale(${1 + scrollProgress * 2.5})`,
                      filter: `blur(${scrollProgress * 15}px)`,
                    }}
                  >
                    <span className="text-sm">▶</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 