import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Puesto} from '../models';
import {PuestoRepository} from '../repositories';

export class PuestoController {
  constructor(
    @repository(PuestoRepository)
    public puestoRepository : PuestoRepository,
  ) {}

  @post('/puesto')
  @response(200, {
    description: 'Puesto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Puesto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puesto, {
            title: 'NewPuesto',
            exclude: ['id'],
          }),
        },
      },
    })
    puesto: Omit<Puesto, 'id'>,
  ): Promise<Puesto> {
    return this.puestoRepository.create(puesto);
  }

  @get('/puesto/count')
  @response(200, {
    description: 'Puesto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Puesto) where?: Where<Puesto>,
  ): Promise<Count> {
    return this.puestoRepository.count(where);
  }

  @get('/puesto')
  @response(200, {
    description: 'Array of Puesto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Puesto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Puesto) filter?: Filter<Puesto>,
  ): Promise<Puesto[]> {
    return this.puestoRepository.find(filter);
  }

  @patch('/puesto')
  @response(200, {
    description: 'Puesto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puesto, {partial: true}),
        },
      },
    })
    puesto: Puesto,
    @param.where(Puesto) where?: Where<Puesto>,
  ): Promise<Count> {
    return this.puestoRepository.updateAll(puesto, where);
  }

  @get('/puesto/{id}')
  @response(200, {
    description: 'Puesto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Puesto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Puesto, {exclude: 'where'}) filter?: FilterExcludingWhere<Puesto>
  ): Promise<Puesto> {
    return this.puestoRepository.findById(id, filter);
  }

  @patch('/puesto/{id}')
  @response(204, {
    description: 'Puesto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Puesto, {partial: true}),
        },
      },
    })
    puesto: Puesto,
  ): Promise<void> {
    await this.puestoRepository.updateById(id, puesto);
  }

  @put('/puesto/{id}')
  @response(204, {
    description: 'Puesto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() puesto: Puesto,
  ): Promise<void> {
    await this.puestoRepository.replaceById(id, puesto);
  }

  @del('/puesto/{id}')
  @response(204, {
    description: 'Puesto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.puestoRepository.deleteById(id);
  }
}
