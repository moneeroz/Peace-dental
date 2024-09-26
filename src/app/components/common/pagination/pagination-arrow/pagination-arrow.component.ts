import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-pagination-arrow',
  standalone: true,
  imports: [NgIconComponent, NgClass],
  templateUrl: './pagination-arrow.component.html',
  styleUrl: './pagination-arrow.component.scss',
  providers: [provideIcons({ heroArrowLeft, heroArrowRight })],
})
export class PaginationArrowComponent {
  direction = input.required<'left' | 'right'>();
  isDisabled = input<boolean>(false);
  link = input.required<string>();
  pageChange = output<number>();
  page = input.required<number>();

  emitPageNum(): void {
    if (this.direction() === 'left') {
      return this.pageChange.emit(Number(this.page()) - 1);
    }
    this.pageChange.emit(Number(this.page()) + 1);
  }
}
