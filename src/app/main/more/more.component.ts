import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app-config';

@Component({
  selector: 'nw-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {

  version = AppConfig.version

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  backToHome() {
    this.router.navigate(['/home'])
  }


}
