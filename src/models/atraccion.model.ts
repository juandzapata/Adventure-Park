import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {PlanAtraccion} from './plan-atraccion.model';
import {Plan} from './plan.model';
import {Zona} from './zona.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_zona: {
        name: 'fk_id_zona',
        entity: 'Zona',
        entityKey: 'id',
        foreignKey: 'zonaId',
      },
    },
  },
})
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

  @hasMany(() => PlanAtraccion)
  planAtracciones: PlanAtraccion[];

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
