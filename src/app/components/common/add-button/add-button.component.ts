import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
  providers: [provideIcons({ heroPlus })],
})
export class AddButtonComponent {
  text = input.required<string>();
  link = input.required<string>();
}
