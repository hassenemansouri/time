import { Component } from '@angular/core';
import {StrategicPartnership, StrategicPartnershipService} from '../strategicparternship.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-partnership',
  templateUrl: './add-partnership.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-partnership.component.css']
})
export class AddPartnershipComponent {

  partnership: StrategicPartnership = { id: '', name: '', description: '' };

  constructor(private partnershipService: StrategicPartnershipService) { }

  addPartnership(): void {
    this.partnershipService.addPartnership(this.partnership).subscribe(() => {
      alert('Partnership added successfully');
    });
  }
}
