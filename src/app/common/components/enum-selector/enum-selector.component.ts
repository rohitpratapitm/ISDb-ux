import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EnumSelector } from '../../services/enum-selector';

@Component({
  selector: 'app-enum-selector',
  templateUrl: './enum-selector.component.html'
})
export class EnumSelectorComponent<T> {

  value: string;
  private enumValue: EnumSelector<T>;
  private tempValue: T;

  @Input()
  set anEnum(anEnum: EnumSelector<T>) {
    if (anEnum !== this.enumValue) {
      this.enumValue = anEnum;
      if (this.enumValue && this.tempValue) {
        this.selectedValue = this.tempValue;
        delete this.tempValue;
      }
    }
  }

  get anEnum(): EnumSelector<T> { return this.enumValue; }

  @Input()
  id: string;

  @Input()
  set selectedValue(value: T) {
    if (this.enumValue) {
      this.value = this.anEnum.getEnumName(value);
    } else {
      this.tempValue = value;
    }
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  private onChange: EventEmitter<EnumValueOnChangePayload<T>> = new EventEmitter<EnumValueOnChangePayload<T>>();

  triggerOnChangeEvent(key: string): void {
    const enumValueOnChangedPayload: EnumValueOnChangePayload<T> = {key, value: this.enumValue.getEnumValue(key) };
    this.onChange.emit(enumValueOnChangedPayload);
  }
}

export interface EnumValueOnChangePayload<T> {
  key: string;
  value: T;
}
