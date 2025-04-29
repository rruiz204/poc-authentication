import { BaseException } from "./BaseException";

export class HttpException extends BaseException {

  public static readonly BadRequest = this.fromStatus(400);
  public static readonly Unauthorized = this.fromStatus(401);
};