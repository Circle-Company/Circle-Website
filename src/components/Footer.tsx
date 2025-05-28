"use client";

export function Footer() {
  const footerLinks = {
    legal: [
      { name: "Termos de Uso", href: "/terms-of-service" },
      { name: "Política de Privacidade", href: "/privacy-policy" },
      { name: "Contato", href: "/contact" },
    ]
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-neutral-800/50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main footer content */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {footerLinks.legal.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-neutral-300 hover:text-white transition-all duration-300 text-base font-medium hover:scale-105 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#038fab] to-[#fac92a] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        {/* Bottom section */}
        <div className="text-center border-t border-neutral-800/30 pt-8">
          <p className="text-neutral-400 text-sm font-light tracking-wide">
            © 2025 Circle Company. Todos os direitos reservados.
          </p>
          <p className="text-neutral-500 text-xs mt-2 font-light">
            Crie Momentos, Compartilhe Memórias.
          </p>
        </div>
      </div>
    </footer>
  );
} 