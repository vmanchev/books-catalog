import { Component, OnInit } from '@angular/core';
import { BooksService } from './services/books.service';

@Component({
  selector: 'boocks-catalog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.booksService.search().subscribe(data => console.log(data))
  }

}
