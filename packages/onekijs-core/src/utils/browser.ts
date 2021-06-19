export function isMobile(): boolean {
  return (
    (navigator.userAgent.match(/Android/i) !== null ||
      navigator.userAgent.match(/webOS/i) !== null ||
      navigator.userAgent.match(/iPhone/i) !== null ||
      navigator.userAgent.match(/iPad/i) !== null ||
      navigator.userAgent.match(/iPod/i) !== null ||
      navigator.userAgent.match(/BlackBerry/i) !== null ||
      navigator.userAgent.match(/Windows Phone/i)) !== null
  );
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
