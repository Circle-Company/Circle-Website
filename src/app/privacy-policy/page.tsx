import { Footer } from "@/components/molecules/footer";

export default function Terms() {
  const terms = require('@/app/data/privacy-policy.json');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-bold font-sf-pro mb-8 text-gray-900">Políticas de Privacidade</h1>
        <div className="w-full max-w-3xl">
          {terms.map((term: any, index: number) => (
            <div key={index} className="py-6 border-b border-gray-300">
              <h2 className="text-2xl font-semibold font-sf-pro text-gray-800 mb-4">{term.title}</h2>
              {term.paragraphs.map((item: {text: string, topics: Array<string>}, index: number) => {
                return (
                  <div key={index} style={{marginBottom: 30}}>
                    <p className="text-gray-600 font-sf-pro mb-4 last:mb-0">{item.text}</p>
                    {item.topics.map((text, index) => {
                      return (<p key={index} style={{marginLeft: 30}} className="text-gray-600 font-sf-pro mb-4 last:mb-0">• {text}</p>)
                    })}                    
                  </div>
                )
              })}
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
