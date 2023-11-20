import {NgModule} from "@angular/core";
import {ResponsiveDirective} from "../directives/responsive.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [ResponsiveDirective],
  imports: [CommonModule],
  exports: [ResponsiveDirective]
})
export class ScreenModule { }
