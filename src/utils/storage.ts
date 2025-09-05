const STORAGE_KEYS = {
  API_KEY: 'adgenie_api_key',
} as const;

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

  // Clear all settings
  clearApiSettings: (): void => {
    storageUtils.removeApiKey();
  },
};