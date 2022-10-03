import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CompraPlan, CompraPlanRelations} from '../models';

export class CompraPlanRepository extends DefaultCrudRepository<
  CompraPlan,
  typeof CompraPlan.prototype.id,
  CompraPlanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CompraPlan, dataSource);
  }
}
