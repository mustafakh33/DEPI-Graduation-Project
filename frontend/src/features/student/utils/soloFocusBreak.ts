const MIN_AUTO_BREAK_DELAY_MS = 60 * 60 * 1000;
const MAX_AUTO_BREAK_DELAY_MS = 3 * 60 * 60 * 1000;

export const getRandomAutoBreakDelay = () => {
  return Math.floor(
    Math.random() * (MAX_AUTO_BREAK_DELAY_MS - MIN_AUTO_BREAK_DELAY_MS + 1) +
      MIN_AUTO_BREAK_DELAY_MS
  );
};