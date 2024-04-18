import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foo } from './foo.model';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit{
  data !: Object;
  loading !: boolean;
  o !: Observable<Object>;
  obs_post !: Observable<any>;
  fooData !: Foo[];  //creo un array di oggetti Foo
  oFoo !: Observable<Foo[]>;   //creo una variabile observable che riceverà oggetti di tipo Foo
  constructor(public http: HttpClient) { }  //come se creasse una variabile prima (http : HttpClient all'interno della classe). In questo modo la crea direttamente pubblica
  makeRequest(): void {
    console.log("here");
    this.loading = true;
    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    this.o.subscribe(this.getData);
  }
  getData = (d: Object) => {
    this.data = new Object(d);
    this.loading = false;
  }
  //metodo post
  makeCompactPost(): void {
    let datatopost = JSON.stringify({
      body: 'bar',
      title: 'foo',
      userId: 1
    })
    this.loading = true;
    this.obs_post = this.http.post('https://jsonplaceholder.typicode.com/posts', datatopost);
    this.obs_post.subscribe(this.getDataPost);
  }
  getDataPost = (data: any) => {
    this.data = data;
    this.loading = false;
  }
  //metodi get e post tipizzati
  makeTypedRequest() : void
  {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
    this.oFoo.subscribe(this.getTypedGet);
  } 
  getTypedGet = (data: Foo[]) => {
    this.fooData = data;
  }

  ngOnInit(): void {
    
  }
}
