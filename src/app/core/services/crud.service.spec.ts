import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import { TableModel } from 'src/app/shared/models/table-models/base-models/table-model';

describe('CrudService', () => {
  let service: CrudService<TableModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
