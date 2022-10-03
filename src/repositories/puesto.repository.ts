import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Puesto, PuestoRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class PuestoRepository extends DefaultCrudRepository<
  Puesto,
  typeof Puesto.prototype.id,
  PuestoRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Puesto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Puesto, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
