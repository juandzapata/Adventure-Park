import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Zona} from './zona.model';

@model()
export class Puesto extends Entity {
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
  menu: string;

  @belongsTo(() => Zona)
  zonaId: number;

  constructor(data?: Partial<Puesto>) {
    super(data);
  }
}

export interface PuestoRelations {
  // describe navigational properties here
}

export type PuestoWithRelations = Puesto & PuestoRelations;
