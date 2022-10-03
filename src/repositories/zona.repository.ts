import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, Parque, Puesto, Atraccion} from '../models';
import {ParqueRepository} from './parque.repository';
import {PuestoRepository} from './puesto.repository';
import {AtraccionRepository} from './atraccion.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly parque: BelongsToAccessor<Parque, typeof Zona.prototype.id>;

  public readonly puestos: HasManyRepositoryFactory<Puesto, typeof Zona.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('PuestoRepository') protected puestoRepositoryGetter: Getter<PuestoRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Zona, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.puestos = this.createHasManyRepositoryFactoryFor('puestos', puestoRepositoryGetter,);
    this.registerInclusionResolver('puestos', this.puestos.inclusionResolver);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
  }
}
