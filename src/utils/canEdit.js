export const canEditTransaction = (createdAt) => {
  const createdTime = new Date(createdAt).getTime();
  const currentTime = Date.now();

  const diffInHours = (currentTime - createdTime) / (1000 * 60 * 60);

  return diffInHours <= 12;
};
