import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroCalendarDays,
  heroDocumentDuplicate,
  heroUserGroup,
  heroBanknotes,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
  providers: [
    provideIcons({
      heroHome,
      heroCalendarDays,
      heroDocumentDuplicate,
      heroUserGroup,
      heroBanknotes,
    }),
  ],
})
export class NavLinksComponent implements OnInit {
  authService = inject(AuthService);
  injector = inject(Injector);
  role: string | undefined = 'user';
  ngOnInit() {
    effect(
      () => {
        this.role = this.authService.userSignal()?.role;
      },
      { injector: this.injector },
    );
  }

  userLinks = [
    { name: 'Overview', href: '/overview', icon: 'heroHome' },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: 'heroCalendarDays',
    },
    {
      name: 'Invoices',
      href: '/invoices',
      icon: 'heroDocumentDuplicate',
    },
    { name: 'Patients', href: '/patients', icon: 'heroUserGroup' },
  ];

  adminLink = { name: 'Revenue', href: '/revenue', icon: 'heroBanknotes' };
}
