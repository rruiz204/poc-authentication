import type { LoginTyping } from "@Schemas/LoginSchema";
import type { RegisterTyping } from "@Schemas/RegisterSchema";

export interface LoginPayload extends LoginTyping {};

export interface RegisterPayload extends RegisterTyping {};