import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AplicacionService } from '../../../services/aplicacion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportecantidad',
  imports: [BaseChartDirective],
  templateUrl: './reportecantidad.component.html',
  styleUrl: './reportecantidad.component.css'
})
export class ReportecantidadComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'pie'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private aS: AplicacionService) { }
  ngOnInit(): void {
    this.aS.getQuantity().subscribe(data => {
      this.barChartLabels = data.map(item => item.nameServer)
      this.barChartData = [
        {
          data: data.map(item => item.quantityApp),
          label:'Cantidad apps por server',
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

