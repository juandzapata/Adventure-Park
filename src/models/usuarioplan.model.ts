import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuarioplan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Usuarioplan>) {
    super(data);
  }
}

export interface UsuarioplanRelations {
  // describe navigational properties here
}

export type UsuarioplanWithRelations = Usuarioplan & UsuarioplanRelations;
