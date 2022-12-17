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
  Plan,
  PlanAtraccion,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPlanAtraccionController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Array of Plan has many PlanAtraccion',
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
    return this.planRepository.planAtracciones(id).find(filter);
  }

  @post('/plans/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PlanAtraccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PlanAtraccion, {
            title: 'NewPlanAtraccionInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) planAtraccion: Omit<PlanAtraccion, 'id'>,
  ): Promise<PlanAtraccion> {
    return this.planRepository.planAtracciones(id).create(planAtraccion);
  }

  @patch('/plans/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Plan.PlanAtraccion PATCH success count',
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
    return this.planRepository.planAtracciones(id).patch(planAtraccion, where);
  }

  @del('/plans/{id}/plan-atraccions', {
    responses: {
      '200': {
        description: 'Plan.PlanAtraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PlanAtraccion)) where?: Where<PlanAtraccion>,
  ): Promise<Count> {
    return this.planRepository.planAtracciones(id).delete(where);
  }
}
