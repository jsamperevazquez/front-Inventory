import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { ProductElement } from "src/app/modules/product/product/product.component";
import { Chart } from "chart.js";
import ApexCharts from 'apexcharts'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  chartBar: any;
  doughnut: any;
  lineChart: any;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.getProduts();
  }


  getProduts() {
    this.productService.getProducts()
      .subscribe((data: any) => {
        console.log("Products response", data);
        this.proccessProductResponse(data);
      }, (error: any) => {
        console.log("Products error", error);
      }
      )
  }

  proccessProductResponse(resp: any) {

    const nameProduct: String[] = [];
    const amountProduct: number[] = [];

    if (resp.metadata[0].code == "00") {
      let listProduct = resp.product.products;
      listProduct.forEach((element: ProductElement) => {

        nameProduct.push(element.name);
        amountProduct.push(element.amount);
      });
    }
    //Build the chartBar
    this.chartBar = new Chart('canvas-bar', {
      type: 'bar',
      data: {
        labels: nameProduct,
        datasets: [
          { label: 'Products', data: amountProduct }
        ]
      }
    });

    //Build the doughnut
    this.doughnut = new Chart('canvas-doughnut', {
      type: 'doughnut',
      data: {
        labels: nameProduct,
        datasets: [
          { label: 'Products', data: amountProduct }
        ]
      }
    });

    //Build the apexCharts
    this.lineChart = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'Total',
        data: amountProduct
      }],
      xaxis: {
        categories: nameProduct
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), this.lineChart);

    chart.render();
  }
}
