import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-monthlyEarning',
  templateUrl: './monthlyEarning.component.html',
  styleUrls: ['./monthlyEarning.component.css']
})
export class MonthlyEarningComponent implements OnInit {

  DailySales : Number = 0
  MonthlySales : Number = 0
  YearlySales : Number = 0
  // formattedMonthlySales : any = {}

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.showMonthlyEarning()
    // this.showYearlyEarning()
    // this.showDailyEarning()
    // this.formatMonthlySales()
    
  }

  showMonthlyEarning() {
    this.orderService.getMonthlyEarning().subscribe({
      next: (response) => {
        this.MonthlySales = response.totalMonthlySales ;
        console.log(this.MonthlySales)
      }
    })
  }

  showYearlyEarning() {
    this.orderService.getMonthlyEarning().subscribe({
      next: (response) => {
        this.YearlySales = response
        console.log(this.YearlySales)
      }
    })
  }

  showDailyEarning() {
    this.orderService.getMonthlyEarning().subscribe({
      next: (response) => {
        this.DailySales = response
        console.log(this.DailySales)
      }
    })
  }

//   formatMonthlySales () {
//     this.formattedMonthlySales = {
//       totalMonthlySales: this.MonthlySales.toLocaleString()
//     };
//     console.log(this.formattedMonthlySales)
// };


}
