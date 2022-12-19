import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {Compra, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

//@authenticate('admin')
export class UsuarioCompraController {
  constructor(
    @repository(UsuarioRepository)
    protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Compra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Compra>,
  ): Promise<Compra[]> {
    return this.usuarioRepository.compras(id).find(filter);
  }

  @post('/usuarios/{id}/compras', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compra)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {
            title: 'NewCompraInUsuario',
            exclude: ['id'],
            optional: ['usuarioId'],
          }),
        },
      },
    })
    compra: Omit<Compra, 'id'>,
  ): Promise<Compra> {
    return this.usuarioRepository.compras(id).create(compra);
  }

  @patch('/usuarios/{id}/compras', {
    responses: {
      '200': {
        description: 'Usuario.Compra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {partial: true}),
        },
      },
    })
    compra: Partial<Compra>,
    @param.query.object('where', getWhereSchemaFor(Compra))
    where?: Where<Compra>,
  ): Promise<Count> {
    return this.usuarioRepository.compras(id).patch(compra, where);
  }

  @del('/usuarios/{id}/compras', {
    responses: {
      '200': {
        description: 'Usuario.Compra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Compra))
    where?: Where<Compra>,
  ): Promise<Count> {
    return this.usuarioRepository.compras(id).delete(where);
  }
}
