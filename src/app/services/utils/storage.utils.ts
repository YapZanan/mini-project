export function isSessionAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  } catch (error) {
    console.warn('Session storage not available:', error);
    return false;
  }
}
