import type { GeneratedAd } from '../types';

const STORAGE_KEYS = {
  API_KEY: 'adgenie_api_key',
  AD_HISTORY: 'adgenie_ad_history',
} as const;

const MAX_HISTORY_ITEMS = 20; // Limit to prevent storage bloat

export const storageUtils = {
  // API Key management
  saveApiKey: (apiKey: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    } catch (error) {
      console.error('Failed to save API key:', error);
    }
  },

  getApiKey: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
      console.error('Failed to get API key:', error);
      return null;
    }
  },

  removeApiKey: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    } catch (error) {
      console.error('Failed to remove API key:', error);
    }
  },

  // Ad History management
  saveAdHistory: (adHistory: GeneratedAd[]): void => {
    try {
      // Limit history to prevent storage bloat
      const limitedHistory = adHistory.slice(-MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEYS.AD_HISTORY, JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Failed to save ad history:', error);
    }
  },

  getAdHistory: (): GeneratedAd[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AD_HISTORY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to get ad history:', error);
      return [];
    }
  },

  addToAdHistory: (ad: GeneratedAd): void => {
    try {
      const currentHistory = storageUtils.getAdHistory();
      const updatedHistory = [...currentHistory, ad];
      storageUtils.saveAdHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to add to ad history:', error);
    }
  },

  clearAdHistory: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AD_HISTORY);
    } catch (error) {
      console.error('Failed to clear ad history:', error);
    }
  },

  // Clear all settings
  clearApiSettings: (): void => {
    storageUtils.removeApiKey();
  },

  // Clear all app data
  clearAllData: (): void => {
    storageUtils.removeApiKey();
    storageUtils.clearAdHistory();
  },
};