import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Compra} from './compra.model';
import {PlanAtraccion} from './plan-atraccion.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_compra: {
        name: 'fk_id_compra',
        entity: 'Compra',
        entityKey: 'id',
        foreignKey: 'compraId'
      },
      fk_id_planAtraccion: {
        name: 'fk_id_planAtraccion',
        entity: 'PlanAtraccion',
        entityKey: 'id',
        foreignKey: 'planAtraccionId'
      }
    }
  }
})
export class CompraPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: false,
  })
  total: number;

  @belongsTo(() => Compra)
  compraId: number;

  @belongsTo(() => PlanAtraccion)
  planAtraccionId: number;

  constructor(data?: Partial<CompraPlan>) {
    super(data);
  }
}

export interface CompraPlanRelations {
  // describe navigational properties here
}

export type CompraPlanWithRelations = CompraPlan & CompraPlanRelations;
