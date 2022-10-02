import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Usuarioplan, UsuarioplanRelations} from '../models';

export class UsuarioplanRepository extends DefaultCrudRepository<
  Usuarioplan,
  typeof Usuarioplan.prototype.id,
  UsuarioplanRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Usuarioplan, dataSource);
  }
}
