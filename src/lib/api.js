export const getPeripheral = (item) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        monitor: () => resolve({ item, count: 23 }),
        laptop: () => resolve({ item, count: 0 }),
        mouse: () => reject('NOPE')
      };

      res[item]();
    }, 500);
  });
