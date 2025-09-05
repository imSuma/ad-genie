import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import type { AdTheme } from '../types';

const themes: AdTheme[] = [
  { id: 'minimalist', name: 'Minimalist', description: 'Clean & simple', icon: '🎯' },
  { id: 'festive', name: 'Festive', description: 'Holiday vibes', icon: '🎄' },
  { id: 'lifestyle', name: 'Lifestyle', description: 'Real moments', icon: '🌟' },
  { id: 'luxury', name: 'Luxury', description: 'Premium feel', icon: '💎' },
  { id: 'office', name: 'Office', description: 'Professional', icon: '💼' },
  { id: 'nature', name: 'Nature', description: 'Organic & natural', icon: '🌿' },
  { id: 'summer', name: 'Summer', description: 'Bright & energetic', icon: '🌴' },
  { id: 'bold', name: 'Bold Colors', description: 'Eye-catching', icon: '🔥' },
  { id: 'sale', name: 'Sale Banner', description: 'Promotional', icon: '🏷️' },
];

export function ThemeSelection() {
  const navigate = useNavigate();
  const { state, setSelectedTheme } = useAppContext();
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const handleThemeSelect = (theme: AdTheme) => {
    setSelectedThemeId(theme.id);
    setSelectedTheme(theme);
  };

  const handleGenerate = () => {
    if (selectedThemeId) {
      navigate('/results');
    }
  };

  const handleBackToUpload = () => {
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Your Ad Style
        </h1>
        <p className="text-lg text-gray-500 mb-12">
          Select a theme to generate your custom ad
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Product</h3>
            {state.uploadedImage && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <img 
                  src={state.uploadedImage.preview} 
                  alt="Product" 
                  className="w-full max-w-48 h-auto rounded-lg mb-4 object-contain"
                />
                <p className="text-xs text-gray-500 break-all">{state.uploadedImage.name}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    selectedThemeId === theme.id 
                      ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/20' 
                      : 'border-gray-200 hover:border-primary-500'
                  }`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div className="text-2xl mb-3">{theme.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{theme.name}</h3>
                  <p className="text-sm text-gray-500">{theme.description}</p>
                  {selectedThemeId === theme.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button 
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
            onClick={handleBackToUpload}
          >
            ← Back to Upload
          </button>
          <button 
            className={`w-full sm:w-auto px-8 py-3 font-semibold rounded-lg transition-all ${
              selectedThemeId
                ? 'bg-primary-500 hover:bg-primary-600 text-white hover:-translate-y-0.5 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleGenerate}
            disabled={!selectedThemeId}
          >
            ⭐ Generate Ad
          </button>
        </div>
      </div>
    </div>
  );
}