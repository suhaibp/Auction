
import { Injectable, } from '@angular/core';
import { Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { pro } from '../pro';


@Injectable()
export class ProductService {
    // private _getUrl = '/api/polls';
    private _postUrl = '/products/addnew';
    private _updateProductUrl = '/products/updateProduct/';
    private _getUrl ='/products/products';
    private _deleteUrl ='/products/updatedel/';
    private _getWithIdUrl ='/products/product/';

    
    private _getOneUrl ='/products/product/';
    private _conStatusUrl ='/products/statusconfirm/';
    private _rejStatusUrl ='/products/statusreject/';
    private _getNotifUrl ='/products/getnotification/';
    private _updateNotifUrl ='/products/updatenotification/';
    private _adminViewedUrl ='/products/adminViewed/';
    authToken = '';
  
    url = "http://localhost:3000/";

  constructor(private http:Http) { }

  getAllClosedProduct(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.url + 'products/closed_products',{headers:headers})
      .map(res =>res.json());
  }

  getAProduct(proId){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this._getWithIdUrl + proId,{headers:headers})
    .map(res =>res.json());
}


  addProduct(prod : any){
    let headers = new Headers({'Content-Type' : 'application/json'});
    let Options = new RequestOptions({headers : headers});
    return this.http.post(this._postUrl, JSON.stringify(prod),Options)
    .map(res =>res.json());
  }

  getProducts(){
 
    return this.http.get(this._getUrl)
      .map((response: Response) => response.json());
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // return this.http.get(this.url + 'products/products',{headers:headers})
    // .map(res =>res.json());
  }



  updateProduct(pro : any){
  //  console.log(pro);
    let headers = new Headers({'Content-Type' : 'application/json'});
    let Options = new RequestOptions({headers : headers});
    return this.http.put(this._updateProductUrl + pro._id, (pro),Options)
    .map(res =>res.json());
    
  }

  deleteProduct(pid){
    let headers = new Headers({'Content-Type' : 'application/json'});
    let Options = new RequestOptions({headers : headers});
    return this.http.put(this._deleteUrl + pid,{},Options)
    .map(res =>res.json());
  }
 
  getAllrunningProduct(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.url + 'products/runnig_products',{headers:headers})
      .map(res =>res.json());
  }


  getAllUpcomingProduct(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.get(this.url + 'products/upcomingproduct',{headers:headers})
      .map(res =>res.json());
  }

  bidProduct(data){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'products/bid_a_product',data,{headers:headers})
    .map(res =>res.json());
  }

  getProduct(id){
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    let options = new RequestOptions({ headers : headers});
    // console.log(this._getOneUrl+id);
    return this.http.get(this._getOneUrl + id,options)
      .map((response : Response) => response.json());
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }
  

  updateStatusConfirm(pid){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers : headers});
    return this.http.put(this._conStatusUrl+pid,{},{ headers : headers})
    .map((response : Response) => response.json());
  }

  updateStatusReject(pid){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers : headers});
    return this.http.put(this._rejStatusUrl+pid,{},{ headers : headers})
    .map((response : Response) => response.json());
  }

  getNotif(user_id){
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    let options = new RequestOptions({ headers : headers});
    return this.http.get(this._getNotifUrl + user_id,options)
      .map((response : Response) => response.json());
  }


  updateNotif(user_id, pid){
    let product = {"_id" : pid, "user_id" : user_id};
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    let options = new RequestOptions({ headers : headers});
    return this.http.put(this._updateNotifUrl + pid,JSON.stringify(product),options)
      .map((response : Response) => response.json());
  }

  adminViewed(pid){
    let headers = new Headers({ 'Content-Type' : 'application/json'});
    let options = new RequestOptions({ headers : headers});
    // console.log(this._adminViewedUrl+pid);
   return this.http.put(this._adminViewedUrl + pid,options)
   .map((response : Response) => response.json());
  }
}
