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
  Zona,
  Puesto,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaPuestoController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/puestos', {
    responses: {
      '200': {
        description: 'Array of Zona has many Puesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Puesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Puesto>,
  ): Promise<Puesto[]> {
    return this.zonaRepository.puestos(id).find(filter);
  }

  @post('/zonas/{id}/puestos', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Puesto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puesto, {
            title: 'NewPuestoInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) puesto: Omit<Puesto, 'id'>,
  ): Promise<Puesto> {
    return this.zonaRepository.puestos(id).create(puesto);
  }

  @patch('/zonas/{id}/puestos', {
    responses: {
      '200': {
        description: 'Zona.Puesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puesto, {partial: true}),
        },
      },
    })
    puesto: Partial<Puesto>,
    @param.query.object('where', getWhereSchemaFor(Puesto)) where?: Where<Puesto>,
  ): Promise<Count> {
    return this.zonaRepository.puestos(id).patch(puesto, where);
  }

  @del('/zonas/{id}/puestos', {
    responses: {
      '200': {
        description: 'Zona.Puesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Puesto)) where?: Where<Puesto>,
  ): Promise<Count> {
    return this.zonaRepository.puestos(id).delete(where);
  }
}
