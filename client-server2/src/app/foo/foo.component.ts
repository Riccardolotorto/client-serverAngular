import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  ngOnInit(): void {
    
  }
}
