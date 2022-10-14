import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Ciudad, Parque} from '../models';
import {ParqueRepository} from '../repositories';

@authenticate('admin')
export class ParqueCiudadController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository: ParqueRepository,
  ) {}

  @get('/parques/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Parque.prototype.id,
  ): Promise<Ciudad> {
    return this.parqueRepository.ciudad(id);
  }
}
