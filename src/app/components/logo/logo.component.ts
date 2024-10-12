import { Component } from '@angular/core';
import { NgOptimizedImage, provideCloudinaryLoader } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  providers: [provideCloudinaryLoader('https://res.cloudinary.com/dsity4tvx/')],
})
export class LogoComponent {}
