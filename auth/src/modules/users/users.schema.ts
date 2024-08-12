import { SchemaCore } from '@core';
import { IUsersSchema } from './_users.type';
import { TJsonSchemaOptions } from '@common/types';

export class UsersSchema extends SchemaCore implements IUsersSchema {
  findUserById(): TJsonSchemaOptions {
    return {
      params: {
        $id: this.getIdkey('findUserById'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['id'],
        properties: {
          ...this.getString('id'),
        },
      },
    };
  }

  changePassword(): TJsonSchemaOptions {
    return {
      body: {
        $id: this.getIdkey('changePassword'),
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        required: ['newPassword', 'oldPassword'],
        properties: {
          ...this.getPassword('newPassword'),
          ...this.getPassword('oldPassword'),
        },
      },
    };
  }
}
