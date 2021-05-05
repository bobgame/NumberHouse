import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'nw-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  backToHome() {
    this.router.navigate(['/home'])
  }
}
