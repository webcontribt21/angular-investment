import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pagination } from '../../../core/models';
import { I18nService } from '../../../core/services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() pagination: Pagination;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  paginationData$: Observable<{ text: string; isBegin: boolean; isEnd: boolean; isOnePage: boolean }>;

  constructor(private i18nService: I18nService) {}

  ngOnChanges() {
    this.paginationData$ = this.i18nService.getTranslationByKeys(['COMMON.PAGINATION.OF']).pipe(
      map(([{ label, value }]) => {
        const pag = this.pagination;
        const isLastPage: boolean = pag.offset + pag.limit > pag.totalCount;
        const limitTop: number = isLastPage ? pag.totalCount : pag.offset + pag.limit;
        return {
          text: pag.offset + 1 + ' - ' + limitTop + ' ' + label + ' ' + pag.totalCount,
          isBegin: pag.offset === 0,
          isEnd: pag.totalCount === limitTop,
          isOnePage: pag.totalCount <= pag.limit,
        };
      }),
    );
  }

  firstPage() {
    this.pageChanged.emit(0);
  }

  prevPage() {
    const newOffset: number = this.pagination.offset - this.pagination.limit;
    this.pageChanged.emit(newOffset);
  }

  nextPage() {
    const newOffset: number = this.pagination.offset + this.pagination.limit;
    this.pageChanged.emit(newOffset);
  }

  lastPage() {
    const itemsLastPage = this.pagination.totalCount % this.pagination.limit;
    const newOffset: number =
      itemsLastPage > 0 ? this.pagination.totalCount - itemsLastPage : this.pagination.totalCount - this.pagination.limit;
    this.pageChanged.emit(newOffset);
  }
}
