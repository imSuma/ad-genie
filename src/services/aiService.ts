import type { AdTheme, UploadedImage, GeneratedAd } from '../types';
import { storageUtils } from '../utils/storage';

interface AIGenerationRequest {
  image: UploadedImage;
  theme: AdTheme;
}

class AIService {
  private getApiKey(): string | null {
    return storageUtils.getApiKey() || null;
  }

  async generateAd(request: AIGenerationRequest): Promise<GeneratedAd> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('AI API key not configured. Please configure it in Settings.');
    }

    try {
      // Convert uploaded image to base64 to understand the product
      const base64Image = await this.fileToBase64(request.image.file);
      
      // Create a detailed prompt for ad generation based on the theme
      const adPrompt = this.generateAdPrompt(request.theme);
      
      // Use Gemini 2.5 Flash Image for image generation
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent',
        {
          method: 'POST',
          headers: {
            'x-goog-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {
                  text: adPrompt
                },
                {
                  inlineData: {
                    mimeType: request.image.file.type,
                    data: base64Image
                  }
                }
              ]
            }],
            generationConfig: {
              temperature: 0.8,
              topP: 0.95,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      // Extract the generated image from the response
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const imagePart = data.candidates[0].content.parts.find((part: { inlineData?: { data: string; mimeType?: string } }) => part.inlineData);
        
        if (imagePart && imagePart.inlineData && imagePart.inlineData.data) {
          const imageBase64 = imagePart.inlineData.data;
          const mimeType = imagePart.inlineData.mimeType || 'image/png';
          const dataUrl = `data:${mimeType};base64,${imageBase64}`;
          
          return {
            id: Date.now().toString(),
            imageUrl: dataUrl,
            theme: request.theme.name,
          };
        }
      }
      
      // If no image is returned, throw an error
      throw new Error('No image generated in API response');
      
    } catch (error) {
      console.error('AI generation error:', error);
      throw error;
    }
  }

  private generateAdPrompt(theme: AdTheme): string {
    const basePrompt = `Create a professional advertisement image featuring the product shown in the reference image. `;
    
    const themePrompts = {
      minimalist: `Use a clean, minimalist design with lots of white space, simple typography, and focus on the product itself. The composition should be elegant and uncluttered with subtle shadows and neutral colors.`,
      festive: `Create a festive, holiday-themed advertisement with warm colors, seasonal decorations, and a celebratory atmosphere. Include elements that evoke joy and celebration while highlighting the product.`,
      lifestyle: `Show the product in a real-life scenario with people or lifestyle context. Create a relatable, authentic scene that demonstrates how the product fits into everyday life with natural lighting and genuine moments.`,
      luxury: `Design a premium, luxurious advertisement with elegant styling, rich colors, sophisticated typography, and high-end aesthetics. The image should convey exclusivity and premium quality.`,
      office: `Present the product in a professional office or business environment. Use clean, corporate aesthetics with modern office elements and professional styling that appeals to business users.`,
      nature: `Incorporate natural elements, organic textures, and earthy tones. Show the product in harmony with nature, using natural lighting and environmentally conscious themes.`,
      summer: `Create a bright, energetic summer-themed advertisement with vibrant colors, sunny atmosphere, and elements that evoke warmth, vacation, and outdoor activities.`,
      bold: `Use striking, eye-catching colors and dynamic composition. Create a high-impact visual with bold contrasts, dramatic lighting, and attention-grabbing design elements.`,
      sale: `Design a promotional advertisement with clear sale messaging, urgency elements, and compelling visual cues that encourage immediate purchase. Include dynamic elements that convey value and savings.`
    };

    const themeInstruction = themePrompts[theme.id as keyof typeof themePrompts] || themePrompts.lifestyle;
    
    return `${basePrompt}${themeInstruction} The advertisement should be suitable for digital marketing use, with high visual impact and professional quality. Make sure the product is clearly visible and prominently featured. Create an image that would be perfect for social media advertising or e-commerce marketing.`;
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