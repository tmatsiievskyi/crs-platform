import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@common/constants';
import { validationMessages } from '@common/messages';
import { PAGE_SCHEMA, PAGE_UNLIMIT_ITEM_SCHEMA } from '@common/schemas';
import {
  ISchema,
  TJsonSchema,
  TJsonSchemaCtx,
  TJsonSchemaProperty,
} from '@common/types';
import { StringUtil } from '@common/utils';

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
    return `${this.constructor.name}/${schemaName}`;
  }

  protected getString(key: string, opt?: TJsonSchemaCtx): TJsonSchemaProperty {
    const { isOptional, ...param } = opt || { isOptional: false };
    const minLength = isOptional ? 0 : opt?.minLength ?? 1;
    const maxLength = opt?.maxLength;

    return {
      [key]: {
        type: isOptional ? ['string', 'null'] : 'string',
        transform: ['trim'],
        ...param,
        minLength,
        ...(maxLength && { maxLength }),
        errorMessage: {
          type: 'Should be a string',
          minLength: StringUtil.replace(validationMessages.minLength, {
            size: minLength,
          }),
          ...(maxLength && {
            maxLength: StringUtil.replace(validationMessages.maxLength, {
              size: maxLength,
            }),
          }),
          // ...(param.format && {
          //   format: 'format', //TODO: update
          // }),
        },
      },
    };
  }
}
