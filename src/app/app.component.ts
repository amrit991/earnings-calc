import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';

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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) document){
    this.matIconRegistry.addSvgIcon(
      `unicorn_edit_icon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/Earning\ Calculator\ -03.svg")
    );
  }
  title = 'earnings-calc';
  autoTicks = false;
  disabled = false;
  invert = false;
  maxUsers = 1000000;
  maxSlots = 30;
  min = 1;
  minUsers = 50;
  minSpeciality = 1;
  maxSpeciality = 100;
  stepSpeciality = 1;
  showTicks = false;
  step = 1;
  stepUsers = 50;
  thumbLabel = true;
  showSubtitle = false;
  registeredUsers = 50;
  totalSlots = 1;
  vertical = false;
  tickInterval = 1;
  editingUsers = false;
  selectedPlatform: string = 'Electronic Health Record';
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  circularValue: number;
  circularTitle: string;
  currency = {
    US: '$',
    India: '₹'
  };
  specialityFocussed: number = 37;
  activeCountry: string = 'India';

  platforms: platform[] = [
    {value: 'Electronic Health Record', viewValue: 'Electronic Health Record'},
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
    'Electronic Health Record': {
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
    'specialist': 1,
    'nonSpecialist': 0.6
  };

  slotMultiplier = {
    1: 1.00,
    2: 1.80,
    3: 2.55,
    4: 3.25,
    5: 3.85,
    6: 4.35,
    7: 4.75,
    8: 5.15,
    9: 5.50,
    10: 5.80,
    11: 6.05,
    12: 6.30,
    13: 6.55,
    14: 6.80,
    15: 7.05,
    16: 7.30,
    17: 7.55,
    18: 7.80,
    19: 8.05,
    20: 8.30,
    21: 8.55,
    22: 8.80,
    23: 9.05,
    24: 9.30,
    25: 9.55,
    26: 9.80,
    27: 10.05,
    28: 10.30,
    29: 10.55,
    30: 10.80
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

  enableUserEditMode() {
    this.editingUsers = true;
  }

  disableUserEditMode() {
    this.editingUsers = false;
  }

  somethingChanged() {
    if(this.registeredUsers > 1000000) {
      this.registeredUsers = 1000000;
    }
    if(this.registeredUsers < 50) {
      this.registeredUsers = 50;
    }
    let grossEarnings = ((this.countryData[this.activeCountry].avgCpm) * 
                        (this.platformData[this.selectedPlatform].avgImp) * 
                        (this.platformData[this.selectedPlatform].platformMultiplier) * 
                        (this.slotMultiplier[this.totalSlots]) * 
                        (this.registeredUsers)) / 1000;

    console.log(this.specialityFocussed);
    console.log(100 - this.specialityFocussed);
    let specialists = this.specialityFocussed;
    let nonSpecialists = 100 - specialists;
    console.log('grossEarnings before spec: ', grossEarnings);
    grossEarnings = ( ((grossEarnings * specialists) / 100) * this.specialityMultiplier.specialist) + 
                    ( ((grossEarnings * nonSpecialists) / 100) * this.specialityMultiplier.nonSpecialist);
    console.log('grossEarnings after spec: ', grossEarnings);
    grossEarnings = Math.round((grossEarnings + Number.EPSILON) * 100) / 100;
    
    let grossEarningsCurrency: string;
    let maxGross: number;
    if(this.activeCountry == 'US') {
      grossEarningsCurrency = new Intl.NumberFormat('en-US').format(grossEarnings);
      maxGross = 350 * 1440 * 0.9 * 10.8 * 1 * this.maxUsers / 1000;
    } else {
      grossEarningsCurrency = new Intl.NumberFormat('en-IN').format(grossEarnings);      
      maxGross = 400 * 1440 * 0.9 * 10.8 * 1 * this.maxUsers / 1000;
    }
    this.circularTitle = this.countryData[this.activeCountry].currency + ' ' + grossEarningsCurrency;
    this.circularValue = (grossEarnings / maxGross) * 100 ;
  }
  
}
