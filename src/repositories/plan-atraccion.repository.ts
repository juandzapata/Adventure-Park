import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PlanAtraccion, PlanAtraccionRelations, Plan, Atraccion} from '../models';
import {PlanRepository} from './plan.repository';
import {AtraccionRepository} from './atraccion.repository';

export class PlanAtraccionRepository extends DefaultCrudRepository<
  PlanAtraccion,
  typeof PlanAtraccion.prototype.id,
  PlanAtraccionRelations
> {

  public readonly planes: BelongsToAccessor<Plan, typeof PlanAtraccion.prototype.id>;

  public readonly atracciones: BelongsToAccessor<Atraccion, typeof PlanAtraccion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(PlanAtraccion, dataSource);
    this.atracciones = this.createBelongsToAccessorFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.planes = this.createBelongsToAccessorFor('planes', planRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
