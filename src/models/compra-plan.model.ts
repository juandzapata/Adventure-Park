import {Entity, model, property} from '@loopback/repository';

@model()
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
    required: true,
  })
  total: number;

  @property({
    type: 'number',
  })
  compraId?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  constructor(data?: Partial<CompraPlan>) {
    super(data);
  }
}

export interface CompraPlanRelations {
  // describe navigational properties here
}

export type CompraPlanWithRelations = CompraPlan & CompraPlanRelations;
