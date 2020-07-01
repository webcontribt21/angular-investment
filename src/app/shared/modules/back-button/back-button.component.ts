import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() linkLabel = 'COMMON.BACK_TO.OVERVIEW';
  @Input() pageLink = '';
}
