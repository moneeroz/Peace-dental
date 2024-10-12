import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroLockClosed } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-un-authorized',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './un-authorized.component.html',
  styleUrl: './un-authorized.component.scss',
  providers: [provideIcons({ heroLockClosed })],
})
export class UnAuthorizedComponent {}
