import { Component, input } from '@angular/core';
import { IRevenuCard } from '../../../interfaces/irevenu-card';
import { CardComponent } from '../../overview/card/card.component';

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
})
export class CardWrapperComponent {
  data = input.required<IRevenuCard | undefined>();
}
