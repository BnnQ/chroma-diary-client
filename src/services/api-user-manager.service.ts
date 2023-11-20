import {Inject, Injectable} from "@angular/core";
import {IUserManager} from "./abstractions/i-user-manager";
import {BehaviorSubject} from "rxjs";
import IHttpService from "./abstractions/i-http-service";
import {User} from "../models/user";
import {UserLoginDto} from "../models/dto/user-login-dto";
import {UserRegisterDto} from "../models/dto/user-register-dto";
import {UserEditDto} from "../models/dto/user-edit-dto";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import {environment} from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiUserManagerService implements IUserManager {
  private readonly serverApiUrl: string = environment.serverApiUrl;
  public isCurrentUserAuthenticated: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(SERVICE_IDENTIFIERS.IHttpService)
    private readonly httpService: IHttpService
  ) {
    this.updateAuthenticationStatus();
  }

  private updateAuthenticationStatus(): void {
    this.getIsCurrentUserAuthenticated().then(isCurrentUserAuthenticated =>
      this.setIsAuthenticated(isCurrentUserAuthenticated));
  }

  private setIsAuthenticated(isAuthenticated: boolean): void {
    this.isCurrentUserAuthenticated!.next(isAuthenticated);
  }

  getUser(username: string): Promise<User> {
    return this.httpService.get(
      new URL(`${this.serverApiUrl}Account/GetUser`),
      { username: username }
    );
  }

  async getCurrentUser(): Promise<User> {
    const currentUserId = await this.getCurrentUserId();
    return await this.getUserById(currentUserId);
  }

  async getCurrentUserId(): Promise<string> {
    return (
      (await this.httpService.get(
        new URL(`${this.serverApiUrl}Account/GetCurrentUserId`)
      )) as {
        currentUserId: string;
      }
    ).currentUserId;
  }

  private async getIsCurrentUserAuthenticated(): Promise<boolean> {
    const response = await this.httpService.get(
      new URL(`${this.serverApiUrl}Account/IsAuthenticated`)
    );
    return (response as { isAuthenticated: boolean }).isAuthenticated;
  }

  getUserById(id: string): Promise<User> {
    return this.httpService.get(
      new URL(`${this.serverApiUrl}Account/GetUserById`),
      { id: id }
    );
  }

  async login(loginDto: UserLoginDto): Promise<string | void> {
      await this.httpService.post(
        new URL(`${this.serverApiUrl}Account/Login`),
        loginDto
      );

      this.updateAuthenticationStatus();
  }

  async register(registerDto: UserRegisterDto): Promise<string | void> {
      await this.httpService.post(
        new URL(`${this.serverApiUrl}Account/Register`),
        registerDto
      );

      this.updateAuthenticationStatus();
  }

  async logout(): Promise<void> {
    await this.httpService.get(new URL(`${this.serverApiUrl}Account/Logout`));
    this.updateAuthenticationStatus();
  }

  async editUserProfile(userEditDto: UserEditDto): Promise<void> {
    const body: any = {
      fullName: userEditDto.fullName,
      avatar: userEditDto.avatar
    };

    await this.httpService
      .post(
        new URL(`${this.serverApiUrl}Account/EditUserProfile`),
        body,
        { id: await this.getCurrentUserId() },
        undefined,
        { 'Content-Type': 'multipart/form-data' }
      );
  }

}
