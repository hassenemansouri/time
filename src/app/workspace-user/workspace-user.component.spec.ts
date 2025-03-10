import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceUserComponent } from './workspace-user.component';

describe('WorkspaceUserComponent', () => {
  let component: WorkspaceUserComponent;
  let fixture: ComponentFixture<WorkspaceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
