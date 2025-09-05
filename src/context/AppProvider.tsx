import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
import { AppContext } from './AppContext';
import { storageUtils } from '../utils/storage';
import type { AppState, UploadedImage, AdTheme, GeneratedAd } from '../types';

type AppAction = 
  | { type: 'SET_UPLOADED_IMAGE'; payload: UploadedImage | null }
  | { type: 'SET_SELECTED_THEME'; payload: AdTheme | null }
  | { type: 'SET_GENERATED_ADS'; payload: GeneratedAd[] }
  | { type: 'SET_IS_GENERATING'; payload: boolean }
  | { type: 'ADD_TO_HISTORY'; payload: GeneratedAd }
  | { type: 'LOAD_HISTORY'; payload: GeneratedAd[] }
  | { type: 'RESET_APP' };

const initialState: AppState = {
  uploadedImage: null,
  selectedTheme: null,
  generatedAds: [],
  isGenerating: false,
  adHistory: [],
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
    case 'ADD_TO_HISTORY':
      return { ...state, adHistory: [...state.adHistory, action.payload] };
    case 'LOAD_HISTORY':
      return { ...state, adHistory: action.payload };
    case 'RESET_APP':
      return { ...state, uploadedImage: null, selectedTheme: null, generatedAds: [], isGenerating: false };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load ad history from localStorage on mount
  useEffect(() => {
    const savedHistory = storageUtils.getAdHistory();
    if (savedHistory.length > 0) {
      dispatch({ type: 'LOAD_HISTORY', payload: savedHistory });
    }
  }, []);

  // Save ad history to localStorage whenever it changes
  useEffect(() => {
    if (state.adHistory.length > 0) {
      storageUtils.saveAdHistory(state.adHistory);
    }
  }, [state.adHistory]);

  const setUploadedImage = useCallback((image: UploadedImage | null) => {
    dispatch({ type: 'SET_UPLOADED_IMAGE', payload: image });
  }, []);

  const setSelectedTheme = useCallback((theme: AdTheme | null) => {
    dispatch({ type: 'SET_SELECTED_THEME', payload: theme });
  }, []);

  const setGeneratedAds = useCallback((ads: GeneratedAd[]) => {
    dispatch({ type: 'SET_GENERATED_ADS', payload: ads });
  }, []);

  const setIsGenerating = useCallback((generating: boolean) => {
    dispatch({ type: 'SET_IS_GENERATING', payload: generating });
  }, []);

  const addToHistory = useCallback((ad: GeneratedAd) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: ad });
  }, []);

  const resetApp = useCallback(() => {
    dispatch({ type: 'RESET_APP' });
  }, []);

  const contextValue = useMemo(() => ({
    state,
    setUploadedImage,
    setSelectedTheme,
    setGeneratedAds,
    setIsGenerating,
    addToHistory,
    resetApp,
  }), [state, setUploadedImage, setSelectedTheme, setGeneratedAds, setIsGenerating, addToHistory, resetApp]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}