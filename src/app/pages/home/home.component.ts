import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  selected = '';
  stops = [];
  trams = [];
  infoMsg = "";
  displayedColumns: string[] = ['destination', 'carriages', 'status', 'wait'];

  loading = false;

  constructor(
    public restApi: RestApiService
  ) {
    setInterval(() => { this.countdownArr(); }, 1000);
    setInterval(() => { this.getTrams(); }, 30000);
  }

  ngOnInit() {
    this.getStops();
    console.log("init");
  }

  getStops() {
    this.restApi.getStopNames().subscribe(data => {

      this.stops = data.data.data; // oops
      console.dir(this.stops);
    })
  }

  getTrams() {
    console.log("polling!");
    if (this.selected != "") {
      this.loading = true;
      this.restApi.getStopData(this.selected).subscribe(data => {
        this.loading = false;
        this.trams = data.data.data; // oops again
        this.infoMsg = data.data.infoMsg;
        console.dir(this.trams);

      }, error => { this.loading = false; }
      )
    }
  }

  countdownArr() {
    this.trams.forEach(element => {

      var secs = element.seconds;
      var mins = element.wait;
      if (mins < 0) {
        secs = 0;
      } else {
        secs = +secs - 1;
        if (secs < 0) {
          secs = 59;
          mins = +mins - 1;
        }

        if (+secs < 10) {
          secs = "0" + (secs * 1);
        }

        if (+mins < 10) {
          mins = "0" + (mins * 1);
        }

        element.wait = mins + "";
        element.seconds = secs + "";
      }
    });
  }



}
