import {Entity, model, property, hasMany} from '@loopback/repository';
import {Compra} from './compra.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'number',
    required: true,
  })
  estatura: number;

  @property({
    type: 'string',
  })
  email?: string;

  @hasMany(() => Compra)
  compras: Compra[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
