/**
 * ============================================================================
 * UTILITY HELPERS
 * ============================================================================
 * 
 * Platform-agnostic utility functions used throughout the app.
 * 
 * @migration-note: All functions are ready for React Native - no DOM dependencies
 */

/**
 * Get a time-based greeting message
 * 
 * @example
 * ```tsx
 * const greeting = getGreeting(); // "Good afternoon"
 * ```
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/**
 * Format a relative time string (e.g., "2h ago", "Just now")
 * 
 * @param date - The date to format
 * @returns Formatted relative time string
 * 
 * @example
 * ```tsx
 * const time = formatRelativeTime(new Date(Date.now() - 3600000)); // "1h ago"
 * ```
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

/**
 * Truncate text to a maximum length with ellipsis
 * 
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters
 * @returns Truncated text with "..." if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Generate a unique ID
 * 
 * @returns A unique string ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate an email address format
 * 
 * @param email - The email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize the first letter of a string
 * 
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get initials from a name (e.g., "Sarah Johnson" -> "SJ")
 * 
 * @param name - Full name
 * @param maxInitials - Maximum number of initials (default 2)
 * @returns Initials string
 */
export function getInitials(name: string, maxInitials = 2): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, maxInitials)
    .map(part => part[0].toUpperCase())
    .join("");
}

/**
 * Format a currency value
 * 
 * @param amount - The amount to format
 * @param currency - Currency code (default "USD")
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Debounce a function call
 * 
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
