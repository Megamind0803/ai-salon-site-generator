
import React, { useState, useCallback } from 'react';
import { SalonForm } from './components/SalonForm';
import { WebsitePreview } from './components/WebsitePreview';
import { generateSalonContent } from './services/geminiService';
import { SalonData, GeneratedContent, ColorTheme } from './types';
import { THEMES } from './constants';

const App: React.FC = () => {
  const [salonData, setSalonData] = useState<SalonData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [theme, setTheme] = useState<ColorTheme>(THEMES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateWebsite = useCallback(async (data: SalonData) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateSalonContent(data);
      setSalonData(data);
      setGeneratedContent(content);
      const selectedTheme = THEMES.find(t => t.name === data.theme);
      if (selectedTheme) {
        setTheme(selectedTheme);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
      setGeneratedContent(null);
      setSalonData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRestart = () => {
    setSalonData(null);
    setGeneratedContent(null);
    setError(null);
  };
  
  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-700 mb-4">An Error Occurred</h2>
                <p className="text-red-600 mb-6">{error}</p>
                <button 
                    onClick={handleRestart}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                    Try Again
                </button>
            </div>
        </div>
    );
  }


  return (
    <div>
      {salonData && generatedContent ? (
        <WebsitePreview 
          salonData={salonData} 
          generatedContent={generatedContent} 
          theme={theme}
          onRestart={handleRestart}
        />
      ) : (
        <SalonForm 
          onGenerate={handleGenerateWebsite} 
          isLoading={isLoading} 
        />
      )}
    </div>
  );
};

export default App;
