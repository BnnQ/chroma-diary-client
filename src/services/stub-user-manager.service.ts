import {Inject, Injectable} from "@angular/core";
import {IUserManager} from "./abstractions/i-user-manager";
import {BehaviorSubject} from "rxjs";
import IHttpService from "./abstractions/i-http-service";
import {User} from "../models/user";
import {UserLoginDto} from "../models/dto/user-login-dto";
import {UserRegisterDto} from "../models/dto/user-register-dto";
import {UserEditDto} from "../models/dto/user-edit-dto";
import {SERVICE_IDENTIFIERS} from "../app/app.config";

@Injectable({ providedIn: 'root' })
export class StubUserManagerService implements IUserManager {
  public isCurrentUserAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private currentUser : User;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService: IHttpService
  ) {
    this.currentUser = new User("1", "Test Testovich", "test@gmail.com", "https://images.placeholders.dev/?width=1055&height=100&text=Made%20with%20placeholders.dev&bgColor=%23f7f6f6&textColor=%236d6e71");
    this.updateAuthenticationStatus(false);
  }

  private updateAuthenticationStatus(newStatus : boolean): void {
    this.setIsAuthenticated(newStatus);
  }

  private setIsAuthenticated(isAuthenticated: boolean): void {
    this.isCurrentUserAuthenticated!.next(isAuthenticated);
  }

  getUser(username: string): Promise<User> {
    return Promise.resolve(this.currentUser);
  }

  async getCurrentUser(): Promise<User> {
    return Promise.resolve(this.currentUser);
  }

  async getCurrentUserId(): Promise<string> {
    return Promise.resolve(this.currentUser.id);
  }

  private async getIsCurrentUserAuthenticated(): Promise<boolean> {
   return Promise.resolve(true);
  }

  getUserById(id: string): Promise<User> {
    return Promise.resolve(this.currentUser);
  }

  async login(loginDto: UserLoginDto): Promise<string | void> {
      this.updateAuthenticationStatus(true);
  }

  async register(registerDto: UserRegisterDto): Promise<string | void> {
      this.updateAuthenticationStatus(true);
  }

  async logout(): Promise<void> {
    this.updateAuthenticationStatus(false);
  }

  async editUserProfile(userEditDto: UserEditDto): Promise<void> {
    const body: any = {
      fullName: userEditDto.fullName,
      avatar: userEditDto.avatar
    };

  }

}
