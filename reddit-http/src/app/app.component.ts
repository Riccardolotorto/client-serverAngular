import { Component, OnInit } from '@angular/core';
import { Foo } from './foo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reddit-http';
  data !: Foo[];
  obs !: Observable<Foo[]>;
  mostra: boolean = false;
  articles: Foo[] = [];
  constructor(private http: HttpClient) {
    this.obs = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
    this.obs.subscribe(this.getData);
  }
  getData = (data: Foo[]) => {
    this.data = data;   //aggiunge tutti gli articoli all'array di oggetti Foo
    console.log(this.data);
  }

  showData(): boolean {
    this.mostra = !this.mostra;
    return false
  }

  ngOnInit(): void {
    
  }
}
