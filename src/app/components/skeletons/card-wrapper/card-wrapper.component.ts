import { Component } from '@angular/core';
import { CardSkeleton } from '../card/card.component';

@Component({
  selector: 'skeleton-card-wrapper',
  standalone: true,
  imports: [CardSkeleton],
  templateUrl: './card-wrapper.component.html',
  styleUrl: './card-wrapper.component.scss',
})
export class CardWrapperSkeleton {}
