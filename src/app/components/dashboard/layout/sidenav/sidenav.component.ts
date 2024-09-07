import { Component } from '@angular/core';
import { LogoComponent } from '../../../logo/logo.component';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPower } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [LogoComponent, NavLinksComponent, RouterLink, NgIconComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  providers: [provideIcons({ heroPower })],
})
export class SidenavComponent {}
