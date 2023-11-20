import {Injectable} from "@angular/core";
import {BehaviorSubject, distinctUntilChanged, fromEvent, map} from "rxjs";

export enum ScreenSize {
  small,
  medium,
  large,
}

@Injectable({providedIn: 'root'})
export class ScreenService {
  private breakpoint = new BehaviorSubject<ScreenSize>(ScreenSize.large);

  constructor() {
    fromEvent(window, 'resize').pipe(map(() => {
      const width = window.innerWidth;
      return width < 768 ? ScreenSize.small : width < 1024 ? ScreenSize.medium : ScreenSize.large;
    }),
      distinctUntilChanged()
    ).subscribe(this.breakpoint);
  }

  getBreakpointObservable() {
    return this.breakpoint.asObservable();
  }

}
