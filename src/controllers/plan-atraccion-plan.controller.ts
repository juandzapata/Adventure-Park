import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PlanAtraccion,
  Plan,
} from '../models';
import {PlanAtraccionRepository} from '../repositories';

export class PlanAtraccionPlanController {
  constructor(
    @repository(PlanAtraccionRepository)
    public planAtraccionRepository: PlanAtraccionRepository,
  ) { }

  @get('/plan-atraccions/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PlanAtraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.number('id') id: typeof PlanAtraccion.prototype.id,
  ): Promise<Plan> {
    return this.planAtraccionRepository.planes(id);
  }
}
