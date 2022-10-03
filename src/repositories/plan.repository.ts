import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Compra, CompraPlan, Atraccion, PlanAtraccion} from '../models';
import {CompraPlanRepository} from './compra-plan.repository';
import {CompraRepository} from './compra.repository';
import {PlanAtraccionRepository} from './plan-atraccion.repository';
import {AtraccionRepository} from './atraccion.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly compras: HasManyThroughRepositoryFactory<Compra, typeof Compra.prototype.id,
          CompraPlan,
          typeof Plan.prototype.id
        >;

  public readonly atracciones: HasManyThroughRepositoryFactory<Atraccion, typeof Atraccion.prototype.id,
          PlanAtraccion,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CompraPlanRepository') protected compraPlanRepositoryGetter: Getter<CompraPlanRepository>, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>, @repository.getter('PlanAtraccionRepository') protected planAtraccionRepositoryGetter: Getter<PlanAtraccionRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Plan, dataSource);
    this.atracciones = this.createHasManyThroughRepositoryFactoryFor('atracciones', atraccionRepositoryGetter, planAtraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.compras = this.createHasManyThroughRepositoryFactoryFor('compras', compraRepositoryGetter, compraPlanRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
