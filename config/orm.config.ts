import { dataSource as local } from './orm.config.local';
import { dataSource as prod } from './orm.config.prod';

export default process.env.NODE_ENV === 'production' ? prod : local;
