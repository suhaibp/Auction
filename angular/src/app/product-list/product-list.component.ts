import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from './../services/product.service';
import { FilterPipe } from '../filter.pipe';
import { pro } from '../pro';
import { Router } from '@angular/router';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
  // pipes :[]
 
  inputs :['pros'],
  outputs : ['SelectPro'],
  //  pipes: [ProductPipe],
})
export class ProductListComponent implements OnInit {
  pros: any;
  prodata: any;
  tableview: boolean = true;
  arr1 : any;
  start_date :Date
  end_date : Date
  // private deleteProEvent = new EventEmitter();
  public SelectPro = new EventEmitter();
  constructor(private _prductService : ProductService, private router: Router) { }

  ngOnInit() {
    // this.arr1=[];
  this._prductService.getProducts().subscribe(data1 => {
    this.arr1 = data1;
 
    // console.log(data1);
  //  data1.forEach(function(item) {
  //   this.arr1.push(item);
  //   console.log(this.arr1);
  //  });
  // this.prodata = data1;
      });



  }



onSelect(){

  // this.router.navigate(['/product-detail'+prodata.id])
 
  // this.tableview = false;

}

deletePro(prod : pro){
  this.SelectPro.emit(prod);
  this.tableview = false;
}
datepickerOpts1 = {
  startDate: new Date(Date.now()),
  
  autoclose: true,
  todayBtn: 'linked',
  todayHighlight: true,
  assumeNearbyYear: true,
  format: 'd MM yyyy',
  
}


}
