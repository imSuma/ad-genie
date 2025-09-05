import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppProvider';
import { Header } from './components/Header';
import { UploadScreen } from './components/UploadScreen';
import { ThemeSelection } from './components/ThemeSelection';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 py-8">
            <Routes>
              <Route path="/" element={<UploadScreen />} />
              <Route path="/themes" element={<ThemeSelection />} />
              <Route path="/results" element={<ResultsScreen />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
