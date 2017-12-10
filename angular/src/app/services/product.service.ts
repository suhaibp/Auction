
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

  deleteProduct(pro : any){
    let headers = new Headers({'Content-Type' : 'application/json'});
    let Options = new RequestOptions({headers : headers});
    return this.http.put(this._deleteUrl + pro._id, (pro),Options)
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
      return this.http.get(this.url + 'products/upcoming_products',{headers:headers})
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

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }
}
