import {Inject, Injectable} from "@angular/core";
import {IUserManager} from "./abstractions/i-user-manager";
import {BehaviorSubject} from "rxjs";
import IHttpService from "./abstractions/i-http-service";
import {User} from "../models/user";
import {UserLoginDto} from "../models/dto/user-login-dto";
import {UserRegisterDto} from "../models/dto/user-register-dto";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import {environment} from "../environments/environment";
import {AxiosResponse} from "axios";

@Injectable({providedIn: 'root'})
export class ApiUserManagerService implements IUserManager
{
    private readonly serverApiUrl: string = environment.serverApiUrl;
    public isCurrentUserAuthenticated: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(SERVICE_IDENTIFIERS.IHttpService)
        private readonly httpService: IHttpService
    ) { }

    private setIsAuthenticated(isAuthenticated: boolean): void
    {
        this.isCurrentUserAuthenticated!.next(isAuthenticated);
    }

    getUser(username: string): Promise<User>
    {
        return this.httpService.get(
            new URL(`${this.serverApiUrl}user/get/byUsername`),
            {username: username}
        );
    }

    async getCurrentUser(): Promise<User>
    {
        const currentUserId = await this.getCurrentUserId();
        return await this.getUserById(currentUserId);
    }

    async getCurrentUserId(): Promise<number>
    {
      return await this.httpService.get(new URL(`${this.serverApiUrl}auth/get/currentUserId`));
    }

    getUserById(id: number): Promise<User>
    {
        return this.httpService.get(
            new URL(`${this.serverApiUrl}user/get/byId`),
            {id: id}
        );
    }

    async login(loginDto: UserLoginDto): Promise<string | void>
    {
      console.log('loginDto:', loginDto);
      const encodedCredentials = btoa(`${loginDto.email}:${loginDto.password}`);
        await this.httpService.post(
            new URL(`${this.serverApiUrl}auth/login`),
            undefined,
            undefined,
            undefined,
          {
            Authorization: `Basic ${encodedCredentials}`
            },
          undefined,
            (response: AxiosResponse) =>
            {
                if (response.status === 200)
                {
                    console.log('success');
                    console.log('token', response.data);
                    localStorage.setItem('token', response.data);
                    this.setIsAuthenticated(true);
                }
            }
        );
        return Promise.resolve();
    }

    async register(registerDto: UserRegisterDto): Promise<string | void>
    {
      await this.httpService.post(
            new URL(`${this.serverApiUrl}auth/register`),
            registerDto,
          undefined,
          undefined,
          undefined,
          undefined,
          (response: AxiosResponse) =>
          {
              if (response.status === 200)
              {
                  this.login(new UserLoginDto(registerDto.email, registerDto.password));
              }
          }
        );
    }

    logout(): Promise<void>
    {
        localStorage.removeItem('token');
        this.setIsAuthenticated(false);
        return Promise.resolve();
    }

}
