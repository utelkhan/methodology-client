import {PageModel} from './filter-details/page';
import {SortModel} from './filter-details/sort';

export class FilterModel {
  constructor(
    public searchValue: string,
    public pageModel: PageModel,
    public sortModel: SortModel) {}
}
