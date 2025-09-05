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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
            Upload Your Product Photo
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Drop your image below and we'll create a stunning ad for your product using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50">
            {!state.uploadedImage ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer group ${
                  isDragActive 
                    ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 scale-105' 
                    : 'border-gray-300 hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 hover:scale-105'
                }`}>
                  <div className="mb-6">
                    <Upload className={`w-16 h-16 mx-auto transition-all duration-300 ${
                      isDragActive ? 'text-primary-500 scale-110' : 'text-gray-400 group-hover:text-primary-500'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Drag & drop your image</h3>
                  <p className="text-gray-500 text-lg">or click to browse • PNG, JPG, WEBP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="relative text-center border-2 border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-white transition-all duration-300 hover:border-primary-500 hover:shadow-lg group">
                <img 
                  src={state.uploadedImage.preview} 
                  alt="Uploaded product" 
                  className="max-w-full max-h-80 rounded-xl mb-4 mx-auto object-contain shadow-lg"
                />
                <p className="text-lg font-semibold text-gray-800 mb-2">{state.uploadedImage.name}</p>
                <p className="text-sm text-gray-500 mb-0 group-hover:text-primary-600 transition-colors">Click or drag to replace</p>
                <div className="absolute inset-0 cursor-pointer rounded-2xl" {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Ad Generation</h3>
                <p className="text-gray-500 leading-relaxed">Our advanced AI will analyze your product and create a unique ad tailored to your chosen theme and style.</p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Best Practices</h3>
                <ul className="text-gray-500 space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
                    Use high-resolution images (at least 800px width)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
                    Ensure good lighting and clear product visibility
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
                    Plain or simple backgrounds work best
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></span>
                    Square or portrait orientation preferred
                  </li>
                </ul>
              </div>
            </div>

            {state.uploadedImage && (
              <button 
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/30 mt-6 group"
                onClick={handleGenerateAds}
              >
                <Sparkles className="w-5 h-5 inline mr-3 transition-transform duration-300 group-hover:rotate-12" />
                Generate Ad
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}