import { Component, Output, EventEmitter, Input } from "@angular/core";
import { getValueFromSliderChangeEvent } from "src/app/utils";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  // Two way data binding inputs
  @Input() minArrLen!: number;
  @Input() maxArrLen!: number;
  @Input() minElemSize!: number;
  @Input() maxElemSize!: number;
  @Input() target!: number;

  // Two way data binding outputs
  @Output() minArrLenChange = new EventEmitter<number>();
  @Output() maxArrLenChange = new EventEmitter<number>();
  @Output() minElemSizeChange = new EventEmitter<number>();
  @Output() maxElemSizeChange = new EventEmitter<number>();
  @Output() targetChange = new EventEmitter<number>();
  @Output() hideEmit = new EventEmitter();

  // Methods for triggering two way data binding event emitters
  onMinArrLenChange(event: Event) {
    const value = getValueFromSliderChangeEvent(event);

    this.minArrLenChange.emit(value);
  }

  onMaxArrLenChange(event: Event) {
    const value = getValueFromSliderChangeEvent(event);

    this.maxArrLenChange.emit(value);
  }

  onMinElemSizeChange(event: Event) {
    const value = getValueFromSliderChangeEvent(event);

    this.minElemSizeChange.emit(value);
  }

  onMaxElemSizeChange(event: Event) {
    const value = getValueFromSliderChangeEvent(event);

    this.maxElemSizeChange.emit(value);
  }

  onTargetChange(event: Event) {
    const value = getValueFromSliderChangeEvent(event);

    this.targetChange.emit(value);
  }

  // Tell parent component to hide this modal
  onHide() {
    this.hideEmit.emit();
  }
}
