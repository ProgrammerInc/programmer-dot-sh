'use client';

// Helper function to detect if content contains actual HTML tags
// Excludes command-link spans which are handled separately
export const containsHtmlTags = (content: string): boolean => {
  // First check if we see simple HTML indicators
  if (!content.includes('<') || !content.includes('>')) {
    return false;
  }

  // Enhanced regex to better detect HTML tags including custom terminal styling
  // This will detect <strong>, <a>, <span>, <div>, <p>, etc. but still detect terminal-specific classes
  const htmlTagsRegex =
    /<(strong|a|span|em|ul|li|ol|p|div|h[1-6]|br|code|pre|h[1-6])[^>]*>|<\/(strong|a|span|em|ul|li|ol|p|div|h[1-6]|code|pre|h[1-6])>|<(div|span) class="[^"]*-[^"]*">|<\/div>|<\/span>/;

  // Log for debugging
  // console.log(`Checking HTML tags in: ${content.substring(0, 50)}...`);
  const result = htmlTagsRegex.test(content);
  // console.log(`Contains HTML tags: ${result}`);

  return result;
};
