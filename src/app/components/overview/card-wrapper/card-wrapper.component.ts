import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ICardData } from '../../../interfaces/icard-data';

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
})
export class CardWrapperComponent {
  data = input.required<ICardData | undefined>();
}
