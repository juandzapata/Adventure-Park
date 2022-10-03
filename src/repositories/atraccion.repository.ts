import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Zona, Plan, PlanAtraccion} from '../models';
import {ZonaRepository} from './zona.repository';
import {PlanAtraccionRepository} from './plan-atraccion.repository';
import {PlanRepository} from './plan.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Atraccion.prototype.id>;

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          PlanAtraccion,
          typeof Atraccion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Atraccion, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
