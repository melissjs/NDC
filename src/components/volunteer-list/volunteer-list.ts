import { Component } from '@angular/core';
// Models
import { Volunteer} from '../../models/volunteer';
// Services
import { VolunteerServiceProvider } from '../../providers/volunteer-service/volunteer-service';

@Component({
  selector: 'volunteer-list',
  templateUrl: 'volunteer-list.html'
})
export class VolunteerListComponent {

  volunteers: Volunteer[];

  constructor(private volSvc: VolunteerServiceProvider) {
    this.volSvc.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers;
    });
  }

}
