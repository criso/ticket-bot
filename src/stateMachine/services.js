import * as api from '../lib/api';

export const getPeripheral = (ctx) => api.getPeripheral(ctx.query.peripheral);
