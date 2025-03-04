import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { SettingsComponent } from '../../settings/settings.component';
import { AuthService } from '../../../services/auth/auth.service';
import { environment } from '../../../../environments/environment';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { BreadcrumbsComponent } from '../../core/breadcrumbs/breadcrumbs.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { heroCog8Tooth } from '@ng-icons/heroicons/outline';
import { SsoService } from 'src/app/services/sso/sso.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    NgIconComponent,
    NgIf,
    RouterLink,
    AsyncPipe,
    MatTooltipModule,
  ],
  viewProviders: [provideIcons({ heroCog8Tooth })],
})

export class HeaderComponent {
  userName: string | null = null;

  constructor(private ssoService: SsoService) {}

  ngOnInit(): void {
    this.ssoService.getUserCredentials('github').then((credentials: { name: string }) => {
      this.userName = credentials.name;
    });
  }
  protected themeConfiguration = environment.ThemeConfiguration;

  authService = inject(AuthService);
  dialog = inject(MatDialog);

  openSettingsModal() {
    this.dialog.open(SettingsComponent, {
      disableClose: true,
    });
  }
}
