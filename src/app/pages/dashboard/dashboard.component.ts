import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from 'src/app/Service/dashboard.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public userCount: number = 0; 
  public parkingLotsCount: number = 0; 
  public reservationCount: number = 0; 
  public userCountSinceLastMonth: number = 0;
  public reservationCountSinceLastWeek: number = 0;
  public posteCount: number = 0;
  public lotsCount: number = 0;
  public spotsCount: number = 0;
  public spotTypeCounts: any;
  public vehicleData: any = {
    "SCOOTER": 0,
    "HANDICAPPED": 0,
    "MOTORCYCLES": 0,
    "CAR": 0,
    "BICYCLE": 0
  };

  constructor(private dashboardService: DashboardService ) { } 

  ngOnInit() {

    this.createChart();

    this.dashboardService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    this.dashboardService.getParkingLotsCount().subscribe(count => {
      this.parkingLotsCount = count;
    });
    this.dashboardService.getReservationCount().subscribe(count => {
      this.reservationCount = count;
    });
    this.dashboardService.getUserCountSinceLastMonth().subscribe(count => {
      this.userCountSinceLastMonth = count;
    });

    this.dashboardService.getReservationCountSinceLastWeek().subscribe(count => {
      this.reservationCountSinceLastWeek = count;
    });
    this.dashboardService.getPosteCount().subscribe(count => {
      this.posteCount = count;
    });
    this.dashboardService.getLotsCount().subscribe(count => {
      this.lotsCount = count;
    });
    this.dashboardService.getSpotsCount().subscribe(count => {
      this.spotsCount = count;

    });

    this.dashboardService.getMostVisitedSpot().subscribe(data => {
      this.spotTypeCounts = data;
     // this.updateVehicleData(data);
     // this.createChart(vehicleData);
      
    });
    this.dashboardService.getCar().subscribe(count => {
      this.vehicleData.CAR = count;
      this.updateChart();
    });

    this.dashboardService.getHandicap().subscribe(count => {
      this.vehicleData.HANDICAPPED = count;
      this.updateChart();
    });

    this.dashboardService.getMotor().subscribe(count => {
      this.vehicleData.MOTORCYCLES = count;
      this.updateChart();
    });

    this.dashboardService.getBicycle().subscribe(count => {
      this.vehicleData.BICYCLE = count;
      this.updateChart();
    });

    this.dashboardService.getScooter().subscribe(count => {
      this.vehicleData.SCOOTER = count;
      this.updateChart();
    });
  }
  updateChart() {
    const labels = Object.keys(this.vehicleData);
    const dataValues = Object.values(this.vehicleData);

    this.salesChart.data.labels = labels;
    this.salesChart.data.datasets[0].data = dataValues;
    this.salesChart.update();
  }

  
  createChart() {
    const labels = Object.keys(this.vehicleData);
    const dataValues = Object.values(this.vehicleData);
  
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Spot Type',
          data: dataValues,
          backgroundColor: 'orange'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            fontColor: '#333',
            fontSize: 14
          }
        },
        title: {
          display: true,
          text: 'Spot Count Chart',
          fontSize: 18,
          fontColor: '#666'
        },
        tooltips: {
          enabled: true,
          backgroundColor: '#ccc',
          titleFontColor: '#333',
          bodyFontColor: '#333'
        }
      }
    });
  }

  updateVehicleData(newData: any) {
    this.vehicleData = newData;
    this.createChart(); // Update the chart when data changes
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
  

   /* this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }*/
 

