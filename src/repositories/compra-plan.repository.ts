import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {CompraPlan, CompraPlanRelations, Compra, PlanAtraccion} from '../models';
import {CompraRepository} from './compra.repository';
import {PlanAtraccionRepository} from './plan-atraccion.repository';

export class CompraPlanRepository extends DefaultCrudRepository<
  CompraPlan,
  typeof CompraPlan.prototype.id,
  CompraPlanRelations
> {

  public readonly compra: BelongsToAccessor<Compra, typeof CompraPlan.prototype.id>;

  public readonly planAtraccion: BelongsToAccessor<PlanAtraccion, typeof CompraPlan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>,
  ) {
    super(CompraPlan, dataSource);
    this.planAtraccion = this.createBelongsToAccessorFor('planAtraccion', planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('planAtraccion', this.planAtraccion.inclusionResolver);
    this.compra = this.createBelongsToAccessorFor('compra', compraRepositoryGetter,);
    this.registerInclusionResolver('compra', this.compra.inclusionResolver);
  }
}
