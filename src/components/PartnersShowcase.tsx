"use client";

import { useEffect, useState } from "react";

import Image from 'next/image';
import Masonry from 'react-masonry-css';

export function PartnersShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const partners = [
    {
      name: "Macacco Prego",
      type: "creator",
      bgColor: "from-pink-500 to-purple-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/e4/4b/25/e44b251037ada7a1dd74e9377df7d7c8.jpg",
      height: "h-80",
      marginTop: 80
    },
    {
      name: "Whitney Bradshaw", 
      type: "creator",
      bgColor: "from-orange-500 to-red-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/43/b5/d1/43b5d1b9035606a36b4cf85b7de7c828.jpg",
      height: "h-80",
      marginTop: 0
    },
    {
      name: "BuzzFeed",
      type: "brand",
      bgColor: "from-red-500 to-pink-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/f0/b6/fb/f0b6fb938b50fac421cd455c326d5a47.jpg",
      height: "h-80",
      marginTop: 70
    },
    {
      name: "Shepard Fairey",
      type: "creator",
      bgColor: "from-blue-500 to-green-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/bd/fb/a4/bdfba4ce734cd25898fbf1f95a9e3575.jpg",
      height: "h-80",
      marginTop: 20
    },
    {
      name: "Rio Ferdinand",
      type: "creator",
      bgColor: "from-gray-600 to-gray-800",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/78/2a/4b/782a4bd029c7f46181b2a2f10f790a22.jpg",
      height: "h-80",
      marginTop: 120
    },
    {
      name: "Rankin",
      type: "creator",
      bgColor: "from-purple-500 to-blue-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/7a/cf/90/7acf90932b0108c5840a3430c3636449.jpg",
      height: "h-80",
      marginTop: 30
    },
    {
      name: "Sarah Wilson",
      type: "creator",
      bgColor: "from-yellow-500 to-orange-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/1a/60/85/1a60857e9104e5cd2c115ad338b6dfe3.jpg",
      height: "h-80",
      marginTop: -28
    },
    {
      name: "Kamala Lopez",
      type: "creator",
      bgColor: "from-teal-500 to-blue-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "/images/partners/partner8.jpg",
      height: "h-80",
      marginTop: -28
    },
    {
      name: "henri.tt",
      type: "creator",
      bgColor: "from-green-500 to-teal-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/11/ec/aa/11ecaab19af27f9e0fc469ed71bcd8e0.jpg",
      height: "h-80",
      marginTop: -28
    },
    {
      name: "Tasya van Ree",
      type: "creator",
      bgColor: "from-cyan-500 to-blue-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "/images/partners/partner10.jpg",
      height: "h-80",
      marginTop: -28
    },
    {
      name: "Activist Brand",
      type: "brand",
      bgColor: "from-emerald-500 to-teal-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/58/18/e3/5818e33db8ce82217098033a54fb2fdf.jpg",
      height: "h-80",
      marginTop: -28
    },
    {
      name: "Impact Partner",
      type: "brand",
      bgColor: "from-rose-500 to-pink-500",
      videoUrl: "/videos/CIRCLE_APP_MOVIE.mov",
      posterUrl: "https://i.pinimg.com/736x/ae/d9/3c/aed93c7f8630bd8ce721ccdc463ac735.jpg",
      height: "h-80",
      marginTop: -28
    },
  ];

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    let lastProgress = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          const section = document.getElementById('partners-showcase');
          if (!section) {
            ticking = false;
            return;
          }

          const rect = section.getBoundingClientRect();
          const sectionHeight = section.offsetHeight;
          const windowHeight = window.innerHeight;
          
          // Validar se os valores são números válidos
          if (isNaN(rect.top) || isNaN(rect.bottom) || isNaN(sectionHeight) || isNaN(windowHeight)) {
            ticking = false;
            return;
          }
          
          // Calcular progresso da seção de forma mais lenta e controlada
          let progress = 0;
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            if (rect.top <= 0) {
              // Seção está sendo scrollada - progresso mais lento
              const scrolledIntoSection = Math.abs(rect.top);
              const maxScrollInSection = Math.max(1, sectionHeight - windowHeight);
              
              // Fazer a transição mais lenta multiplicando por um fator menor
              const slowFactor = 0.3; // Reduz a velocidade da transição
              progress = Math.max(0, Math.min(1, (scrolledIntoSection / maxScrollInSection) * slowFactor));
              
              // Adicionar progresso extra baseado no scroll total para completar a animação
              const extraProgress = Math.max(0, Math.min(0.7, (scrolledIntoSection / maxScrollInSection - 1) * 2));
              progress = Math.min(1, progress + extraProgress);
            } else {
              // Seção está entrando na tela
              progress = Math.max(0, Math.min(0.3, (windowHeight - rect.top) / windowHeight * 0.3));
            }
          } else if (rect.bottom <= 0) {
            // Seção passou completamente
            progress = 1;
          }
          
          progress = Math.max(0, Math.min(1, progress));
          
          // Aplicar easing cúbico mais suave para transição cinematográfica
          let easedProgress;
          if (progress < 0.5) {
            easedProgress = 4 * progress * progress * progress;
          } else {
            const temp = -2 * progress + 2;
            easedProgress = 1 - Math.pow(temp, 3) / 2;
          }
          
          easedProgress = Math.max(0, Math.min(1, easedProgress));
          
          // Interpolação mais suave para movimento cinematográfico
          const smoothedProgress = lastProgress + (easedProgress - lastProgress) * 0.08;
          
          if (Math.abs(smoothedProgress - lastProgress) > 0.001) {
            setScrollProgress(smoothedProgress);
            lastProgress = smoothedProgress;
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle para melhor performance
    let throttleTimer: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (throttleTimer === null) {
        throttleTimer = setTimeout(() => {
          handleScroll();
          throttleTimer = null;
        }, 8); // ~120fps
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Executar uma vez no mount
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, []);

  // Breakpoints para o masonry layout
  const breakpointColumnsObj = {
    default: 6,
    1536: 6,
    1280: 6,
    1024: 6,
    768: 3,
    640: 3,
    480: 3
  };

  // Filtrar parceiros para mostrar apenas metade deles em mobile
  const filteredPartners = partners.filter((_, index) => {
    // Em telas pequenas, mostrar apenas os parceiros das colunas 0, 2, 4
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return index % 2 === 0;
    }
    // Em telas maiores, mostrar todos
    return true;
  });

  // Estado para controlar a largura da tela
  const [isMobile, setIsMobile] = useState(false);

  // Efeito para detectar tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Verificar no carregamento
    checkScreenSize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkScreenSize);
    
    // Limpar listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Estado para rastrear vídeos visíveis
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const videoRefs = useState<(HTMLVideoElement | null)[]>(Array(partners.length).fill(null))[0];

  // Observer para detectar quando os vídeos entram na viewport
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const videoIndex = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(videoIndex)) {
            if (entry.isIntersecting) {
              // Adicionar à lista de vídeos visíveis
              setVisibleVideos(prev => [...prev, videoIndex]);
              // Tentar iniciar o vídeo
              if (videoRefs[videoIndex]) {
                videoRefs[videoIndex]?.play().catch(e => {
                  console.log("Erro ao iniciar vídeo:", e);
                });
              }
            } else {
              // Remover da lista de vídeos visíveis
              setVisibleVideos(prev => prev.filter(index => index !== videoIndex));
              // Pausar o vídeo
              if (videoRefs[videoIndex]) {
                videoRefs[videoIndex]?.pause();
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    // Selecionar todos os contêineres de vídeo
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
      observer.observe(container);
    });

    return () => {
      observer.disconnect();
    };
  }, [videoRefs]);

  return (
    <section 
      id="partners-showcase"
      className="-mt-[250px] text-white relative overflow-hidden bg-black"
      style={{ minHeight: '100vh' }} // Garantir altura mínima adequada
    >

      <div
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-8"
      style={{
        opacity: scrollProgress >= 0.9 ? Math.max(0.1, 1 - (scrollProgress - 0.9) * 10) : 1,
        filter: scrollProgress >= 0.9 ? `blur(${((scrollProgress - 0.8) * 50).toFixed(1)}px)` : 'none',
        transition: 'opacity 0.1s ease-out, filter 0.1s ease-out'
      }}
      >
        {/* Partners masonry layout */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full -ml-1 sm:-ml-2 md:-ml-3 lg:-ml-4" 
          columnClassName="pl-1 sm:pl-2 md:pl-3 lg:pl-4 bg-clip-padding"
        >
          {partners.map((partner, index) => {
            // Ocultar parceiros alternados em telas móveis
            if (isMobile && index % 2 !== 0) return null;
            
            return (
              <div 
                key={index} 
                className="relative group cursor-pointer"
                style={{
                  marginTop: `${partner.marginTop}px`,
                  marginBottom: '32px', // Espaçamento fixo entre cards (8 * 4px = 32px)
                  transition: 'transform 0.3s ease-out, margin-top 0.3s ease-out',
                  minHeight: '250px', // Altura mínima para telas menores
                  zIndex: partner.marginTop < 0 ? 10 : 1 // Z-index maior para itens que sobem
                }}
              >
                      <div 
                        className="w-full rounded-3xl overflow-hidden relative bg-gray-900 shadow-xl"
                        style={{ 
                          height: 'calc(250px + 10vw)', // Altura responsiva baseada na largura da viewport
                          maxHeight: '350px', // Altura máxima para telas grandes
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' // Sombra para separação visual
                        }}
                      >
                        {/* Container do vídeo */}
                        <div 
                          className="w-full h-full relative video-container"
                          data-index={index}
                        >
                          {/* Fallback para o gradiente caso o vídeo não carregue */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${partner.bgColor} opacity-80`}></div>
                          
                          {/* Imagem poster para o vídeo */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                              backgroundImage: `url(${partner.posterUrl})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                          
                          {/* Vídeo de fundo com carregamento otimizado */}
                          <video
                            ref={el => { videoRefs[index] = el; }}
                            preload="none"
                            poster={partner.posterUrl}
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ opacity: visibleVideos.includes(index) ? 1 : 0 }}
                          >
                            <source src={partner.videoUrl} type={partner.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                            Seu navegador não suporta o elemento de vídeo.
                          </video>
                          
                          {/* Overlay com nome do parceiro */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <h1 className="text-xl font-bold text-white drop-shadow-lg">@{partner.name}</h1>
                          </div>
                        </div>
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </div>
                    </div>
                  );
                })}
        </Masonry>
      </div>
    </section>
  );
}