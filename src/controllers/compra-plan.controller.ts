import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CompraPlan} from '../models';
import {CompraPlanRepository} from '../repositories';

export class CompraPlanController {
  constructor(
    @repository(CompraPlanRepository)
    public compraPlanRepository : CompraPlanRepository,
  ) {}

  @post('/compra-plan')
  @response(200, {
    description: 'CompraPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompraPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {
            title: 'NewCompraPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    compraPlan: Omit<CompraPlan, 'id'>,
  ): Promise<CompraPlan> {
    return this.compraPlanRepository.create(compraPlan);
  }

  @get('/compra-plan/count')
  @response(200, {
    description: 'CompraPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompraPlan) where?: Where<CompraPlan>,
  ): Promise<Count> {
    return this.compraPlanRepository.count(where);
  }

  @get('/compra-plan')
  @response(200, {
    description: 'Array of CompraPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompraPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompraPlan) filter?: Filter<CompraPlan>,
  ): Promise<CompraPlan[]> {
    return this.compraPlanRepository.find(filter);
  }

  @patch('/compra-plan')
  @response(200, {
    description: 'CompraPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {partial: true}),
        },
      },
    })
    compraPlan: CompraPlan,
    @param.where(CompraPlan) where?: Where<CompraPlan>,
  ): Promise<Count> {
    return this.compraPlanRepository.updateAll(compraPlan, where);
  }

  @get('/compra-plan/{id}')
  @response(200, {
    description: 'CompraPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompraPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CompraPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<CompraPlan>
  ): Promise<CompraPlan> {
    return this.compraPlanRepository.findById(id, filter);
  }

  @patch('/compra-plan/{id}')
  @response(204, {
    description: 'CompraPlan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {partial: true}),
        },
      },
    })
    compraPlan: CompraPlan,
  ): Promise<void> {
    await this.compraPlanRepository.updateById(id, compraPlan);
  }

  @put('/compra-plan/{id}')
  @response(204, {
    description: 'CompraPlan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() compraPlan: CompraPlan,
  ): Promise<void> {
    await this.compraPlanRepository.replaceById(id, compraPlan);
  }

  @del('/compra-plan/{id}')
  @response(204, {
    description: 'CompraPlan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.compraPlanRepository.deleteById(id);
  }
}
