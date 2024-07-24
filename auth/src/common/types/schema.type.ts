import { AjvSanitizeKey } from '@common/enums';
import { JSONSchema7 } from 'json-schema';

export type TJsonSchema = JSONSchema7 & {
  consumes?: string[];
  errorMessage?: Record<string, string>;
  formatMinimum?: any;
  maximum?: number;
  minimum?: number;
  patternProperties?: Record<string, TJsonSchema>;
  precesion?: number;
  properties?: Record<string, TJsonSchema | boolean>;
  reverseSort?: boolean;
  sanitize?: AjvSanitizeKey;
  transform?: string[];
  uniqueItemProperties?: string[];
};

export type TJsonSchemaProperty = Record<string, TJsonSchema>;

export interface ISchema {
  getPage(): TJsonSchema;
  getPageUnlimit(): TJsonSchema;
}

export type TJsonSchemaOptions = {
  body?: TJsonSchema | null;
  params?: TJsonSchema | null;
  query?: TJsonSchema | null;
};

export type TJsonSchemaCtx = {
  isOptional?: boolean;
  skipRepeatSymbols?: string[];
} & Pick<
  TJsonSchema,
  | 'maxLength'
  | 'minLength'
  | 'minimum'
  | 'maximum'
  | 'format'
  | 'transform'
  | 'errorMessage'
>;
