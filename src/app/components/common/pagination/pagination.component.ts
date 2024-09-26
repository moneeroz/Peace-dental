import { Component, inject, output, Signal } from '@angular/core';
import { PaginationArrowComponent } from './pagination-arrow/pagination-arrow.component';
import { PaginationNumberComponent } from './pagination-number/pagination-number.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginationArrowComponent, PaginationNumberComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  paginationService = inject(PaginationService);
  currentPage: Signal<number> = this.paginationService.currentPage;
  route = inject(ActivatedRoute);
  router = inject(Router);
  pageNumber = output<number>();
  totalPages = this.paginationService.totalPages;
  allPages = this.paginationService.allPages;

  calcPosition(index: number, page: string | number): string {
    let position = '';
    if (index === 0) position = 'first';
    if (index === this.allPages().length - 1) position = 'last';
    if (this.allPages().length === 1) position = 'single';
    if (page === '...') position = 'middle';

    return position;
  }

  emitPageNum(pageNum: number): void {
    this.pageNumber.emit(pageNum);
  }
}
