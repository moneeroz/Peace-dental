import { computed, Injectable, Signal, signal } from '@angular/core';
import { generatePagination } from '../lib/utils';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  // Current page
  private readonly currentPageSignal = signal<number>(1);
  readonly currentPage = this.currentPageSignal.asReadonly();

  setCurrentPage(page: number): void {
    this.currentPageSignal.set(page);
  }

  // Total pages
  private readonly totalPagesSignal = signal<number>(1);
  readonly totalPages = this.totalPagesSignal.asReadonly();

  setTotalPages(pages: number): void {
    this.totalPagesSignal.set(pages);
  }

  // Paginated pages
  readonly allPages: Signal<(number | string)[]> = computed(() => {
    return generatePagination(this.totalPages(), this.currentPage());
  });
}
