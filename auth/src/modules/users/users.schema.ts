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
}
