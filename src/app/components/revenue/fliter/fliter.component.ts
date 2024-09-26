import { Component, inject, input, OnDestroy, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-fliter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './fliter.component.html',
  styleUrl: './fliter.component.scss',
})
export class FliterComponent implements OnDestroy {
  fb = inject(FormBuilder);
  term = new FormControl('');
  supscription: Subscription;

  filterTerm = output<string | number | null>();
  data = input.required<{ id: string | number; name: string }[]>();
  label = input.required<string>();

  constructor() {
    this.supscription = this.term.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((term) => {
        this.filterTerm.emit(term);
      });
  }

  ngOnDestroy() {
    this.supscription.unsubscribe();
  }
}
