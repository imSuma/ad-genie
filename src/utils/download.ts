export const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image');
  }
};

export const downloadMultipleImages = async (images: Array<{ url: string; filename: string }>) => {
  const promises = images.map(({ url, filename }) => 
    downloadImage(url, filename)
  );
  
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Error downloading multiple images:', error);
    throw new Error('Failed to download some images');
  }
};