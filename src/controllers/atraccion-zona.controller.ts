import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Atraccion, Zona} from '../models';
import {AtraccionRepository} from '../repositories';

@authenticate('admin')
export class AtraccionZonaController {
  constructor(
    @repository(AtraccionRepository)
    public atraccionRepository: AtraccionRepository,
  ) {}

  @get('/atraccions/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to Atraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async getZona(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
  ): Promise<Zona> {
    return this.atraccionRepository.zona(id);
  }
}
