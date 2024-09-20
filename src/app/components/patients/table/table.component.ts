import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash, heroPencil } from '@ng-icons/heroicons/outline';
import { Ipatient } from '../../../interfaces/ipatient';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, NgIconComponent, CurrencyPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [provideIcons({ heroTrash, heroPencil })],
})
export class TableComponent {
  patients = input.required<Ipatient[]>();
  onDeletePatient = output<string>();

  onDelete(id: string) {
    this.onDeletePatient.emit(id);
  }
}
