export interface IDBDate {
  created_at: Date;
  updated_at: Date;
}

export type TDBResponce<Result> = Promise<Result & IDBDate>;

export interface IApiResponse<TDBResp> {
  data: TDBResp | null;
  ok: boolean;
  meta: Record<string, any> | null;
  errors: string[] | null;
  message: string | null;
}
