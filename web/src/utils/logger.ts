import { environment } from '../environments/environment';

const isProduction: boolean = environment.production;

export const logger = {
  info(message) {
    console.log(message);
  },
  debug(message) {
    if (isProduction) {
      return;
    }
    console.log(message);
  },
  error(error) {
    console.error(error);
  }
};
