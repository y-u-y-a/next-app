/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/companies": {
    /** 企業情報を全件取得する */
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["getAllCompaniesResponse"];
          };
        };
        404: components["responses"]["NotFound"];
        500: components["responses"]["InternalServerError"];
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    getAllCompaniesResponse: components["schemas"]["Company"][];
    Company: {
      /** ID */
      id: string;
      /** 企業名 */
      name: string;
      /** メールアドレス */
      email: string;
    };
  };
  responses: {
    NotFound: {
      content: {
        "application/json": {
          error: string;
        };
      };
    };
    InternalServerError: {
      content: {
        "application/json": {
          error: string;
        };
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
