import {ApplicationConfig, InjectionToken} from '@angular/core';
import {provideRouter} from '@angular/router';
import {Dictionary} from '../models/abstractions/dictionary';

import {routes} from './app.routes';
import IHttpService from "../services/abstractions/i-http-service";
import {IUserManager} from "../services/abstractions/i-user-manager";
import {AxiosHttpService} from "../services/axios-http.service";
import {ScreenService} from "../services/screen.service";
import {GlobalAttributeService} from "../services/global-attribute.service";
import {RouteTrackerService} from "../services/route-tracker.service";
import {IDiaryRepository} from "../services/abstractions/i-diary-repository";
import {ITagRepository} from "../services/abstractions/i-tag-repository";
import {IPermissionManager} from "../services/abstractions/i-permission-manager";
import {IPostRepository} from "../services/abstractions/i-post-repository";
import {ApiDiaryRepository} from "../services/api-diary-repository.service";
import {ApiPostRepository} from "../services/api-post-repository.service";
import {ApiTagRepository} from "../services/api-tag-repository";
import {ApiUserManagerService} from "../services/api-user-manager.service";
import {ApiPermissionManager} from "../services/api-permission-manager";

export const SERVICE_IDENTIFIERS = {
  IHttpService: new InjectionToken<IHttpService>('IHttpService'),
  IUserManager: new InjectionToken<IUserManager>('IUserManager'),
  ScreenService: new InjectionToken<ScreenService>('ScreenService'),
  AttributeDefinition: new InjectionToken<Dictionary<string, boolean>>('AttributeDefinition'),
  GlobalAttributeService: new InjectionToken<GlobalAttributeService>('GlobalAttributeService'),
  RouteTrackerService: new InjectionToken<RouteTrackerService>('RouteTrackerService'),
  IDiaryRepository: new InjectionToken<IDiaryRepository>('IDiaryRepository'),
  ITagRepository: new InjectionToken<ITagRepository>('ITagRepository'),
  IPermissionManager: new InjectionToken<IPermissionManager>('IPermissionsManager'),
  IPostRepository: new InjectionToken<IPostRepository>('IPostRepository'),
};

export const ATTRIBUTES: Dictionary<string, boolean> = {
  'sidebar-locked': true,
  'sidebar-collapsed': false,
  'sidebar-disabled': false
};

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideRouter(routes),
      {provide: SERVICE_IDENTIFIERS.IHttpService, useClass: AxiosHttpService},
      {provide: SERVICE_IDENTIFIERS.ScreenService, useClass: ScreenService},
      {provide: SERVICE_IDENTIFIERS.AttributeDefinition, useValue: ATTRIBUTES},
      {
        provide: SERVICE_IDENTIFIERS.GlobalAttributeService,
        useFactory: (attributeDefinition: Dictionary<string, boolean>) =>
        {
          return new GlobalAttributeService(attributeDefinition);
        },
        deps: [SERVICE_IDENTIFIERS.AttributeDefinition]
      },
      {provide: SERVICE_IDENTIFIERS.RouteTrackerService, useClass: RouteTrackerService},
      {provide: SERVICE_IDENTIFIERS.IDiaryRepository, useClass: ApiDiaryRepository},
      {provide: SERVICE_IDENTIFIERS.ITagRepository, useClass: ApiTagRepository},
      {provide: SERVICE_IDENTIFIERS.IUserManager, useClass: ApiUserManagerService},
      {provide: SERVICE_IDENTIFIERS.IPermissionManager, useClass: ApiPermissionManager},
      {provide: SERVICE_IDENTIFIERS.IPostRepository, useClass: ApiPostRepository}
    ],
};

