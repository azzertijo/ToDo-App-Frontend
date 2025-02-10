import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailComponent { }
