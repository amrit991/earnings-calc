import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

interface platform {
  value: string;
  viewValue: string;
}

interface country {
  value: string;
  currency: string;
  avgCpm: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'earnings-calc';
  autoTicks = false;
  disabled = false;
  invert = false;
  maxUsers = 100000;
  maxSlots = 10;
  min = 1;
  showTicks = false;
  step = 1;
  stepUsers = 1000;
  thumbLabel = true;
  showSubtitle = false;
  registeredUsers = 1;
  totalSlots = 1;
  vertical = false;
  tickInterval = 1;
  selectedPlatform: string = 'EHR';
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  circularValue: number;
  circularTitle: string;
  currency = {
    US: '$',
    India: '₹'
  };
  specialityFocussed: string = 'Yes';
  activeCountry: string = 'India';

  platforms: platform[] = [
    {value: 'EHR', viewValue: 'EHR'},
    {value: 'Physician Networking', viewValue: 'Physician Networking'},
    {value: 'Medical Journal', viewValue: 'Medical Journal'},
    {value: 'Telemedicine', viewValue: 'Telemedicine'}
  ];

  countryData = {
    India: {
      currency: '₹',
      avgCpm: 400
    },
    US: {
      currency: '$',
      avgCpm: 350
    }
  };
// avgImp is per user per year
  platformData = {
    'EHR': {
      avgImp: 1440,
      platformMultiplier: 0.9
    },
    'Physician Networking': {
      avgImp: 480,
      platformMultiplier: 0.3
    },
    'Medical Journal': {
      avgImp: 720,
      platformMultiplier: 0.5
    },
    'Telemedicine': {
      avgImp: 960,
      platformMultiplier: 0.6
    },
  };

  specialityMultiplier = {
    Yes: 1,
    No: 0.6
  };

  slotMultiplier = {
    1: 1.00,
    2: 1.80,
    3: 2.44,
    4: 2.95,
    5: 3.36,
    6: 3.69,
    7: 3.95,
    8: 4.16,
    9: 4.33,
    10: 4.46
  };

  ngOnInit() {
    this.somethingChanged();
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  somethingChanged() {
    console.log('---------');
    console.log('avgCpm/user/year: ', this.countryData[this.activeCountry].avgCpm);
    console.log('avgImp: ', this.platformData[this.selectedPlatform].avgImp);
    console.log('platformMultiplier: ', this.platformData[this.selectedPlatform].platformMultiplier);
    console.log('slotMultiplier:', this.slotMultiplier[this.totalSlots]);
    console.log('specialityMultiplier:', this.specialityMultiplier[this.specialityFocussed]);
    console.log('registeredUsers: ', this.registeredUsers);

    let grossEarnings = ((this.countryData[this.activeCountry].avgCpm) * 
                        (this.platformData[this.selectedPlatform].avgImp) * 
                        (this.platformData[this.selectedPlatform].platformMultiplier) * 
                        (this.slotMultiplier[this.totalSlots]) * 
                        (this.specialityMultiplier[this.specialityFocussed]) * 
                        (this.registeredUsers)) / 1000;
    grossEarnings = Math.round((grossEarnings + Number.EPSILON) * 100) / 100
    console.log(grossEarnings);
    let grossEarningsCurrency: string;
//    let earnings = this.registeredUsers * this.totalSlots;
    if(this.activeCountry == 'US') {
      grossEarningsCurrency = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(grossEarnings);
    } else {
      grossEarningsCurrency = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(grossEarnings);      
    }
    this.circularTitle = this.countryData[this.activeCountry].currency + ' ' + grossEarningsCurrency;
    this.circularValue = (grossEarnings / 231206400) * 100 ;
  }
}
