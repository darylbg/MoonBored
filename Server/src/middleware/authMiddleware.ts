import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import { PublicUser, UserCredentials } from "@moonbored/types";

dotenv.config();

export default class AuthMiddleware {
    static JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
    static TOKEN_EXPIRY = "100h" as const;


    static async login(credentials: PublicUser): Promise<string> {
        const options: SignOptions = {expiresIn: this.TOKEN_EXPIRY}
        return jwt.sign(credentials, this.JWT_SECRET, options);
    };

    static async authenticateJWT(token: string): Promise<string | JwtPayload> {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error("Invalid token");
        }
    };

    static async logout(credentials: {username: string, password: string}): Promise<string> {
        return "logout";
    };
}
