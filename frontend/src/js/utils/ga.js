export const sendGAEvent = (action, params = {}) => {
  if (!window.gtag) return;
  window.gtag("event", action, params);
};