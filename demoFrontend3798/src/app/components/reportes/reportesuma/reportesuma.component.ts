import { ServidorService } from '../../../services/servidor.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportesuma',
  imports: [BaseChartDirective],
  templateUrl: './reportesuma.component.html',
  styleUrl: './reportesuma.component.css'
})
export class ReportesumaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'line'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private sS: ServidorService) { }
  ngOnInit(): void {
    this.sS.getSum().subscribe(data => {
      this.barChartLabels = data.map(item => item.nameServer)
      this.barChartData = [
        {
          data: data.map(item => item.amountTotal),
          label:'Monto por servidor',
          backgroundColor:[
            '#CC0000',
            '#FF0000'
          ],
          borderColor:'#CC0000',
          borderWidth:1

        }
      ]
    })
  }

}
