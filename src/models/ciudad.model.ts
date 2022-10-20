import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Parque} from './parque.model';

@model({
  settings: {
    foreignKeys: {
      fk_id_departamento: {
        name: 'fk_id_departamento',
        entity: 'Departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId'
      }
    }
  }
})
export class Ciudad extends Entity {
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
  })
  codigoPostal?: string;

  @belongsTo(() => Departamento)
  departamentoId: number;

  @hasMany(() => Parque)
  parques: Parque[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
