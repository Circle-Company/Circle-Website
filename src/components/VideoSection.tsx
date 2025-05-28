"use client";

import { VideoPlayer } from "./VideoPlayer";

export function VideoSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Estamos transferindo o poder das big techs para as pessoas
          </h2>
        </div>
        
        {/* Video player */}
        <div className="mt-20 max-w-4xl mx-auto">
          <VideoPlayer
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            title="A Revolução da Mídia Social"
            description="Veja como estamos mudando o futuro das redes sociais para melhor"
            className="shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
} 