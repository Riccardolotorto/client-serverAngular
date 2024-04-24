import { Component } from '@angular/core';
import { Foo } from './foo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reddit-http2';
  data!: Foo[];
  obs!: Observable<Foo[]>;
  constructor(private http:HttpClient) {}
  makeGet(): void{
    this.obs = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts/1');
    this.obs.subscribe(this.getData);
  }
  getData = (data: Foo[]) => {
    this.data = data;
    console.log(this.data);
  }
}
