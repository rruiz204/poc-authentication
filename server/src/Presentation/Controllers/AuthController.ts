import type { Request, Response } from "express";
import type { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";

export class AuthController {
  constructor(
    private simpleAuthUseCase: SimpleAuthUseCase
  ) {
    this.simple = this.simple.bind(this);
  };

  public async simple(req: Request, res: Response) {
    const auth = await this.simpleAuthUseCase.execute(req.body);
    res.status(200).json({ type: auth.type, token: auth.token });
  };
};