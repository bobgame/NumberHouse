import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'nw-con-menu',
  templateUrl: './con-menu.component.html',
  styleUrls: ['./con-menu.component.scss'],
})
export class ConMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  backGameMenu() {
    this.router.navigate(['/home'])
  }
}
