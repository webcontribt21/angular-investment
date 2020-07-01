import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const window: any;
const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.1/js/utils.js';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[telInput]' })
export class TelInputDirective implements OnInit {
  @Input() telInputOptions: { [key: string]: any } = {};
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();
  @Output() telOutput: EventEmitter<any> = new EventEmitter();
  @Output() countryChange: EventEmitter<any> = new EventEmitter();
  @Output() intlTelInputObject: EventEmitter<any> = new EventEmitter();

  ngTelInput: any;

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.telInputOptions = {
        ...this.telInputOptions,
        utilsScript: this.getUtilsScript(this.telInputOptions),
      };
      this.ngTelInput = window.intlTelInput(this.el.nativeElement, {
        ...this.telInputOptions,
      });

      this.el.nativeElement.addEventListener('countrychange', () => {
        this.countryChange.emit(this.ngTelInput.getSelectedCountryData());
      });

      this.intlTelInputObject.emit(this.ngTelInput);
    }
  }

  @HostListener('blur') onBlur() {
    const isInputValid: boolean = this.isInputValid();
    if (isInputValid) {
      const telOutput = this.ngTelInput.getNumber();
      this.hasError.emit(isInputValid);
      this.telOutput.emit(telOutput);
    } else {
      this.hasError.emit(isInputValid);
    }
  }

  isInputValid(): boolean {
    return this.ngTelInput.isValidNumber();
  }

  setCountry(country: any) {
    this.ngTelInput.setCountry(country);
  }

  getUtilsScript(options: any) {
    return options.utilsScript || defaultUtilScript;
  }
}
