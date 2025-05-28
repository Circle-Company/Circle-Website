import { Footer } from "@/components/molecules/footer";

export default function Terms() {
  const terms = require('@/app/data/terms-of-service.json');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold mb-8 font-sf-pro text-gray-900">Termos de Serviço</h1>
        <div className="w-full max-w-3xl">
          {terms.map((term: any, index: number) => (
            <div key={index} className="py-6 border-b border-gray-300">
              <h2 className="text-2xl font-semibold font-sf-pro text-gray-800 mb-4">{term.title}</h2>
              {term.paragraphs.map((text: string, index: number) => (
                <p key={index} className="text-gray-600 mb-4 font-sf-pro last:mb-0">{text}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{marginTop: 10}}>
          <Footer />
        </div>
      </main>
    </div>
  );
}
