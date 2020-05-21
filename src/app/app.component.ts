import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

interface platform {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'earnings-calc';
  autoTicks = false;
  disabled = false;
  invert = false;
  maxUsers = 160000;
  maxSlots = 10;
  min = 1;
  showTicks = false;
  step = 1;
  stepUsers = 100;
  thumbLabel = true;
  registeredUsers = 1;
  totalSlots = 1;
  vertical = false;
  tickInterval = 1;
  selectedValue: string;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  circularValue = 42336/160000 * 100;
  circularTitle = '$42336';

  platforms: platform[] = [
    {value: 'ehr', viewValue: 'EHR'},
    {value: 'Physician Networking', viewValue: 'Physician Networking'},
    {value: 'Medical Journal', viewValue: 'Medical Journal'},
    {value: 'Telemedicine', viewValue: 'Telemedicine'}
  ];

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  somethingChanged() {
    let earnings = this.registeredUsers * this.totalSlots;
    this.circularTitle = '$' + earnings;
    this.circularValue = (earnings / 1600000) * 100 ;
  }
}
