import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { downloadImage, downloadMultipleImages } from '../utils/download';
import { aiService } from '../services/aiService';

export function ResultsScreen() {
  const navigate = useNavigate();
  const { state, setIsGenerating, setGeneratedAds, resetApp } = useAppContext();

  useEffect(() => {
    const generateAd = async () => {
      if (state.selectedTheme && state.uploadedImage) {
        setIsGenerating(true);
        
        try {
          const generatedAd = await aiService.generateAd({
            image: state.uploadedImage,
            theme: state.selectedTheme,
          });
          
          setGeneratedAds([generatedAd]);
        } catch (error) {
          console.error('Failed to generate ad:', error);
          alert('Failed to generate ad. Please try again.');
        } finally {
          setIsGenerating(false);
        }
      }
    };
    
    generateAd();
  }, [state.selectedTheme, state.uploadedImage, setIsGenerating, setGeneratedAds]);

  const handleDownloadAll = async () => {
    if (state.generatedAds.length === 0) return;
    
    const images = state.generatedAds.map(ad => ({
      url: ad.imageUrl,
      filename: `ad-${ad.theme.toLowerCase().replace(/\s+/g, '-')}-${ad.id}.jpg`
    }));
    
    try {
      await downloadMultipleImages(images);
    } catch {
      alert('Failed to download some ads. Please try again.');
    }
  };

  const handleCreateNew = () => {
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
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-8"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Generating Your Ad...</h2>
            <p className="text-gray-500 max-w-md">Our AI is creating a stunning ad for you. This may take a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Generated Ad
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Your stunning ad is ready for download
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            onClick={handleDownloadAll}
          >
            ⬇️ Download Ad
          </button>
          <button 
            className="w-full sm:w-auto border border-gray-300 text-gray-600 font-medium py-3 px-8 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
            onClick={handleCreateNew}
          >
            🔄 Create New Ads
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.generatedAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-primary-500 text-white text-sm font-semibold px-4 py-2">
                {ad.theme}
              </div>
              <div className="p-4">
                <img 
                  src={ad.imageUrl} 
                  alt={`${ad.theme} ad`} 
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
              </div>
              <button 
                className="w-full border-t border-gray-200 text-gray-600 font-medium py-3 hover:bg-gray-50 transition-all"
                onClick={() => handleDownloadAd(ad)}
              >
                ⬇️ Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}