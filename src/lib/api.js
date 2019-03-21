export const getPeripheral = (item) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        monitor: () => resolve({ item, count: 23 }),
        laptop: () => resolve({ item, count: 0 }),
        mouse: () => reject('NOPE')
      };

      res[item] ? res[item]() : reject('NOPE');
    }, 500);
  });

export const getTicket = (ticket) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        '200': () => resolve({ ticket, item: 'monitor', pinged: true }),
        '202': () => resolve({ ticket, item: 'monitor', pinged: false }),
        '400': () => resolve({ ticket, item: null }),
        '500': () => reject('NOPE')
      };

      res[ticket] ? res[ticket]() : reject('NOPE');
    }, 500);
  });
