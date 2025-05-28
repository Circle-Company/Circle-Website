"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

export function FeaturesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('features-section');
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionHeight = section.offsetHeight;
          
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
          
          setScrollProgress(Math.max(0, Math.min(1, progress)));
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

  const features = [
    {
      title: "De Pessoas para Pessoas",
      description: "Você controla o que vê. Sem algoritmos ocultos manipulando seu feed."
    },
    {
      title: "Compartilhe Momentos",
      description: "Compartilhe os seus momentos com seus amigos, e seja visto por todos."
    },
    {
      title: "Circle é Segurança",
      description: "Seus dados são seus. Não vendemos suas informações pessoais para terceiros."
    }
  ];

  // Função para interpolar blur e opacity diretamente com o scroll
  const getScrollInterpolation = (offset: number = 0, intensity: number = 1) => {
    // Aplicar offset para escalonar a entrada dos elementos
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity));
    
    // Interpolação mais rápida do blur (de 10px para 0px)
    const blur = (1 - adjustedProgress) * 10;
    
    // Interpolação rápida da opacity (de 0 para 1)
    const opacity = adjustedProgress;
    
    // Interpolação rápida da escala (de 0.95 para 1.0)
    const scale = 0.95 + (adjustedProgress * 0.05);
    
    // Interpolação rápida do translateY (de 20px para 0px)
    const translateY = (1 - adjustedProgress) * 20;
    
    return {
      filter: `blur(${blur.toFixed(1)}px)`,
      opacity: opacity.toFixed(3),
      transform: `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`,
      transition: 'none' // Sem transição para interpolação direta
    };
  };

  // Função específica para texto com interpolação mais rápida
  const getTextInterpolation = (offset: number = 0, intensity: number = 1) => {
    const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - offset) * intensity));
    
    // Blur mais rápido para texto
    const blur = (1 - adjustedProgress) * 6;
    
    // Opacity mais rápida
    const opacity = Math.max(0.2, adjustedProgress);
    
    // Escala mais rápida
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
      id="features-section"
      className="p-20 bg-gradient-to-b from-[#000000] to-[#0f0f0f] text-white gradient-quality"
    >
      <div
        className="container mx-auto px-4 force-32bit"
        style={getScrollInterpolation(0, 4)} // Container aparece muito rápido com intensidade 4x
      >
        <div 
          className="text-center mb-16 force-32bit"
          style={getScrollInterpolation(0.02, 3.5)} // Título aparece quase imediatamente
        >
          <h2 
            className="text-xl md:text-5xl mb-2 bg-gradient-to-b font-bold from-white to-gray-500 bg-clip-text text-transparent leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] text-gradient-quality"
            style={getTextInterpolation(0.04, 3)} // Título principal com interpolação rápida
          >
            Uma nova era de rede social
          </h2>
          <p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            style={getTextInterpolation(0.06, 2.8)} // Subtítulo logo em seguida
          >
            Construído para pessoas, não para lucro. Onde sua voz importa e seu valor é reconhecido.
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto force-32bit"
          style={getScrollInterpolation(0.08, 2.5)} // Container dos cards com transição rápida
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-black/50 backdrop-blur-sm border-2 border-neutral-800 rounded-3xl p-6 hover:border-neutral-700 transition-all duration-500 hover:scale-105 force-32bit"
              style={getScrollInterpolation(0.1 + index * 0.02, 2.2)} // Cards aparecem rapidamente com offset mínimo
            >
              <h3 
                className="text-xl font-bold mb-4 text-white"
                style={getTextInterpolation(0.12 + index * 0.02, 2.0)} // Títulos dos cards
              >
                {feature.title}
              </h3>
              <p 
                className="text-neutral-400 leading-relaxed"
                style={getTextInterpolation(0.14 + index * 0.02, 1.8)} // Descrições dos cards
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        

      </div>
    </section>
  );
} 