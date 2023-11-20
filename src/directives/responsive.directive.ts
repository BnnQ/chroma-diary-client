import {Directive, Inject, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {ScreenService, ScreenSize} from "../services/screen.service";
import {SERVICE_IDENTIFIERS} from "../app/app.config";
import {GlobalAttributeService} from "../services/global-attribute.service";

@Directive({
  selector: '#main[appResponsive]'
})
export class ResponsiveDirective implements OnInit, OnDestroy {
  private subscription? : Subscription;

  constructor(
    @Inject(SERVICE_IDENTIFIERS.ScreenService)
    private readonly screenService : ScreenService,
    @Inject(SERVICE_IDENTIFIERS.GlobalAttributeService)
    private readonly globalAttributeService : GlobalAttributeService
  ) { }

  ngOnInit() {
    this.subscription = this.screenService.getBreakpointObservable().subscribe(breakpoint => {
      document.documentElement.className = 'on-' + ScreenSize[breakpoint] + '-screen';

      this.globalAttributeService.setAttribute('sidebar-locked', breakpoint !== ScreenSize.small);
    });

    this.globalAttributeService.registerAttributeUpdateHandler(attribute => {
      document.documentElement.setAttribute('_' + attribute.name, attribute.value.toString());
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
