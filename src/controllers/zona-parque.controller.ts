import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Parque, Zona} from '../models';
import {ZonaRepository} from '../repositories';

@authenticate('admin')
export class ZonaParqueController {
  constructor(
    @repository(ZonaRepository)
    public zonaRepository: ZonaRepository,
  ) {}

  @get('/zonas/{id}/parque', {
    responses: {
      '200': {
        description: 'Parque belonging to Zona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async getParque(
    @param.path.number('id') id: typeof Zona.prototype.id,
  ): Promise<Parque> {
    return this.zonaRepository.parque(id);
  }
}
