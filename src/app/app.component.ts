import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

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
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
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
  maxSlots = 10;
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

  enableUserEditMode() {
    this.editingUsers = true;
  }

  disableUserEditMode() {
    this.editingUsers = false;
  }

  somethingChanged() {
    let grossEarnings = ((this.countryData[this.activeCountry].avgCpm) * 
                        (this.platformData[this.selectedPlatform].avgImp) * 
                        (this.platformData[this.selectedPlatform].platformMultiplier) * 
                        (this.slotMultiplier[this.totalSlots]) * 
                        (this.specialityFocussed / 100) * 
                        (this.registeredUsers)) / 1000;
    grossEarnings = Math.round((grossEarnings + Number.EPSILON) * 100) / 100
    let grossEarningsCurrency: string;
    let maxGross: number;
    if(this.activeCountry == 'US') {
      grossEarningsCurrency = new Intl.NumberFormat('en-US').format(grossEarnings);
      maxGross = 350 * 1440 * 0.9 * 4.46 * 1 * this.maxUsers / 1000;
    } else {
      grossEarningsCurrency = new Intl.NumberFormat('en-IN').format(grossEarnings);      
      maxGross = 400 * 1440 * 0.9 * 4.46 * 1 * this.maxUsers / 1000;
    }
    this.circularTitle = this.countryData[this.activeCountry].currency + ' ' + grossEarningsCurrency;
    this.circularValue = (grossEarnings / maxGross) * 100 ;
  }
  
}
