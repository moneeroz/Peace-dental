import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../../logo/logo.component';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPower } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../../services/auth.service';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../../../lib/constants';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [LogoComponent, NavLinksComponent, RouterLink, NgIconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  providers: [provideIcons({ heroPower })],
})
export class SidenavComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logOut() {
    this.authService.logout().subscribe({
      next: () => {},
      error: (err) => {
        console.error(err);
      },
    });

    this.authService.removeToken(TOKEN_KEY);
    this.authService.removeToken(REFRESH_TOKEN_KEY);
    this.router.navigateByUrl('/home');
  }
}
