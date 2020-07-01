import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { ConfigService, CustomerService, I18nService } from '../../../core/services';
import { Country, Customer } from '../../../core/models';
import { LanguagesEnum } from '../../../core/enums/i18n.enum';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  selectedCustomer$: Observable<Customer> = this.customerService.selectedCustomer$;
  licenceLink$: Observable<string>;
  country$: Observable<Country>;

  constructor(
    private customerService: CustomerService,
    private i18nService: I18nService,
    private sanitizer: DomSanitizer,
    private configService: ConfigService,
  ) {}

  ngOnInit() {
    this.licenceLink$ = this.i18nService.selectedLang$.pipe(
      map(lang => {
        const path: string = lang === LanguagesEnum.de ? '/faq/#****-verstehen' : '/en/faq/#Understanding-****';

        return this.sanitizer.sanitize(4, `${environment.websiteDomain}${path}`);
      }),
    );

    this.country$ = this.selectedCustomer$.pipe(
      withLatestFrom(this.configService.countries$),
      map(([customer, countries]) => {
        return countries.find(country => country.code === customer.address.country);
      }),
    );
  }
}
