import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, CompraPlan, Plan, PlanAtraccion, PlanAtraccionRelations} from '../models';
import {AtraccionRepository} from './atraccion.repository';
import {CompraPlanRepository} from './compra-plan.repository';
import {PlanRepository} from './plan.repository';

export class PlanAtraccionRepository extends DefaultCrudRepository<
  PlanAtraccion,
  typeof PlanAtraccion.prototype.id,
  PlanAtraccionRelations
> {

  public readonly planes: BelongsToAccessor<Plan, typeof PlanAtraccion.prototype.id>;

  public readonly atracciones: BelongsToAccessor<Atraccion, typeof PlanAtraccion.prototype.id>;

  public readonly compraPlanes: HasManyRepositoryFactory<CompraPlan, typeof PlanAtraccion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('CompraPlanRepository') protected compraPlanRepositoryGetter: Getter<CompraPlanRepository>,
  ) {
    super(PlanAtraccion, dataSource);
    this.compraPlanes = this.createHasManyRepositoryFactoryFor('compraPlanes', compraPlanRepositoryGetter,);
    this.registerInclusionResolver('compraPlanes', this.compraPlanes.inclusionResolver);
    this.atracciones = this.createBelongsToAccessorFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.planes = this.createBelongsToAccessorFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
