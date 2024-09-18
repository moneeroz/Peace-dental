import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBanknotes,
  heroClock,
  heroCalendarDays,
  heroCalendar,
} from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIconComponent, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [
    provideIcons({ heroBanknotes, heroClock, heroCalendarDays, heroCalendar }),
  ],
})
export class CardComponent {
  title = input.required<string>();
  value = input.required<number | undefined>();
  icon = input.required<string>();
  type = input.required<string>();
}
