import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {CompraPlan} from './compra-plan.model';
import {Plan} from './plan.model';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_usuario: {
        name: 'fk_id_usuario',
        entity: 'Usuario',
        entityKey: 'id',
        foreignKey: 'usuarioId'
      }
    }
  }
})
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
