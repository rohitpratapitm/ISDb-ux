import { EnumSelector } from './../../common/services/enum-selector';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchType } from 'src/app/common/enums/search-type.enum';
import { EnumValueOnChangePayload } from 'src/app/common/components/enum-selector/enum-selector.component';


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

  onChange(event: EnumValueOnChangePayload<SearchType>): void {
    this.selectedSearchType = event.value;
    this.selectedCriteria.emit(this.selectedSearchType);
  }

}
