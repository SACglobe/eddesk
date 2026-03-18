'use client'

/**
 * Utility for client-side rate limiting of contact form submissions.
 * Stores data in localStorage to persist across page reloads.
 */

interface RateLimitRecord {
  date: string;   // 'YYYY-MM-DD'
  count: number;  // 0–5
}

const STORAGE_KEY = 'eddesk_contact_submissions';
const MAX_SUBMISSIONS_PER_DAY = 5;

/**
 * Checks if the user can submit a new contact enquiry.
 * Limit is 5 submissions per calendar day per browser.
 */
export function canSubmitContactForm(): boolean {
  if (typeof window === 'undefined') return true; // Fail open for SSR

  try {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) return true;

    const record: RateLimitRecord = JSON.parse(stored);
    
    // If it's a new day, reset the count
    if (record.date !== today) {
      return true;
    }

    return record.count < MAX_SUBMISSIONS_PER_DAY;
  } catch (error) {
    console.error('[contactRateLimit] Error reading from localStorage:', error);
    return true; // Fail open if localStorage is unavailable
  }
}

/**
 * Records a successful contact submission in localStorage.
 * Increments the count for the current day.
 */
export function recordContactSubmission(): void {
  if (typeof window === 'undefined') return;

  try {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(STORAGE_KEY);
    let record: RateLimitRecord;

    if (stored) {
      try {
        record = JSON.parse(stored);
        if (record.date === today) {
          record.count += 1;
        } else {
          record.date = today;
          record.count = 1;
        }
      } catch {
        // Handle corrupted localStorage data
        record = { date: today, count: 1 };
      }
    } else {
      record = { date: today, count: 1 };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch (error) {
    console.error('[contactRateLimit] Error writing to localStorage:', error);
  }
}

/**
 * Returns the number of remaining submissions allowed for today.
 */
export function getRemainingSubmissions(): number {
  if (typeof window === 'undefined') return MAX_SUBMISSIONS_PER_DAY;

  try {
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) return MAX_SUBMISSIONS_PER_DAY;

    const record: RateLimitRecord = JSON.parse(stored);
    
    if (record.date !== today) {
      return MAX_SUBMISSIONS_PER_DAY;
    }

    return Math.max(0, MAX_SUBMISSIONS_PER_DAY - record.count);
  } catch (error) {
    return 0;
  }
}
