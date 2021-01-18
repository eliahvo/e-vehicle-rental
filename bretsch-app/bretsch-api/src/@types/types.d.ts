import { JWTToken } from "../middleware/authentication";
declare global {
  module Express {
    export interface Request {
        token: JWTToken | null;
    }
  }
}
