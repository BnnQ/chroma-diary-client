import {NgModule} from "@angular/core";
import {StandaloneDirective} from "../directives/standalone.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [StandaloneDirective],
  imports: [CommonModule],
  exports: [StandaloneDirective]
})
export class CustomDirectivesModule { }
