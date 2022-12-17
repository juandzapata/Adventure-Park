import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parque,
  Categoria,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueCategoriaController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async getCategoria(
    @param.path.number('id') id: typeof Parque.prototype.id,
  ): Promise<Categoria> {
    return this.parqueRepository.categoria(id);
  }
}
