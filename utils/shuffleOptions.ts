const MAX_INT32 = 2147483647;

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
};

const createSeededRandom = (seed: number) => {
  let value = seed % MAX_INT32;
  if (value <= 0) {
    value += MAX_INT32 - 1;
  }

  return () => {
    value = (value * 16807) % MAX_INT32;
    return (value - 1) / (MAX_INT32 - 1);
  };
};

export const shuffleOptions = (options: string[], seed: number, salt: string) => {
  const result = [...options];
  const random = createSeededRandom(seed + hashString(salt));

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
