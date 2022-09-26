export function applyBps(sources, imageAspectRatio, isHalfWidth, cropMode) {
  // Theme breakpoints don't quite matchup to what we want, so we need to define custom breakpoints
  const breakpoints = [481, 641, 831, 1024, 1440, 1920];

  // Remove empty array items
  const responsiveSources = [...sources].filter(n => !!n);

  // Array of image breakpoint sizes
  const sizes = [
    278, 308, 342, 375, 422, 481, 519, 576, 641, 704, 768, 831,
    915, 1024, 1126, 1280, 1440, 1678, 1920, 2258,
    2618, 3038, 3524];

  // Empty array to push values into
  const results = [];
  const aspectRatio = imageAspectRatio || null;

  const crop = cropMode === undefined || cropMode === true ? '&crop=faces' : '';

  /**
   * Loop through all the sizes to create responsive srcset
   */
  sizes.forEach((width) => {
    let image = responsiveSources[0];
    let height;
    let calculatedWidth;
    // Art direct photos for mobile
    if (width <= breakpoints[1] && responsiveSources.length > 1) {
      const src = responsiveSources[0];
      image = src;
    } else if (width >= breakpoints[1] && responsiveSources.length > 1) {
      const src = responsiveSources[1];
      image = src;
    }

    // If the image is half browser width on desktop then only render it as large as we need
    if (isHalfWidth && (width >= breakpoints[3])) {
      calculatedWidth = Math.round(width / 2);
    } else {
      calculatedWidth = width;
    }

    // Set a fixed height based on aspect ratio
    if (Array.isArray(aspectRatio)) {
      height = Math.round(aspectRatio[aspectRatio.length - 1] * calculatedWidth);
      breakpoints.some((breakpoint, index) => {
        if (width <= breakpoint) {
          height = Math.round(aspectRatio[index] * calculatedWidth);
          return true;
        }
        return false;
      });
    } else {
      height = Math.round(aspectRatio * width);
    }

    if (image) {
      // Get crop coordinates and add them back if they exist
      const imgixString = new URLSearchParams(image);
      const rectString = imgixString.get('rect');
      const rect = rectString ? `&rect=${rectString}` : '';

      image = image.split('?');

      const src = ` ${image[0]}?auto=compress,format,entropy&w=${calculatedWidth}&h=${height}${rect}&q=90&fit=crop${crop}&dpr=1 1x,`
                + ` ${image[0]}?auto=compress,format,entropy&w=${calculatedWidth}&h=${height}${rect}&q=20&fit=crop${crop}&dpr=2 2x,`
                + ` ${image[0]}?auto=compress,format,entropy&w=${calculatedWidth}&h=${height}${rect}&q=20&fit=crop${crop}&dpr=3 3x`;

      results.push({
        src,
        width,
        isDefault: width === 1024,
      });
    }
  });

  return results;
}
