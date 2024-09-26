import { Component, inject, OnDestroy, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'revenue-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  fb = inject(FormBuilder);
  term = new FormControl(new Date().getFullYear().toString());
  supscription: Subscription;
  searchTerm = output<string | null>();

  constructor() {
    this.supscription = this.term.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm.emit(term);
      });
  }

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }
}
