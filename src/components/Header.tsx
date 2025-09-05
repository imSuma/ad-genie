export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">AdGenie</h1>
            <p className="text-sm text-gray-500 m-0">Transform your product photos into stunning ads</p>
          </div>
        </div>
      </div>
    </header>
  );
}