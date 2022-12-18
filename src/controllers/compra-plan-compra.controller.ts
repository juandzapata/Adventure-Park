import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CompraPlan,
  Compra,
} from '../models';
import {CompraPlanRepository} from '../repositories';

export class CompraPlanCompraController {
  constructor(
    @repository(CompraPlanRepository)
    public compraPlanRepository: CompraPlanRepository,
  ) { }

  @get('/compra-plans/{id}/compra', {
    responses: {
      '200': {
        description: 'Compra belonging to CompraPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compra)},
          },
        },
      },
    },
  })
  async getCompra(
    @param.path.number('id') id: typeof CompraPlan.prototype.id,
  ): Promise<Compra> {
    return this.compraPlanRepository.compra(id);
  }
}
