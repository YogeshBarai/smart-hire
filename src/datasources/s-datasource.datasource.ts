import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './s-datasource.datasource.config.json';

export class DatasourcesDataSource extends juggler.DataSource {
  static dataSourceName = 'datasources';

  constructor(
    @inject('datasources.config.datasources', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
