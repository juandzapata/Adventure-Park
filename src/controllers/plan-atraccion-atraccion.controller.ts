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
  Atraccion,
} from '../models';
import {PlanAtraccionRepository} from '../repositories';

export class PlanAtraccionAtraccionController {
  constructor(
    @repository(PlanAtraccionRepository)
    public planAtraccionRepository: PlanAtraccionRepository,
  ) { }

  @get('/plan-atraccions/{id}/atraccion', {
    responses: {
      '200': {
        description: 'Atraccion belonging to PlanAtraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async getAtraccion(
    @param.path.number('id') id: typeof PlanAtraccion.prototype.id,
  ): Promise<Atraccion> {
    return this.planAtraccionRepository.atracciones(id);
  }
}
