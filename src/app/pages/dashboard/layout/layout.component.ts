import { Component } from '@angular/core';
import { SidenavComponent } from '../../../components/dashboard/layout/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
