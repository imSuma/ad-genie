import type { AdTheme, UploadedImage, GeneratedAd } from '../types';
import { storageUtils } from '../utils/storage';

// This is a mock implementation. Replace with actual Google Nano Banana API integration
// when available.

interface AIGenerationRequest {
  image: UploadedImage;
  theme: AdTheme;
}

class AIService {
  private getApiKey(): string | null {
    // First try to get from local storage, then fall back to env vars
    return storageUtils.getApiKey() || import.meta.env.VITE_AI_API_KEY || null;
  }

  private getBaseUrl(): string {
    return 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  async generateAd(request: AIGenerationRequest): Promise<GeneratedAd> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a single mock ad with a placeholder image that represents the theme
        const mockImageUrl = this.generateMockImage(request.theme);
        
        resolve({
          id: Date.now().toString(),
          imageUrl: mockImageUrl,
          theme: request.theme.name,
        });
      }, 2000); // Simulate API delay
    });
  }

  private generateMockImage(theme: AdTheme): string {
    // Generate different colored placeholder images based on theme
    const colors = {
      minimalist: '9CA3AF', // Gray
      festive: 'EF4444',     // Red
      lifestyle: 'F59E0B',   // Amber
      luxury: '7C3AED',      // Purple
      office: '3B82F6',      // Blue
      nature: '10B981',      // Green
      summer: 'F97316',      // Orange
      bold: 'EC4899',        // Pink
      sale: 'DC2626',        // Red
    };

    const color = colors[theme.id as keyof typeof colors] || '6B7280';
    const width = 600;
    const height = 800;
    
    return `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=${encodeURIComponent(theme.name + ' Ad')}`;
  }

  // Method to integrate with actual Google AI API
  async generateAdWithGoogleAI(request: AIGenerationRequest): Promise<GeneratedAd> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('AI API key not configured. Please configure it in Settings.');
    }

    try {
      // Convert image to base64 for API
      const base64Image = await this.fileToBase64(request.image.file);
      
      const baseUrl = this.getBaseUrl();
      
      // Google AI Studio API call
      const response = await fetch(`${baseUrl}/gemini-pro-vision:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `Create a ${request.theme.description} style advertisement for this product. Generate an image that showcases the product in a ${request.theme.name} theme.`
              },
              {
                inline_data: {
                  mime_type: request.image.file.type,
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      // For now, Google AI Studio doesn't generate images directly
      // This would need to be integrated with an image generation service
      // For demo purposes, we'll return a mock response
      return {
        id: Date.now().toString(),
        imageUrl: this.generateMockImage(request.theme),
        theme: request.theme.name,
        downloadUrl: undefined,
      };
    } catch (error) {
      console.error('AI generation error:', error);
      throw error;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix to get just the base64 string
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  }
}

export const aiService = new AIService();