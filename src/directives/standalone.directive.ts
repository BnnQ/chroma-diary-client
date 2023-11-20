import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";

@Directive({
  selector: '[standalone]'
})
export class StandaloneDirective implements OnInit, OnDestroy
{
  constructor(private readonly element : ElementRef) { }

  ngOnInit(): void
  {
    document.body.appendChild(this.element.nativeElement);
  }

  ngOnDestroy(): void
  {
    document.body.removeChild(this.element.nativeElement);
  }
}
