import type { Request, Response } from "express";

export class AuthController {
  constructor() {
    this.ping = this.ping.bind(this);
  };

  public async ping(req: Request, res: Response) {
    res.status(200).json({ ping: "pong" });
  };
};