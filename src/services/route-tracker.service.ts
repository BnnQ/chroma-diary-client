import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, filter} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class RouteTrackerService
{
  private currentRoute = new BehaviorSubject<string>('/');

  constructor(router: Router, activatedRoute: ActivatedRoute)
  {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() =>
        {
          let route = activatedRoute;
          while (route.firstChild)
            route = route.firstChild;

          this.currentRoute.next(route.snapshot.routeConfig?.path ?? '/');
        }
      );
  }

  getCurrentRouteObservable() {
    return this.currentRoute.asObservable();
  }
}
