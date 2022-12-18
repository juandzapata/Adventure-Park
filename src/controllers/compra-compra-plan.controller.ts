import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Compra,
  CompraPlan,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraCompraPlanController {
  constructor(
    @repository(CompraRepository) protected compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'Array of Compra has many CompraPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompraPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CompraPlan>,
  ): Promise<CompraPlan[]> {
    return this.compraRepository.compraPlanes(id).find(filter);
  }

  @post('/compras/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'Compra model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompraPlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Compra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {
            title: 'NewCompraPlanInCompra',
            exclude: ['id'],
            optional: ['compraId']
          }),
        },
      },
    }) compraPlan: Omit<CompraPlan, 'id'>,
  ): Promise<CompraPlan> {
    return this.compraRepository.compraPlanes(id).create(compraPlan);
  }

  @patch('/compras/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'Compra.CompraPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {partial: true}),
        },
      },
    })
    compraPlan: Partial<CompraPlan>,
    @param.query.object('where', getWhereSchemaFor(CompraPlan)) where?: Where<CompraPlan>,
  ): Promise<Count> {
    return this.compraRepository.compraPlanes(id).patch(compraPlan, where);
  }

  @del('/compras/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'Compra.CompraPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CompraPlan)) where?: Where<CompraPlan>,
  ): Promise<Count> {
    return this.compraRepository.compraPlanes(id).delete(where);
  }
}
