import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import {SERVICE_IDENTIFIERS} from "./app.config";
import {User} from "../models/user";
import {IUserManager} from "../services/abstractions/i-user-manager";
import {ScreenModule} from "../modules/screen.module";
import {ObservableItem} from "../models/observable-item";
import {ObservableArray} from "../models/observable-array";
import {HtmlAttribute} from "../models/html-attribute";
import {GlobalAttributeService} from "../services/global-attribute.service";
import {DelayHelper} from "../utils/delay-helper";
import {filter} from "rxjs";
import {RouteTrackerService} from "../services/route-tracker.service";
import {routes} from "./app.routes";
import {CustomPipesModule} from "../modules/custom-pipes.module";
import {CustomDirectivesModule} from "../modules/custom-directives.module";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterModule, ScreenModule, CustomPipesModule, CustomDirectivesModule],
    templateUrl: './app.component.html'
})
export class AppComponent
{
    title = 'ChromaDiary';
    user?: User;

    constructor(
        @Inject(SERVICE_IDENTIFIERS.IUserManager)
        private readonly userManager: IUserManager,
        @Inject(SERVICE_IDENTIFIERS.GlobalAttributeService)
        private readonly globalAttributeService: GlobalAttributeService,
        @Inject(SERVICE_IDENTIFIERS.RouteTrackerService)
        public readonly routeTrackerService: RouteTrackerService
    )
    {

    }

    toggleSidebar()
    {
        this.globalAttributeService.toggleAttribute('sidebar-locked');
    }

    expandSidebar()
    {
        this.globalAttributeService.setAttribute('sidebar-collapsed', false);
    }

    collapseSidebar()
    {
      this.globalAttributeService.setAttribute('sidebar-collapsed', true);
    }

    disableSidebar()
    {
      this.globalAttributeService.setAttribute('sidebar-disabled', true);
    }

    enableSidebar()
    {
      this.globalAttributeService.setAttribute('sidebar-disabled', false);
    }

    protected readonly routes = routes;
}
