export type ApiResponse = {
    responseCode: ResponseCodes;
    data: any;
    message: string;
  };
  
  export enum ResponseCodes {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }
  