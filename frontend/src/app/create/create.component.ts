import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBook } from '@app/types/create-book.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'books-catalog-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    isbn: new FormControl(null, Validators.required),
    cover: new FormControl(null, Validators.required),
    description: new FormControl(),
  });

  selectedFile: File = null;
  srcResult: string = null;

  private destroy$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.handleApiErrors();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.loadImagePreview();
  }

  removeFile() {
    this.selectedFile = null;
    this.srcResult = null;
    this.fileInput.nativeElement.value = null;
  }

  handleSubmit() {
    const book = {
      ...this.form.value,
      cover: this.selectedFile,
    } as CreateBook;

    this.store.dispatch(BooksActions.resetError());
    this.store.dispatch(BooksActions.submitNewBook({ book }));
  }

  private handleApiErrors() {
    this.store
      .select(BooksSelectors.selectError)
      .pipe(
        filter((error) => !!error),
        takeUntil(this.destroy$)
      )
      .subscribe((error) => {
        if (error === 'ISBN.DUPLICATE') {
          this.form.controls.isbn.setErrors({ duplicate: true });
        }
      });
  }

  private loadImagePreview() {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.srcResult = e.target.result;
    };

    reader.readAsDataURL(this.selectedFile);
  }
}
