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
  maxUsersIndia = 400000;
  maxUsersUS = 1000000;
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
  showSubtitle = true;
  registeredUsers = 50;
  registeredUsersComma = '50';
  totalSlots = 1;
  vertical = false;
  tickInterval = 1;
  editingUsers = false;
  selectedPlatform: string = 'Electronic Health Record';
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  circularValue: number;
  circularTitle: string;
  funSubtitle: string = '';
  richAndFamous: string;
  currency = {
    US: '$',
    India: '₹'
  };
  formatSubtitle = () => {
    return ['Cheers! That\'s the net worth of ', this.richAndFamous];
  }
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
      avgCpm: 500
    },
    US: {
      currency: '$',
      avgCpm: 350
    }
  };
// avgImp is per user per year
  platformData = {
    'Electronic Health Record': {
      avgImp: 9600,
      platformMultiplier: 0.9
    },
    'Physician Networking': {
      avgImp: 576,
      platformMultiplier: 0.3
    },
    'Medical Journal': {
      avgImp: 768,
      platformMultiplier: 0.5
    },
    'Telemedicine': {
      avgImp: 1920,
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
    this.registeredUsersComma = new Intl.NumberFormat('en-US').format(this.registeredUsers);
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
    if(this.activeCountry === 'US') {
      if(this.registeredUsers > 1000000) {
        this.registeredUsers = 1000000;
      }
    } else if(this.activeCountry === 'India') {
      if(this.registeredUsers > 400000) {
        this.registeredUsers = 400000;
      }
    }

    if(this.registeredUsers < 50) {
      this.registeredUsers = 50;
    }

    let grossEarnings = ((this.countryData[this.activeCountry].avgCpm) * 
                        (this.platformData[this.selectedPlatform].avgImp) * 
                        (this.platformData[this.selectedPlatform].platformMultiplier) * 
                        (this.slotMultiplier[this.totalSlots]) * 
                        (this.registeredUsers)) / 1000;
    let specialists = this.specialityFocussed;
    let nonSpecialists = 100 - specialists;
    grossEarnings = ( ((grossEarnings * specialists) / 100) * this.specialityMultiplier.specialist) + 
                    ( ((grossEarnings * nonSpecialists) / 100) * this.specialityMultiplier.nonSpecialist);
    grossEarnings = Math.round((grossEarnings + Number.EPSILON) * 100) / 100;
    grossEarnings = Math.round(grossEarnings);
    this.richAndFamous = '';
    if(this.activeCountry == 'US') {
      if(grossEarnings > 28000000000) {
        this.richAndFamous = 'McKenzie Bezos';
      } else if(grossEarnings > 23000000000 && grossEarnings < 28000000000) {
        this.richAndFamous = 'Elon Musk';
      } else if(grossEarnings > 16000000000 && grossEarnings < 23000000000) {
        this.richAndFamous = 'Michael Dell';
      } else if(grossEarnings > 12000000000 && grossEarnings < 16000000000) {
        this.richAndFamous = 'Rupert Murdoch';
      } else if(grossEarnings > 8000000000 && grossEarnings < 12000000000) {
        this.richAndFamous = 'Shiv Nader';
      } else if(grossEarnings > 5000000000 && grossEarnings < 8000000000) {
        this.richAndFamous = 'Jim Kennedy';
      } else if(grossEarnings > 2000000000 && grossEarnings < 5000000000) {
        this.richAndFamous = 'Donald Trump';
      } else if(grossEarnings > 700000000 && grossEarnings < 2000000000) {
        this.richAndFamous = 'Jay-Z + Beyonce';
      } else if(grossEarnings > 500000000 && grossEarnings < 700000000) {
        this.richAndFamous = 'Jennifer Lopez';
      } else {
        this.richAndFamous = '';
        this.showSubtitle = false;
      }

      if (this.richAndFamous !== '') {
        this.showSubtitle = true;
      }
    } else {
      this.showSubtitle = false;
    }

    let grossEarningsCurrency: string;
    let maxGross: number;
    if(this.activeCountry == 'US') {
      grossEarningsCurrency = new Intl.NumberFormat('en-US').format(grossEarnings);
      maxGross = 350 * 9600 * 0.9 * 10.8 * 1 * this.maxUsersUS / 1000;
      maxGross = Math.round(maxGross);
    } else {
      grossEarningsCurrency = new Intl.NumberFormat('en-IN').format(grossEarnings);      
      maxGross = 500 * 9600 * 0.9 * 10.8 * 1 * this.maxUsersIndia / 1000;
      maxGross = Math.round(maxGross);
    }
    this.circularTitle = this.countryData[this.activeCountry].currency + grossEarningsCurrency;
    this.circularValue = (grossEarnings / maxGross) * 100 ;
    


  }
  
}
