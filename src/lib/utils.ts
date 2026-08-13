/**
 * Calculate estimated reading time for a blog post
 * @param content - The markdown content of the post
 * @param wordsPerMinute - Reading speed (default: 200 wpm for technical content)
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  // Remove code blocks and inline code for more accurate count
  const textContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove image markdown
    .replace(/\[[^\]]*\]\([^)]*\)/g, '') // Remove link markdown
    .replace(/^[#\-*=>|]+/gm, '') // Remove markdown symbols
    .trim();
  
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Extract headings from markdown content for Table of Contents
 * @param content - The markdown content
 * @returns Array of headings with depth, slug, and text
 */
export function extractHeadings(content: string): Array<{
  depth: number;
  slug: string;
  text: string;
}> {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: Array<{ depth: number; slug: string; text: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    headings.push({ depth, slug, text });
  }
  
  return headings;
}

/**
 * Format date for display
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options);
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number, suffix: string = '...'): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + suffix;
}

/**
 * Generate excerpt from markdown content
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')
    .replace(/^[#\-*=>|]+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  return truncate(plainText, maxLength);
}
