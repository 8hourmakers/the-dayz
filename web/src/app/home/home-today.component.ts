import { Component } from '@angular/core';

@Component({
  selector: 'app-home-today',
  templateUrl: './home-today.component.html',
  styleUrls: ['./home-today.component.css']
})
export class HomeTodayComponent {
  public today: Date = new Date();
}
