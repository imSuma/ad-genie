export interface UploadedImage {
  file: File;
  preview: string;
  name: string;
  size: number;
}

export interface AdTheme {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface GeneratedAd {
  id: string;
  imageUrl: string;
  theme: string;
  downloadUrl?: string;
}

export interface AppState {
  uploadedImage: UploadedImage | null;
  selectedTheme: AdTheme | null;
  generatedAds: GeneratedAd[];
  isGenerating: boolean;
  adHistory: GeneratedAd[];
}