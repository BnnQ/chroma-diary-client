import {BehaviorSubject} from "rxjs";
import {UserRegisterDto} from "../../models/dto/user-register-dto";
import {UserLoginDto} from "../../models/dto/user-login-dto";
import {User} from "../../models/user";
import {UserEditDto} from "../../models/dto/user-edit-dto";

export interface IUserManager {
  isCurrentUserAuthenticated: BehaviorSubject<boolean>;

  register(registerDto: UserRegisterDto): Promise<string | void>;
  login(loginDto: UserLoginDto): Promise<string | void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  getCurrentUserId(): Promise<number>;

  getUserById(id: number): Promise<User>;
  getUser(username: string): Promise<User>;
}
