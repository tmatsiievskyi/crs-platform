import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@common/constants';
import { PAGE_SCHEMA, PAGE_UNLIMIT_ITEM_SCHEMA } from '@common/schemas';
import { ISchema, TJsonSchema, TJsonSchemaProperty } from '@common/types';

export class SchemaCore implements ISchema {
  public getPage(): TJsonSchema {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...PAGE_SCHEMA,
      },
    };
  }

  public getPageUnlimit(): TJsonSchema {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        ...PAGE_UNLIMIT_ITEM_SCHEMA,
      },
    };
  }

  protected getEmail(): TJsonSchemaProperty {
    return {
      email: {
        type: 'string',
        format: 'email',
        transform: ['trim', 'toLowerCase'],
        errorMessage: {
          type: 'Should be a string',
          format: 'Wrong email',
        },
      },
    };
  }

  protected getPassword(key = 'password'): TJsonSchemaProperty {
    return {
      [key]: {
        type: 'string',
        transform: ['trim'],
        minLength: MIN_PASSWORD_LENGTH,
        maxLength: MAX_PASSWORD_LENGTH,
        errorMessage: {
          type: 'Wrong password',
        },
      },
    };
  }

  protected getIdkey(schemaName: string) {
    console.log(`${this.constructor.name}/${schemaName}`);
    return `${this.constructor.name}/${schemaName}`;
  }
}
