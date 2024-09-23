import { Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheck, heroClock } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  providers: [provideIcons({ heroCheck, heroClock })],
})
export class StatusComponent {
  status = input.required<string>();
}
