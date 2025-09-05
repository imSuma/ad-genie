import React, { useReducer } from 'react';
import { AppContext } from './AppContext';
import type { AppState, UploadedImage, AdTheme, GeneratedAd } from '../types';

type AppAction = 
  | { type: 'SET_UPLOADED_IMAGE'; payload: UploadedImage | null }
  | { type: 'SET_SELECTED_THEME'; payload: AdTheme | null }
  | { type: 'SET_GENERATED_ADS'; payload: GeneratedAd[] }
  | { type: 'SET_IS_GENERATING'; payload: boolean }
  | { type: 'RESET_APP' };

const initialState: AppState = {
  uploadedImage: null,
  selectedTheme: null,
  generatedAds: [],
  isGenerating: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_UPLOADED_IMAGE':
      return { ...state, uploadedImage: action.payload };
    case 'SET_SELECTED_THEME':
      return { ...state, selectedTheme: action.payload };
    case 'SET_GENERATED_ADS':
      return { ...state, generatedAds: action.payload };
    case 'SET_IS_GENERATING':
      return { ...state, isGenerating: action.payload };
    case 'RESET_APP':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUploadedImage = (image: UploadedImage | null) => {
    dispatch({ type: 'SET_UPLOADED_IMAGE', payload: image });
  };

  const setSelectedTheme = (theme: AdTheme | null) => {
    dispatch({ type: 'SET_SELECTED_THEME', payload: theme });
  };

  const setGeneratedAds = (ads: GeneratedAd[]) => {
    dispatch({ type: 'SET_GENERATED_ADS', payload: ads });
  };

  const setIsGenerating = (generating: boolean) => {
    dispatch({ type: 'SET_IS_GENERATING', payload: generating });
  };

  const resetApp = () => {
    dispatch({ type: 'RESET_APP' });
  };

  return (
    <AppContext.Provider value={{
      state,
      setUploadedImage,
      setSelectedTheme,
      setGeneratedAds,
      setIsGenerating,
      resetApp,
    }}>
      {children}
    </AppContext.Provider>
  );
}