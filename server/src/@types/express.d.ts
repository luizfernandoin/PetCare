import { User } from "../models/user";

declare global {
  declare namespace Express {
    export interface Request {
      user?: User;
    }
  }
}