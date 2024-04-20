import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from './foo.model';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit{
  data !: any;
  o !: Observable<any>;
  loading !: boolean;
  obs !: Observable<any>;
  fooData !: Foo[];
  oFoo !: Observable<Foo[]>;   //utilizzo una variabile observable che però ha un dato specifico, in questo caso oggetto della classe Foo
  constructor(private http: HttpClient) {}
  makeRequest(): void {
    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1');
    this.o.subscribe(this.getData);
    this.loading = true;
  }
  getData = (data: any) => {
    this.data = data;   //due variabili any: una creata all'inizio della classe e l'altra all'interno della funzione getData
    this.loading = false;
  }
  makeRequestPost(): void {
    this.obs = this.http.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify({body: 'bar',title: 'foo',userId: 1}));
    this.loading = true;
    this.obs.subscribe(this.getDataPost);
  }
  getDataPost = (d: any) => {
    this.data = d;
    this.loading = false;
  }
  makeTypedRequest() : void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
    this.loading = true;
    this.oFoo.subscribe(this.getDataTyped);
  }
  getDataTyped = (dd: Foo[]) => {
    this.fooData = dd;
    this.loading = false
  }

  ngOnInit(): void {
    
  }
}
