import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'books-catalog-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements AfterViewInit, OnDestroy {
  @Output() onKeywordChanged: EventEmitter<string> = new EventEmitter();
  @ViewChild('filterInput') filterInput: ElementRef;

  private destroy$ = new Subject();

  ngAfterViewInit(): void {
    this.detectKeywordChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  resetInput() {
    this.filterInput.nativeElement.value = null;
    this.onKeywordChanged.emit(null);
  }

  private detectKeywordChange() {
    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(() =>
        this.onKeywordChanged.emit(
          this.filterInput.nativeElement.value.trim().toLowerCase()
        )
      );
  }
}
