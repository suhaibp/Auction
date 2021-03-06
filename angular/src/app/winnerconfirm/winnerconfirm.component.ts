import { Component, OnInit } from '@angular/core';
import { CanActivate,ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../services/user.service';
import { ProductService} from '../services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'winnerconfirm',
  templateUrl: './winnerconfirm.component.html',
  styleUrls: ['./winnerconfirm.component.css']
})
export class WinnerconfirmComponent implements OnInit {
  private sub: any;
  isConfirm : boolean = false;
  errorAlertAuth : Boolean = false;
  successAlert : Boolean = false;
  confirmAlert : Boolean = false;
  wrongAlert : Boolean = false;
  newproduct = {
    name : '',
    pin : '',
    phone : '',
    addr1 : '',
    addr2 : '',
    addr3 : '',
    addr4 : '',
    pid : '',
    };
    user_id : '';
    user_id1 :'';
    high_amount : number = 0;
    high_amount1 : number = 0;
    

  constructor(private userService:UserService, private productService:ProductService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.userService.getLoggedUSerDetails().subscribe(info =>{
      if(info.role !="user"){
        this.router.navigate(['/login']);
      }
    });
    let temp : number = 0;
    this.sub = this.route.params.subscribe(params => {
      this.newproduct.pid = params.id;
      this.productService.getProduct(params.id).subscribe(data => {
        for(let i=0; i<= data.bidders.length-1; i++){
          if(data.bidders[i].bid_status == "confirmed"){
            this.errorAlertAuth = true;
            setTimeout(() => {  
              this.router.navigate(['/home']);
            }, 1000);  
          }} 
          // To get the highest bid amt and bidder
          for(let i=0; i<= data.bidders.length-1; i++){
           if(data.bidders[i].bid_status != "confirmed" && data.bidders[i].bid_status != "rejected"){
                temp = data.bidders[i].amount;
                if(this.high_amount <= temp ){
                  this.high_amount = temp;
                  this.user_id = data.bidders[i].user_id;
                }
          } 
        }
      });
      this.userService.getLoggedUSerDetails().subscribe(data3 => {
        if(data3._id != this.user_id){
          this.errorAlertAuth = true;
          setTimeout(() => {  
            this.router.navigate(['/home']);
          }, 1000);  
        }
      });
   });
  }

  confirmed(){
    this.isConfirm = true;
  }

  rejected(){
    //update status n send mail to second person
    let temp : number = 0;
    this.productService.updateStatusReject(this.newproduct.pid).subscribe(data1 => {
      // console.log(data1);
      for(let i=0; i<= data1.bidders.length-1; i++){
        if(data1.bidders[i].bid_status != "confirmed" && data1.bidders[i].bid_status != "rejected"){
             temp = data1.bidders[i].amount;
             if(this.high_amount1 <= temp ){
               this.high_amount1 = temp;
               this.user_id1 = data1.bidders[i].user_id;
               
             }
       } 
     }
     console.log(this.user_id1);
    if(this.user_id1 != null){
      console.log(this.user_id1);
     this.userService.sendMailtoWinner(this.user_id1, this.newproduct.pid).subscribe(data2 =>{
     });
     this.productService.updateNotif(this.user_id1, this.newproduct.pid).subscribe(data5 =>{
     });
    }
     this.successAlert = true;
     setTimeout(() => {  
       this.router.navigate(['/home']);
     }, 1000);  
    });
  }

  onWinnerConfirm(){
    this.userService.saveAddress(this.newproduct).subscribe(data => {
      if(data.success==true){
        this.productService.updateStatusConfirm(this.newproduct.pid).subscribe(data1 => {
          if(data1.success==true){
            this.confirmAlert = true;
            setTimeout(() => {  
              this.router.navigate(['/home']);
            }, 2000);  
          }else{
            this.wrongAlert = true;
            setTimeout(() => {  
              this.router.navigate(['/home']);
            }, 1000);  
          }
    });
    }    
  });

}

}