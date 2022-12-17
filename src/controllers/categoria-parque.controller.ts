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
  Categoria,
  Parque,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaParqueController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.categoriaRepository.parques(id).find(filter);
  }

  @post('/categorias/{id}/parques', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) parque: Omit<Parque, 'id'>,
  ): Promise<Parque> {
    return this.categoriaRepository.parques(id).create(parque);
  }

  @patch('/categorias/{id}/parques', {
    responses: {
      '200': {
        description: 'Categoria.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.categoriaRepository.parques(id).patch(parque, where);
  }

  @del('/categorias/{id}/parques', {
    responses: {
      '200': {
        description: 'Categoria.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.categoriaRepository.parques(id).delete(where);
  }
}
