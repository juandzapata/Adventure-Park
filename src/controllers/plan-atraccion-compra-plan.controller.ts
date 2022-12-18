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
  PlanAtraccion,
  CompraPlan,
} from '../models';
import {PlanAtraccionRepository} from '../repositories';

export class PlanAtraccionCompraPlanController {
  constructor(
    @repository(PlanAtraccionRepository) protected planAtraccionRepository: PlanAtraccionRepository,
  ) { }

  @get('/plan-atraccions/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'Array of PlanAtraccion has many CompraPlan',
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
    return this.planAtraccionRepository.compraPlanes(id).find(filter);
  }

  @post('/plan-atraccions/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'PlanAtraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompraPlan)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PlanAtraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraPlan, {
            title: 'NewCompraPlanInPlanAtraccion',
            exclude: ['id'],
            optional: ['planAtraccionId']
          }),
        },
      },
    }) compraPlan: Omit<CompraPlan, 'id'>,
  ): Promise<CompraPlan> {
    return this.planAtraccionRepository.compraPlanes(id).create(compraPlan);
  }

  @patch('/plan-atraccions/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'PlanAtraccion.CompraPlan PATCH success count',
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
    return this.planAtraccionRepository.compraPlanes(id).patch(compraPlan, where);
  }

  @del('/plan-atraccions/{id}/compra-plans', {
    responses: {
      '200': {
        description: 'PlanAtraccion.CompraPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CompraPlan)) where?: Where<CompraPlan>,
  ): Promise<Count> {
    return this.planAtraccionRepository.compraPlanes(id).delete(where);
  }
}
