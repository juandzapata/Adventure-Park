import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Parque} from './parque.model';
import {Puesto} from './puesto.model';
import {Atraccion} from './atraccion.model';

@model()
export class Zona extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Parque)
  parqueId: number;

  @hasMany(() => Puesto)
  puestos: Puesto[];

  @hasMany(() => Atraccion)
  atracciones: Atraccion[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
