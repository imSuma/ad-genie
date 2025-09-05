import type { AdTheme, UploadedImage, GeneratedAd } from '../types';

// This is a mock implementation. Replace with actual Google Nano Banana API integration
// when available.

interface AIGenerationRequest {
  image: UploadedImage;
  theme: AdTheme;
}

interface AIGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

class AIService {
  private apiKey: string | null;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_AI_API_KEY || null;
    this.baseUrl = import.meta.env.VITE_AI_API_URL || '';
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

  // Method to integrate with actual Google Nano Banana API
  async generateAdWithNanoBanana(request: AIGenerationRequest): Promise<GeneratedAd> {
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    try {
      // Convert image to base64 for API
      const base64Image = await this.fileToBase64(request.image.file);
      
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          image: base64Image,
          theme: request.theme.id,
          prompt: `Create a ${request.theme.description} style advertisement for this product`,
          style: request.theme.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const result: AIGenerationResponse = await response.json();
      
      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || 'Failed to generate ad');
      }

      return {
        id: Date.now().toString(),
        imageUrl: result.imageUrl,
        theme: request.theme.name,
        downloadUrl: result.imageUrl,
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