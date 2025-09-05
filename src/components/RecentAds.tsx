import { Download, History } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { downloadImage } from '../utils/download';
import type { GeneratedAd } from '../types';

export function RecentAds() {
  const { state } = useAppContext();
  
  const handleDownload = async (ad: GeneratedAd) => {
    const filename = `ad-${ad.theme.toLowerCase().replace(/\s+/g, '-')}-${ad.id}.jpg`;
    try {
      await downloadImage(ad.imageUrl, filename);
    } catch {
      alert('Failed to download ad. Please try again.');
    }
  };

  if (state.adHistory.length === 0) {
    return null;
  }

  // Show last 3 ads
  const recentAds = state.adHistory.slice(-3).reverse();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <History className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Recent Ads</h3>
      </div>
      
      <div className="space-y-3">
        {recentAds.map((ad) => (
          <div 
            key={ad.id} 
            className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:bg-white/80 transition-colors"
          >
            <img 
              src={ad.imageUrl} 
              alt={`${ad.theme} ad`} 
              className="w-12 h-12 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm truncate">{ad.theme}</p>
              <p className="text-xs text-gray-500">Generated ad</p>
            </div>
            <button
              onClick={() => handleDownload(ad)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}