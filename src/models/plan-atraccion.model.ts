import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Atraccion} from './atraccion.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_atraccion: {
        name: 'fk_id_atraccion',
        entity: 'Atraccion',
        entityKey: 'id',
        foreignKey: 'atraccionId',
      },
      fk_plan: {
        name: 'fk_plan',
        entity: 'Plan',
        entityKey: 'id',
        foreignKey: 'planId',
      },
    },
  },
})
export class PlanAtraccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @belongsTo(() => Plan, {name: 'planes'})
  planId: number;

  @belongsTo(() => Atraccion, {name: 'atracciones'})
  atraccionId: number;

  constructor(data?: Partial<PlanAtraccion>) {
    super(data);
  }
}

export interface PlanAtraccionRelations {
  // describe navigational properties here
}

export type PlanAtraccionWithRelations = PlanAtraccion & PlanAtraccionRelations;
