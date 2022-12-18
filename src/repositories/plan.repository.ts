import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, Plan, PlanAtraccion, PlanRelations} from '../models';
import {AtraccionRepository} from './atraccion.repository';
import {CompraRepository} from './compra.repository';
import {PlanAtraccionRepository} from './plan-atraccion.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly atracciones: HasManyThroughRepositoryFactory<Atraccion, typeof Atraccion.prototype.id,
    PlanAtraccion,
    typeof Plan.prototype.id
  >;

  public readonly planAtracciones: HasManyRepositoryFactory<PlanAtraccion, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Plan, dataSource);
    this.planAtracciones = this.createHasManyRepositoryFactoryFor('planAtracciones', planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('planAtracciones', this.planAtracciones.inclusionResolver);
    this.atracciones = this.createHasManyThroughRepositoryFactoryFor('atracciones', atraccionRepositoryGetter, planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
  }
}
