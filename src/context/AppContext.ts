import { createContext } from 'react';
import type { AppState, UploadedImage, AdTheme, GeneratedAd } from '../types';

export interface AppContextType {
  state: AppState;
  setUploadedImage: (image: UploadedImage | null) => void;
  setSelectedTheme: (theme: AdTheme | null) => void;
  setGeneratedAds: (ads: GeneratedAd[]) => void;
  setIsGenerating: (generating: boolean) => void;
  addToHistory: (ad: GeneratedAd) => void;
  resetApp: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);