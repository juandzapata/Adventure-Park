import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Puesto, PuestoRelations} from '../models';

export class PuestoRepository extends DefaultCrudRepository<
  Puesto,
  typeof Puesto.prototype.id,
  PuestoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Puesto, dataSource);
  }
}
