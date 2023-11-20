import {NgModule} from "@angular/core";
import {ContrastColorPipe} from "../pipes/contrast-color.pipe";
import {CommonModule} from "@angular/common";
import {CountdownDateDaysPipe} from "../pipes/countdown-date-days.pipe";

@NgModule({
  declarations: [ContrastColorPipe, CountdownDateDaysPipe],
  imports: [CommonModule],
  exports: [ContrastColorPipe, CountdownDateDaysPipe]
})
export class CustomPipesModule { }
