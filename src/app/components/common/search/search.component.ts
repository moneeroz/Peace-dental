import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [provideIcons({ heroMagnifyingGlass })],
})
export class SearchComponent implements OnDestroy {
  fb = inject(FormBuilder);
  term = new FormControl('');
  supscription: Subscription;
  searchTerm = output<string | null>();
  placeHolder = input.required<string>();

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
