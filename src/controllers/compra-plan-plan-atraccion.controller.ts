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
  PlanAtraccion,
} from '../models';
import {CompraPlanRepository} from '../repositories';

export class CompraPlanPlanAtraccionController {
  constructor(
    @repository(CompraPlanRepository)
    public compraPlanRepository: CompraPlanRepository,
  ) { }

  @get('/compra-plans/{id}/plan-atraccion', {
    responses: {
      '200': {
        description: 'PlanAtraccion belonging to CompraPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PlanAtraccion)},
          },
        },
      },
    },
  })
  async getPlanAtraccion(
    @param.path.number('id') id: typeof CompraPlan.prototype.id,
  ): Promise<PlanAtraccion> {
    return this.compraPlanRepository.planAtraccion(id);
  }
}
