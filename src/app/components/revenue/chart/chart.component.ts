import { Component, input } from '@angular/core';
import { IChartData } from '../../../interfaces/ichart-data';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowPath } from '@ng-icons/heroicons/outline';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxChartsModule, NgIconComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  providers: [provideIcons({ heroArrowPath })],
})
export class ChartComponent {
  data = input.required<IChartData[]>();

  // chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Revenue';
  legendTitle: string = 'Status';
  legendPosition: LegendPosition = LegendPosition.Below;
  showGridLines: boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#64B5F6', '#E57373', '#AAAAAA'],
  };
}
