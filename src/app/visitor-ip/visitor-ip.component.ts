import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { IIp } from "../interfaces/i-ip";

@Component({
  selector: 'app-visitor-ip',
  templateUrl: './visitor-ip.component.html',
  styleUrls: ['./visitor-ip.component.css']
})
export class VisitorIpComponent implements OnInit {

  private IpModel : IIp;
  private s : string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getIP();
  }

  public getIP(){
    this.apiService.getIP().subscribe((data: any) => {
      this.IpModel = data;
      console.log(data);
    },
    error => console.log(error));
  }
}
