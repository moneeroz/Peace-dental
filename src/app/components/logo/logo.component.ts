import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroGlobeAlt } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  providers: [provideIcons({ heroGlobeAlt })],
})
export class LogoComponent {}
