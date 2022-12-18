import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Compra, CompraPlan, CompraRelations, Usuario} from '../models';
import {CompraPlanRepository} from './compra-plan.repository';
import {UsuarioRepository} from './usuario.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Compra.prototype.id>;
  public readonly compraPlanes: HasManyRepositoryFactory<CompraPlan, typeof Compra.prototype.id>;


  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('CompraPlanRepository') protected compraPlanRepositoryGetter: Getter<CompraPlanRepository>
  ) {
    super(Compra, dataSource);
    this.compraPlanes = this.createHasManyRepositoryFactoryFor('compraPlanes', compraPlanRepositoryGetter,);
    this.registerInclusionResolver('compraPlanes', this.compraPlanes.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
