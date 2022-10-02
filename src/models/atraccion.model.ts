import {Entity, model, property} from '@loopback/repository';

@model()
export class Atraccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  imagen?: string;

  @property({
    type: 'string',
    required: true,
  })
  estaturaMinima: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
