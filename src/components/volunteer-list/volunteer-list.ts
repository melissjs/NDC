import { Auditor } from './../../models/auditor';
import { AuditServiceProvider } from './../../providers/audit-service/audit-service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'volunteer-list',
  templateUrl: 'volunteer-list.html'
})
export class VolunteerListComponent implements OnInit{

  auditors: Auditor[];

  constructor(private auditSvc: AuditServiceProvider) {
  }

  ngOnInit() {
    this.auditors = this.auditSvc.getAuditTeam();
  }

}
