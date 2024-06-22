import Image from "next/image";
import { Footer } from "@/components/molecules/footer";
import { Headline } from "@/components/molecules/headline";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-30">
    <main className="relative flex items-center justify-center w-full h-screen">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url('/images/emojis-background-blur.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          opacity: '0.5',
          width: '100%',  // Definindo largura da imagem
          height: '100%', // Definindo altura da imagem
        }}
      />
      
      {/* Conteúdo centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-top mt-10 bg-black bg-opacity-0 text-white">
        <Headline />
        <Image
            src="/images/iphone-circle-mockup.png"
            alt="Background"
            objectFit="fill"
            quality={100}
            width={300}
            height={607}
            className="mt-10 mb-10 align-center self-center"
        />
        <h4 className="text-10px text-subHeadline font-regular font-sf-pro mb-8">Copyright © 2024 Circle Company. All rights reserved.</h4>
        <div></div>
        <Footer />
        <div></div>
        {/* Adicione mais conteúdo conforme necessário */}
      </div>
    </main>
    
  </div>
  );
}
