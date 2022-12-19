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
  Atraccion,
  PlanAtraccion,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionPlanAtraccionController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many PlanAtraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanAtraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PlanAtraccion>,
  ): Promise<PlanAtraccion[]> {
    return this.atraccionRepository.planAtraccions(id).find(filter);
  }

  @post('/atraccions/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlanAtraccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {
            title: 'NewPlanAtraccionInAtraccion',
            exclude: ['id'],
            optional: ['atraccionId']
          }),
        },
      },
    }) planAtraccion: Omit<PlanAtraccion, 'id'>,
  ): Promise<PlanAtraccion> {
    return this.atraccionRepository.planAtraccions(id).create(planAtraccion);
  }

  @patch('/atraccions/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Atraccion.PlanAtraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {partial: true}),
        },
      },
    })
    planAtraccion: Partial<PlanAtraccion>,
    @param.query.object('where', getWhereSchemaFor(PlanAtraccion)) where?: Where<PlanAtraccion>,
  ): Promise<Count> {
    return this.atraccionRepository.planAtraccions(id).patch(planAtraccion, where);
  }

  @del('/atraccions/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Atraccion.PlanAtraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlanAtraccion)) where?: Where<PlanAtraccion>,
  ): Promise<Count> {
    return this.atraccionRepository.planAtraccions(id).delete(where);
  }
}
