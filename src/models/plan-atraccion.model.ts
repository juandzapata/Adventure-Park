import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Atraccion} from './atraccion.model';
import {CompraPlan} from './compra-plan.model';
import {Plan} from './plan.model';

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

  @hasMany(() => CompraPlan)
  compraPlans: CompraPlan[];

  @hasMany(() => CompraPlan)
  compraPlanes: CompraPlan[];

  constructor(data?: Partial<PlanAtraccion>) {
    super(data);
  }
}

export interface PlanAtraccionRelations {
  // describe navigational properties here
}

export type PlanAtraccionWithRelations = PlanAtraccion & PlanAtraccionRelations;
