import { Component } from '@angular/core';
import { SsoService } from '../../services/sso/sso.service';

@Component({
  selector: 'app-sso-buttons',
  templateUrl: './sso-buttons.component.html',
  styleUrls: ['./sso-buttons.component.scss'],
  standalone: true
})
export class SsoButtonsComponent {
  constructor(private ssoService: SsoService) {}

  initiateSSO(provider: string): void {
    this.ssoService
      .initiateSSO(provider)
      .then((response) => {
        console.log(`${provider} SSO successful`, response);
      })
      .catch((error) => {
        console.error(`${provider} SSO failed`, error);
      });
  }
}
