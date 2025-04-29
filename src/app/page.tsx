"use client";

import { AnimatedText } from "@/components/AnimatedText";
import { DownloadButton } from "@/components/DownloadButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import Image from "next/image";

// Definição dos recursos
const features = [
  {
    title: "Compartilhamento Instantâneo",
    description:
      "Compartilhe momentos especiais com seus amigos em tempo real.",
  },
  {
    title: "Círculos de Amizade",
    description: "Crie e gerencie seus círculos de amizade de forma intuitiva.",
  },
  {
    title: "Memórias Duradouras",
    description:
      "Preserve suas memórias mais preciosas com recursos avançados.",
  },
];

export default function Home() {
  return (
    <>
      {/* Componentes de interface em uma camada superior */}
      <ScrollProgress />

      {/* Conteúdo principal */}
      <main className="min-h-screen bg-black text-white relative font-regular">
        {/* Hero Section com padding-top para compensar os elementos fixos */}
        <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8">
              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Circle App
              </h1>

              {/* Sub-headline */}
              <div className="flex relative justify-center items-center my-2 md:my-4">
                <AnimatedText />
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl px-4">
                Social app to create moments and share your memories with
                friends
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8 w-full sm:w-auto px-4">
                <DownloadButton
                  href="#download"
                  size="medium"
                  className="w-64"
                />
              </div>

              {/* App Screenshot */}
              <div className="mt-12 md:mt-16 relative w-full max-w-[280px] md:max-w-[380px] aspect-[9/19]">
                <Image
                  src="/images/iphone-circle-mockup.png"
                  alt="Circle App Interface"
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Recursos */}
        <section
          id="features"
          className="relative w-full bg-black overflow-hidden py-20"
        >
          {/* Background com efeito de gradiente radial mais intenso */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/30 opacity-40 blur-3xl"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3),transparent_70%)] opacity-70"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 animate-glow">
                Recursos Incríveis
              </h2>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                Nossas soluções inovadoras são projetadas para transformar sua
                experiência digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-black/60 backdrop-blur-lg border border-blue-500/20 glow-border rounded-xl p-6 transition-all duration-300 hover:bg-blue-900/20 hover:border-blue-400/40 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-blue-200">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre o Projeto Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                Sobre o Projeto
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 px-2">
                O Circle App nasceu da ideia de criar conexões mais
                significativas em um mundo cada vez mais digital. Nossa
                plataforma permite que você compartilhe momentos especiais com
                pessoas que realmente importam, criando círculos de amizades
                autênticas e memórias duradouras.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed px-2">
                Com recursos inovadores de compartilhamento e uma interface
                intuitiva, tornamos mais fácil do que nunca manter-se conectado
                com seu círculo social mais próximo, compartilhando não apenas
                fotos, mas momentos que contam sua história.
              </p>
            </div>
          </div>
        </section>

        {/* Fundadores Section */}
        <section id="team" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16">
              Nossos Fundadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-12 max-w-4xl mx-auto">
              {/* Fundador 1 */}
              <div className="text-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6">
                  <Image
                    src="/founder1.jpg"
                    alt="Fundador 1"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  João Silva
                </h3>
                <p className="text-gray-400 mb-4 font-medium">
                  CEO & Co-Fundador
                </p>
                <p className="text-gray-500 text-sm md:text-base px-4 max-w-lg mx-auto">
                  Com mais de 10 anos de experiência em tecnologia, João lidera
                  a visão estratégica e o desenvolvimento do Circle App.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer com efeito de ondulação */}
        <footer className="border-t border-gray-800 pt-12 md:pt-16 pb-6 md:pb-8 mt-8 relative">
          <div className="container mx-auto px-4 relative z-10">
            {/* Logo e links para mobile */}
            <div className="md:hidden mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Circle App</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Links rápidos */}
                <div>
                  <h3 className="text-sm uppercase text-gray-400 font-medium mb-3">
                    App
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/about"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      About Project
                    </a>
                    <a
                      href="/pricing"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      Roadmap
                    </a>
                    <a
                      href="/blog"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      Donwload Now
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase text-gray-400 font-medium mb-3">
                    More
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="/docs"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      Documentation
                    </a>
                    <a
                      href="/help"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      Blog
                    </a>
                    <a
                      href="/help"
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      Ajuda
                    </a>
                  </div>
                </div>
              </div>

              {/* Social links para mobile */}
              <div className="mt-8">
                <h3 className="text-sm uppercase text-gray-400 font-medium mb-3">
                  Social
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/circle"
                    className="text-gray-300 hover:text-white"
                  >
                    <span className="text-2xl">🐙</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Versão desktop do footer */}
            <div className="hidden md:grid md:grid-cols-5 gap-8 mb-12">
              {/* Coluna 1 */}
              <div className="space-y-4">
                <Image
                  src="/images/logo.png"
                  alt="Circle App Logo"
                  width={120}
                  height={40}
                  className="mb-6"
                />
                <div className="flex flex-col space-y-2">
                  <a
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                  <a
                    href="/security"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Segurança
                  </a>
                  <a
                    href="/community"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Comunidade
                  </a>
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="space-y-4">
                <h3 className="text-white font-medium mb-4">Recursos</h3>
                <div className="flex flex-col space-y-2">
                  <a
                    href="/docs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentação
                  </a>
                  <a
                    href="/roadmap"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Roadmap
                  </a>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contato
                  </a>
                </div>
              </div>

              {/* Coluna 3 */}
              <div className="space-y-4">
                <h3 className="text-white font-medium mb-4">Social</h3>
                <div className="flex flex-col space-y-2">
                  <a
                    href="https://discord.gg/circle"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discord
                  </a>
                  <a
                    href="https://twitter.com/circle"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://github.com/circle"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Coluna 4 */}
              <div className="space-y-4">
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <div className="flex flex-col space-y-2">
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Termos de Uso
                  </a>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Política de Privacidade
                  </a>
                  <a
                    href="/dpa"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    DPA
                  </a>
                  <a
                    href="/status"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Status
                  </a>
                </div>
              </div>

              {/* Coluna 5 - Certificações */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 rounded-lg p-2">
                    <Image
                      src="/images/iso27001.png"
                      alt="ISO 27001"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-2">
                    <Image
                      src="/images/gdpr.png"
                      alt="GDPR"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-2">
                    <Image
                      src="/images/hipaa.png"
                      alt="HIPAA"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-2">
                    <Image
                      src="/images/soc2.png"
                      alt="SOC2"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
                © 2024 Circle App. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
