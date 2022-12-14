import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDetalheComponent } from './lista-detalhe.component';

describe('ListaDetalheComponent', () => {
  let component: ListaDetalheComponent;
  let fixture: ComponentFixture<ListaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDetalheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
