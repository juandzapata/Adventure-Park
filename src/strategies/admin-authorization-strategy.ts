import {AuthenticationStrategy} from '@loopback/authentication';
import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import fetch from 'node-fetch';
import parseBearerToken from 'parse-bearer-token';
import {GeneralConfig} from '../config/general-config';

@injectable({scope: BindingScope.TRANSIENT})
export class adminAuthorizationStrategy implements AuthenticationStrategy {
  name = 'admin';

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);

    console.log(`Token de la request: ${token}`);

    if (token) {
      const esValido = await fetch(
        `${GeneralConfig.url_ms_seguridad
        }/${GeneralConfig.metodo_validar_jwt}/${token}`,
      );

      let rolId = await esValido.text();

      if (rolId == GeneralConfig.adminRolId) {
        // Validación del 'ID'
        let perfil: UserProfile = Object.assign({
          admin: 'OK',
        });
        return perfil;
      } else {
        throw new HttpErrors[401](
          'Solicitud rechazada porque el token no es valido',
        );
      }
    } else {
      throw new HttpErrors[401](
        'Solicitud rechazada porque no existe un token',
      );
    }
  }
}
