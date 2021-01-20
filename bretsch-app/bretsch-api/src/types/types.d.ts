import { JWTToken } from "../middleware/authentication";
declare global {
  namespace Express {
    export interface Request {
        token: JWTToken | null;
    }
  }
}
