import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Zona, PlanAtraccion} from '../models';
import {PlanAtraccionRepository} from './plan-atraccion.repository';
import {PlanRepository} from './plan.repository';
import {ZonaRepository} from './zona.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {
  public readonly zona: BelongsToAccessor<Zona, typeof Atraccion.prototype.id>;

  public readonly planAtraccions: HasManyRepositoryFactory<PlanAtraccion, typeof Atraccion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('ZonaRepository')
    protected zonaRepositoryGetter: Getter<ZonaRepository>,
    @repository.getter('PlanAtraccionRepository')
    protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>,
    @repository.getter('PlanRepository')
    protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Atraccion, dataSource);
    this.planAtraccions = this.createHasManyRepositoryFactoryFor('planAtraccions', planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('planAtraccions', this.planAtraccions.inclusionResolver);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
