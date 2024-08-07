import { SchemaCore } from '@core';
import { IAuthSchema } from './_auth.type';
import { TJsonSchemaOptions } from '@common/types';

export class AuthSchema extends SchemaCore implements IAuthSchema {
  signIn(): TJsonSchemaOptions {
    return {
      body: {
        $id: this.getIdkey('signIn'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['email', 'password'],
        properties: {
          ...this.getEmail(),
          ...this.getPassword(),
        },
      },
    };
  }
  signUp(): TJsonSchemaOptions {
    return {
      body: {
        $id: this.getIdkey('signUp'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['firstName', 'lastName', 'email', 'password'],
        properties: {
          ...this.getString('firstName'),
          ...this.getString('lastName'),
          ...this.getEmail(),
          ...this.getPassword(),
        },
      },
    };
  }
}
