import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { NgOptimizedImage, provideCloudinaryLoader } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoComponent, NgOptimizedImage, RouterLink, NgIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    provideIcons({ heroArrowRight }),
    provideCloudinaryLoader('https://res.cloudinary.com/dsity4tvx/'),
  ],
})
export class HomeComponent {}
