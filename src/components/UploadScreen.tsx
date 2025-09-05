import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import type { UploadedImage } from '../types';

export function UploadScreen() {
  const navigate = useNavigate();
  const { state, setUploadedImage } = useAppContext();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const uploadedImage: UploadedImage = {
        file,
        preview,
        name: file.name,
        size: file.size,
      };
      setUploadedImage(uploadedImage);
    }
  };

  const handleGenerateAds = () => {
    if (state.uploadedImage) {
      navigate('/themes');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  return (
    <div className="max-w-6xl mx-auto px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Upload Your Product Photo
        </h1>
        <p className="text-lg text-gray-500 mb-12">
          Drop your image below and we'll create a stunning ad for your product using AI
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {!state.uploadedImage ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50'
                }`}>
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Drag & drop your image</h3>
                  <p className="text-sm text-gray-500">or click to browse • PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="relative text-center border-2 border-gray-200 rounded-xl p-8 bg-gray-50 transition-all hover:border-primary-500 hover:bg-primary-50">
                <img 
                  src={state.uploadedImage.preview} 
                  alt="Uploaded product" 
                  className="max-w-full max-h-80 rounded-lg mb-4 mx-auto object-contain"
                />
                <p className="text-sm font-medium text-gray-800 mb-2">{state.uploadedImage.name}</p>
                <p className="text-xs text-gray-500 mb-0">Click or drag to replace</p>
                <div className="absolute inset-0 cursor-pointer rounded-xl" {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Ad Generation</h3>
                <p className="text-sm text-gray-500">Our advanced AI will analyze your product and create a unique ad tailored to your chosen theme and style.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Practices</h3>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Use high-resolution images (at least 800px width)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Ensure good lighting and clear product visibility
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Plain or simple backgrounds work best
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    Square or portrait orientation preferred
                  </li>
                </ul>
              </div>
            </div>

            {state.uploadedImage && (
              <button 
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 mt-4"
                onClick={handleGenerateAds}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Generate Ads
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}