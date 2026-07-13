// Security utilities

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Sanitize input by removing dangerous characters (for storage)
export function sanitizeForStorage(input: string): string {
  return input.replace(/[<>'"&]/g, "");
}

// Sanitize phone number - keep only digits, +, -, spaces, parentheses
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\-\s()]/g, "");
}

// Validate phone number (Russian format)
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?7[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
