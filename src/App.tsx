import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { Header } from './components/Header';
import { UploadScreen } from './components/UploadScreen';
import { ThemeSelection } from './components/ThemeSelection';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <Header onSettingsClick={() => setIsSettingsOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<UploadScreen onSettingsClick={() => setIsSettingsOpen(true)} />} />
              <Route path="/themes" element={<ThemeSelection />} />
              <Route path="/results" element={<ResultsScreen />} />
            </Routes>
          </main>
          
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onSave={(apiKey) => {
              console.log('API key saved:', apiKey ? 'Configured' : 'Not configured');
              // API key is automatically saved to localStorage by the modal
              // Trigger a storage event to update components
              window.dispatchEvent(new Event('storage'));
            }}
          />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
