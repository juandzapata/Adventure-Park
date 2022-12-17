import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
  })
  atraccionId?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  constructor(data?: Partial<PlanAtraccion>) {
    super(data);
  }
}

export interface PlanAtraccionRelations {
  // describe navigational properties here
}

export type PlanAtraccionWithRelations = PlanAtraccion & PlanAtraccionRelations;
