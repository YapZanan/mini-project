import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  templateUrl: './pagination-control.html',
})
export class PaginationControls {
  @Input() page = 0;
  @Input() disablePrev = false;
  @Input() isLoading = false;
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
