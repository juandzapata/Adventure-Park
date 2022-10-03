import {Entity, model, property, hasMany} from '@loopback/repository';
import {Compra} from './compra.model';
import {CompraPlan} from './compra-plan.model';
import {Atraccion} from './atraccion.model';
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
    type: 'number',
    required: true,
  })
  valor: number;

  @hasMany(() => Compra, {through: {model: () => CompraPlan}})
  compras: Compra[];

  @hasMany(() => Atraccion, {through: {model: () => PlanAtraccion}})
  atracciones: Atraccion[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
