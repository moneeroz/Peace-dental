import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-number',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination-number.component.html',
  styleUrl: './pagination-number.component.scss',
})
export class PaginationNumberComponent {
  page = input.required<string | number>();
  link = input.required<string>();
  isActive = input<boolean>(false);
  position = input.required<string>();
  pageChange = output<number>();

  emitPageNum(): void {
    this.pageChange.emit(Number(this.page()));
  }
}
