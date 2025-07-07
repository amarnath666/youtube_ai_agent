export function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor;
  // Common patterns for in-app browsers:
  return /FBAN|FBAV|Instagram|LinkedInApp|Line|WebView|wv/.test(ua);
}
