import { EnumSelector } from './../../common/services/enum-selector';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchType } from 'src/app/common/enums/search-type.enum';
import { EnumValueOnChangePayload } from 'src/app/common/components/enum-selector/enum-selector.component';

/**
 * This component shows a dropdown containing search criteria values.
 */
@Component({
  selector: 'app-search-criteria-dropdown',
  templateUrl: './search-criteria-dropdown.component.html'
})
export class SearchCriteriaDropdownComponent {

  searchTypeOptions: EnumSelector<SearchType> = new EnumSelector<SearchType>(SearchType);

  @Input()
  selectedSearchType: SearchType;

  @Output()
  selectedCriteria: EventEmitter<SearchType> = new EventEmitter<SearchType>();

  /**
   * This method emits the selected value in the dropdown.
   * @param event 
   */
  onChange(event: EnumValueOnChangePayload<SearchType>): void {
    this.selectedSearchType = event.value;
    this.selectedCriteria.emit(this.selectedSearchType);
  }

}
