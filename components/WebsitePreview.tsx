
import React from 'react';
import { SalonData, GeneratedContent, ColorTheme } from '../types';

interface WebsitePreviewProps {
  salonData: SalonData;
  generatedContent: GeneratedContent;
  theme: ColorTheme;
  onRestart: () => void;
}

const IconCut = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l-2.064 2.064a1 1 0 000 1.414l.707.707a1 1 0 001.414 0L12 13.414m0 0l2.929 2.929a1 1 0 001.414 0l.707-.707a1 1 0 000-1.414L15 12m-3 0h6" />
    </svg>
);

const IconBrush = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

const IconLotion = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const serviceIcons = [<IconCut key="cut" />, <IconBrush key="brush" />, <IconLotion key="lotion"/>];


export const WebsitePreview: React.FC<WebsitePreviewProps> = ({ salonData, generatedContent, theme, onRestart }) => {
  return (
    <div className={`${theme.background} ${theme.textPrimary} font-sans transition-colors duration-500`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-md ${theme.secondary} bg-opacity-80 backdrop-blur-md`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">{salonData.name}</h1>
          <div className="space-x-6 hidden md:block">
            <a href="#about" className="hover:text-gray-500">About</a>
            <a href="#services" className="hover:text-gray-500">Services</a>
            <a href="#contact" className="hover:text-gray-500">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white text-center bg-cover bg-center" 
        style={{ backgroundImage: `url(https://picsum.photos/1600/900?random=1)` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-4">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight shadow-text">{generatedContent.heroHeadline}</h2>
          <p className="text-lg md:text-2xl font-light shadow-text">{generatedContent.heroTagline}</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-4xl font-serif font-bold mb-6">Welcome to {salonData.name}</h3>
          <p className={`text-lg ${theme.textSecondary} whitespace-pre-line leading-relaxed`}>
            {generatedContent.aboutUs}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 px-6 ${theme.secondary}`}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif font-bold">Our Services</h3>
            <p className={`mt-2 text-lg ${theme.textSecondary}`}>Indulge in our range of luxury treatments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generatedContent.services.map((service, index) => (
              <div key={index} className={`p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 ${theme.background}`}>
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${theme.primary} text-white`}>
                  {serviceIcons[index % serviceIcons.length]}
                </div>
                <h4 className="text-2xl font-serif font-semibold mb-2">{service.name}</h4>
                <p className={`${theme.textSecondary}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-serif font-bold">Our Work</h3>
                <p className={`mt-2 text-lg ${theme.textSecondary}`}>A glimpse into our artistry.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/800?random=2" alt="" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/600?random=3" alt="" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/700?random=4" alt="" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/500?random=5" alt="" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/800?random=6" alt="" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/600?random=7" alt="" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/700?random=8" alt="" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-lg" src="https://picsum.photos/500/500?random=9" alt="" /></div>
                </div>
            </div>
          </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className={`${theme.primary} text-white py-12 px-6`}>
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">Contact Us</h3>
          <p className="text-lg">{salonData.contact}</p>
          <p className="mt-8 text-sm opacity-80">&copy; {new Date().getFullYear()} {salonData.name}. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Restart Button */}
      <button 
        onClick={onRestart}
        className="fixed bottom-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50">
          Start Over
      </button>
    </div>
  );
};
