import type { Request, Response } from "express";
import type { SimpleAuthUseCase } from "@UseCases/Auth/SimpleAuth/SimpleAuthUseCase";
import type { RegisterUserUseCase } from "@UseCases/Auth/RegisterUser/RegisterUserUseCase";
import type { RefreshTokenUseCase } from "@UseCases/Auth/RefreshToken/RefreshTokenUseCase";
import type { ResetPasswordUseCase } from "@UseCases/Auth/ResetPassword/ResetPasswordUseCase";
import type { ForgetPasswordUseCase } from "@UseCases/Auth/ForgetPassword/ForgetPasswordUseCase";

export class AuthController {
  constructor(
    private simpleAuthUseCase: SimpleAuthUseCase,
    private registerUserUseCase: RegisterUserUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private forgetPasswordUserCase: ForgetPasswordUseCase,
  ) {
    this.reset = this.reset.bind(this);
    this.simple = this.simple.bind(this);
    this.forget = this.forget.bind(this);
    this.refresh = this.refresh.bind(this);
    this.register = this.register.bind(this);
  };


  public async simple(req: Request, res: Response): Promise<void> {
    const auth = await this.simpleAuthUseCase.execute(req.body);
    res.status(200).json(auth);
  };

  public async register(req: Request, res: Response): Promise<void> {
    const auth = await this.registerUserUseCase.execute(req.body);
    res.status(200).json(auth);
  };

  public async refresh(req: Request, res: Response): Promise<void> {
    const auth = await this.refreshTokenUseCase.execute(req.body);
    res.status(200).json(auth);
  };

  public async forget(req: Request, res: Response): Promise<void> {
    const forget = await this.forgetPasswordUserCase.execute(req.body);
    res.status(200).json({ message: forget.message });
  };

  public async reset(req: Request, res: Response): Promise<void> {
    const reset = await this.resetPasswordUseCase.execute(req.body);
    res.status(200).json({ message: reset.message });
  };
};