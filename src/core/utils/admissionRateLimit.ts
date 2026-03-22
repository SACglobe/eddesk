/**
 * Client-side rate limiting for admission submissions using localStorage.
 * Limits users to 5 submissions per day per device.
 */

export const checkAdmissionLimit = (): { allowed: boolean; remaining: number } => {
  if (typeof window === 'undefined') return { allowed: true, remaining: 5 };

  const LIMIT = 5;
  const key = 'admission_submissions_client';
  const today = new Date().toISOString().split('T')[0];

  try {
    const data = localStorage.getItem(key);
    let submissions = data ? JSON.parse(data) : { date: today, count: 0 };

    if (submissions.date !== today) {
      submissions = { date: today, count: 0 };
    }

    return {
      allowed: submissions.count < LIMIT,
      remaining: Math.max(0, LIMIT - submissions.count)
    };
  } catch (e) {
    // Fallback if localStorage is disabled or corrupted
    return { allowed: true, remaining: 1 };
  }
};

export const incrementAdmissionLimit = () => {
  if (typeof window === 'undefined') return;

  const key = 'admission_submissions_client';
  const today = new Date().toISOString().split('T')[0];

  try {
    const data = localStorage.getItem(key);
    let submissions = data ? JSON.parse(data) : { date: today, count: 0 };

    if (submissions.date !== today) {
      submissions = { date: today, count: 0 };
    }

    submissions.count += 1;
    localStorage.setItem(key, JSON.stringify(submissions));
  } catch (e) {
    // Ignore silenty
  }
};
