import { Component, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Foo } from './foo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent {
  data !: Foo[];
  o !: Observable<Foo[]>;
  dataPosted !: Foo;
  obs !: Observable<Foo>;
  constructor(private http: HttpClient) {}
  makeRequest() : void {
    this.o = this.http.get<Foo[]>("https://jsonplaceholder.typicode.com/posts/1");
    this.o.subscribe(this.getData);
  }
  getData = (d : Foo[]) => {
    this.data = d;
  }

  makeRequestPost(): void {
    let data = JSON.stringify({
      body: 'bar',
      title: 'foo',
      userId: 1
    });
    const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };
    this.obs = this.http.post<Foo>("https://jsonplaceholder.typicode.com/posts", data, {headers});
    this.obs.subscribe(this.getDataPost);
  }
  getDataPost = (dd : Foo) => {
    console.log(dd)
    this.dataPosted = dd;
  }
}
