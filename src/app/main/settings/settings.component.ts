import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'nw-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  backToHome() {
    this.router.navigate(['/home'])
  }

}
