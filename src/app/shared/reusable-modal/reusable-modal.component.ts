import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reusable-modal',
  templateUrl: './reusable-modal.component.html',
  styleUrls: ['./reusable-modal.component.scss']
})
export class ReusableModalComponent implements OnInit {

  @Input() modalVisible: boolean = false;

  @Input() isLarge: boolean = true;

  @Input() title: string;

  @Input() modalId: string;

  @Output() close = new EventEmitter();

  constructor(private modal: ElementRef) { }

  ngOnInit(): void {

  }

  onClose(): void {
    this.close.emit(this.modal);
  }

}
