import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";

class AuthenticationService {
    private userModel: ModelStatic<User>;
    private secretKey: string;

    constructor(userModel: ModelStatic<User>, secretKey: string) {
        this.userModel = userModel;
        this.secretKey = secretKey;
    }

    async createUser(userDTO: Partial<User>) {
        const { email, name, password, phone, location, role } = userDTO;

        const userExists = await this.userModel.findOne({ where: { email } });

        if (userExists) {
            throw new HttpError("Email already registered.", 400);
        }

        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password!, salt);

            const newUser = await this.userModel.create({
                email: email!,
                name: name!,
                password: hashedPassword!,
                phone: phone!,
                location: location!,
                role: role!,
            });

            return { status: 201, message: "User created successfully!", data: newUser };
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(`Validation error: ${errors.join(", ")}`, 400);
            }

            throw new HttpError("Internal error creating user.", 500);
        }
    }

    async login(email: string, password: string) {
        if (!email || !password) {
            throw new HttpError("Email and password are required.", 400);
        }

        try {
            const user = await this.userModel.findOne({ where: { email } });

            if (!user) {
                throw new HttpError("User not found.", 404);
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new HttpError("Incorrect password.", 401);
            }

            const token = jwt.sign(
                { email: user.email, role: user.role },
                this.secretKey,
                { expiresIn: "1h" }
            );

            return token;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError(`Internal error during login: ${error}`, 500);
        }
    }
}

export default AuthenticationService;
