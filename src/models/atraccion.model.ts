import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {Plan} from './plan.model';
import {PlanAtraccion} from './plan-atraccion.model';

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

  @belongsTo(() => Zona)
  zonaId: number;

  @hasMany(() => Plan, {through: {model: () => PlanAtraccion}})
  planes: Plan[];

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
