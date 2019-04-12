import { User } from './user.model';

export class UserLoginData {
    login: string;
    password: string;
}

export class UserLoginResponse {
    data: {
        token: string;
        user: User;
    };
}
