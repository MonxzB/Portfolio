// IMPORTANT: Configure these in your environment variables.
// You can find these in your Cloudinary dashboard.
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dqwomkvxi';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'portfolio_preset';

if (CLOUDINARY_CLOUD_NAME === 'dqwomkvxi' || CLOUDINARY_UPLOAD_PRESET === 'your-upload-preset') {
    console.warn("Cloudinary is not configured. Please update your environment variables.");
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Image upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', (error as Error).message || error);
    throw error;
  }
};

/**
 * Applies Cloudinary transformations for optimization.
 * f_auto: Automatically selects the best image format (e.g., WebP).
 * q_auto: Automatically adjusts the quality to balance file size and visual fidelity.
 */
export const getOptimizedCloudinaryUrl = (
    url: string, 
    options: { width?: number; height?: number } = {}
): string => {
    if (!url || !url.includes('res.cloudinary.com')) {
        return url; // Return original URL if it's not a Cloudinary URL or is null/undefined
    }

    const transformations = ['f_auto', 'q_auto'];
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height},c_fill`);


    const urlParts = url.split('/upload/');
    if (urlParts.length !== 2) {
        return url; // Invalid Cloudinary URL structure
    }

    return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
};