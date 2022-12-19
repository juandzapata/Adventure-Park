import {Entity, hasMany, model, property} from '@loopback/repository';
import {Atraccion} from './atraccion.model';
import {CompraPlan} from './compra-plan.model';
import {Compra} from './compra.model';
import {PlanAtraccion} from './plan-atraccion.model';

@model()
export class Plan extends Entity {
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
  color: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'number',
  })
  precio?: number;

  @hasMany(() => Compra, {through: {model: () => CompraPlan}})
  compras: Compra[];

  @hasMany(() => Atraccion, {through: {model: () => PlanAtraccion}})
  atracciones: Atraccion[];

  @hasMany(() => PlanAtraccion)
  planAtracciones: PlanAtraccion[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
