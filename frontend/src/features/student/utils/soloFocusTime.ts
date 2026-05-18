export const getTodayDate = () => new Date().toISOString().slice(0, 10);

export const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return date.toISOString().slice(0, 10);
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getWeekKey = (date = new Date()) => {
  const copiedDate = new Date(date);
  copiedDate.setHours(0, 0, 0, 0);

  const day = copiedDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + mondayOffset);

  return copiedDate.toISOString().slice(0, 10);
};

export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
};