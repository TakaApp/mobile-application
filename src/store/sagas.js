import searchSagas from '@/domains/search/sagas';
import errorSagas from '@/domains/error/sagas';

export default [...searchSagas, ...errorSagas];
