import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {SERVICE_IDENTIFIERS} from "./app.config";
import {User} from "../models/user";
import {IUserManager} from "../services/abstractions/i-user-manager";
import {ScreenModule} from "../modules/screen.module";
import {GlobalAttributeService} from "../services/global-attribute.service";
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
export class AppComponent implements OnInit
{
    title = 'ChromaDiary';
    user?: User;

    constructor(
        @Inject(SERVICE_IDENTIFIERS.IUserManager)
        private readonly userManager: IUserManager,
        @Inject(SERVICE_IDENTIFIERS.GlobalAttributeService)
        private readonly globalAttributeService: GlobalAttributeService,
        @Inject(SERVICE_IDENTIFIERS.RouteTrackerService)
        public readonly routeTrackerService: RouteTrackerService,
        private readonly router : Router
    )
    {
    }

    async ngOnInit()
    {
        //await this.logout();
        this.user = await this.userManager.getCurrentUser();
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

    async logout()
    {
        await this.userManager.logout();
        this.user = undefined;
        await this.router.navigate(['login']);

    }

    protected readonly routes = routes;
}
