import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Plan} from './plan.model';
import {CompraPlan} from './compra-plan.model';

@model()
export class Compra extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Usuario)
  usuarioId: number;

  @hasMany(() => Plan, {through: {model: () => CompraPlan}})
  planes: Plan[];

  constructor(data?: Partial<Compra>) {
    super(data);
  }
}

export interface CompraRelations {
  // describe navigational properties here
}

export type CompraWithRelations = Compra & CompraRelations;
