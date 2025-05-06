import { inject, injectable } from "inversify";
import type { Request, Response } from "express";

import { EmailLoginUseCase } from "@UseCases/Auth/EmailLogin/EmailLoginUseCase";
import { SimpleRegisterUseCase } from "@UseCases/Auth/SimpleRegister/SimpleRegisterUseCase";

@injectable()
export class AuthController {
  constructor(
    @inject(EmailLoginUseCase) private readonly emailLoginUseCase: EmailLoginUseCase,
    @inject(SimpleRegisterUseCase) private readonly simpleRegisterUseCase: SimpleRegisterUseCase,
  ) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  };

  public async login(req: Request, res: Response): Promise<void> {
    const auth = await this.emailLoginUseCase.execute(req.body);
    res.status(200).json({ auth });
  };

  public async register(req: Request, res: Response): Promise<void> {
    const auth = await this.simpleRegisterUseCase.execute(req.body);
    res.status(200).json({ auth });
  };
};