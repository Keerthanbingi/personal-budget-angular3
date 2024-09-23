import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  public dataSource = {
    labels: [],
        datasets:[
            {
                data: [],
                backgroundColor: [
                    '#4CAF50', 
                    '#FF9800',  
                    '#9C27B0',  
                    '#3F51B5', 
                    '#FFEB3B', 
                    '#E91E63',  
                    '#2196F3', 
                    '#FF5722',  
                    '#8BC34A'
                ],
            }
        ],
        myBudget: []
    };

  constructor(private http: HttpClient) {  }

  ngOnInit(): void{
    this.http.get('http://localhost:3000/budget')
    .subscribe((res:any)=>{
      for(var i = 0; i < res.myBudget.length; i++){
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.dataSource.myBudget.push({
            "title": res.data.myBudget[i].title,
            "budget": res.data.myBudget[i].budget
        })
    }
    this.createChart();

    });
  }

  createChart() {
    //var ctx =document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
