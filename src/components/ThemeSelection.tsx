import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, Minimize2, TreePine, Crown, Briefcase, Leaf, Sun, Zap, Tag } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import type { AdTheme } from '../types';

const themes: AdTheme[] = [
  { id: 'minimalist', name: 'Minimalist', description: 'Clean & simple', icon: 'minimalist' },
  { id: 'festive', name: 'Festive', description: 'Holiday vibes', icon: 'festive' },
  { id: 'lifestyle', name: 'Lifestyle', description: 'Real moments', icon: 'lifestyle' },
  { id: 'luxury', name: 'Luxury', description: 'Premium feel', icon: 'luxury' },
  { id: 'office', name: 'Office', description: 'Professional', icon: 'office' },
  { id: 'nature', name: 'Nature', description: 'Organic & natural', icon: 'nature' },
  { id: 'summer', name: 'Summer', description: 'Bright & energetic', icon: 'summer' },
  { id: 'bold', name: 'Bold Colors', description: 'Eye-catching', icon: 'bold' },
  { id: 'sale', name: 'Sale Banner', description: 'Promotional', icon: 'sale' },
];

function getThemeIcon(iconType: string) {
  const iconProps = { className: "w-10 h-10" };
  
  switch (iconType) {
    case 'minimalist':
      return <Minimize2 {...iconProps} />;
    case 'festive':
      return <TreePine {...iconProps} />;
    case 'lifestyle':
      return <Sparkles {...iconProps} />;
    case 'luxury':
      return <Crown {...iconProps} />;
    case 'office':
      return <Briefcase {...iconProps} />;
    case 'nature':
      return <Leaf {...iconProps} />;
    case 'summer':
      return <Sun {...iconProps} />;
    case 'bold':
      return <Zap {...iconProps} />;
    case 'sale':
      return <Tag {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Choose Your Ad Style
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Select a theme to generate your custom ad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Product</h3>
            {state.uploadedImage && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50">
                <img 
                  src={state.uploadedImage.preview} 
                  alt="Product" 
                  className="w-full max-w-48 h-auto rounded-xl mb-4 object-contain shadow-lg"
                />
                <p className="text-sm text-gray-500 break-all font-medium">{state.uploadedImage.name}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`group relative bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl text-center ${
                    selectedThemeId === theme.id 
                      ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-xl shadow-primary-500/30' 
                      : 'border-gray-200 hover:border-primary-500 hover:shadow-xl'
                  }`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div className={`mb-3 flex justify-center transition-all duration-300 ${
                    selectedThemeId === theme.id ? 'text-primary-600 scale-110' : 'text-primary-500 group-hover:scale-110'
                  }`}>
                    {getThemeIcon(theme.icon)}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">{theme.name}</h3>
                  <p className="text-gray-500 text-sm">{theme.description}</p>
                  {selectedThemeId === theme.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-lg mx-auto">
          <button 
            className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-semibold group"
            onClick={handleBackToUpload}
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Upload
          </button>
          <button 
            className={`w-full sm:w-auto px-10 py-4 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group ${
              selectedThemeId
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/30'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleGenerate}
            disabled={!selectedThemeId}
          >
            <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            Generate Ad
          </button>
        </div>
      </div>
    </div>
  );
}