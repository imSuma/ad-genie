import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { downloadImage } from '../utils/download';
import { aiService } from '../services/aiService';

export function ResultsScreen() {
  const navigate = useNavigate();
  const { state, setIsGenerating, setGeneratedAds, addToHistory, resetApp } = useAppContext();
  const hasGeneratedRef = useRef(false);

  useEffect(() => {
    // Only generate once when we first arrive at this screen
    if (state.selectedTheme && state.uploadedImage && state.generatedAds.length === 0 && !hasGeneratedRef.current && !state.isGenerating) {
      hasGeneratedRef.current = true;
      
      const generateAd = async () => {
        setIsGenerating(true);
        
        try {
          const generatedAd = await aiService.generateAd({
            image: state.uploadedImage!,
            theme: state.selectedTheme!,
          });
          
          setGeneratedAds([generatedAd]);
          addToHistory(generatedAd);
        } catch (error) {
          console.error('Failed to generate ad:', error);
          alert('Failed to generate ad. Please check your API key configuration and try again.');
        } finally {
          setIsGenerating(false);
        }
      };
      
      generateAd();
    }
  }, [state.selectedTheme, state.uploadedImage, state.generatedAds.length, state.isGenerating, setIsGenerating, setGeneratedAds, addToHistory]);


  const handleCreateNew = () => {
    hasGeneratedRef.current = false; // Reset the generation flag
    resetApp();
    navigate('/');
  };

  const handleDownloadAd = async (ad: typeof state.generatedAds[0]) => {
    const filename = `ad-${ad.theme.toLowerCase().replace(/\s+/g, '-')}-${ad.id}.jpg`;
    
    try {
      await downloadImage(ad.imageUrl, filename);
    } catch {
      alert('Failed to download ad. Please try again.');
    }
  };

  if (state.isGenerating) {
    return (
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <Loader className="w-10 h-10 text-white animate-spin" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full animate-ping opacity-20"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Generating Your Ad...</h2>
            <p className="text-gray-500 max-w-md text-lg leading-relaxed">Our AI is crafting a stunning ad tailored just for you. This may take a moment.</p>
            <div className="mt-6 flex space-x-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Your Generated Ad
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your stunning ad is ready for download. Share it with the world!
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {state.generatedAds.map((ad) => (
            <div key={ad.id} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative border border-gray-100">
              {/* Theme Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                  {ad.theme}
                </div>
              </div>

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                <img 
                  src={ad.imageUrl} 
                  alt={`${ad.theme} ad`} 
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Action Buttons */}
              <div className="p-6 space-y-3">
                <button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg"
                  onClick={() => handleDownloadAd(ad)}
                >
                  Download Ad
                </button>
                <button 
                  className="w-full bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg"
                  onClick={handleCreateNew}
                >
                  Create New Ads
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-green-100 to-green-200 rounded-full opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}