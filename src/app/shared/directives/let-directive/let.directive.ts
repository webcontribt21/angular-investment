import { Directive, Input } from '@angular/core';

// tslint:disable-next-line: directive-selector
@Directive({ exportAs: 'let', selector: '[ngLet]' })
export class NgLetDirective {
  @Input('ngLet') value: any;
}
