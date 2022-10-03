import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Compra, CompraRelations, Usuario, Plan, CompraPlan} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {CompraPlanRepository} from './compra-plan.repository';
import {PlanRepository} from './plan.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Compra.prototype.id>;

  public readonly planes: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          CompraPlan,
          typeof Compra.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('CompraPlanRepository') protected compraPlanRepositoryGetter: Getter<CompraPlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Compra, dataSource);
    this.planes = this.createHasManyThroughRepositoryFactoryFor('planes', planRepositoryGetter, compraPlanRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
