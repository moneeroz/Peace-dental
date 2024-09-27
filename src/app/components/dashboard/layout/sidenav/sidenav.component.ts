import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../../logo/logo.component';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPower } from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../../services/auth.service';

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
    const id = this.authService.userSignal()?.id;

    localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/login');
    if (id) {
      this.authService.logout(id).subscribe({
        next: () => {},
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
