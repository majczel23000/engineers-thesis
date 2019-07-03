import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current-path',
  templateUrl: './current-path.component.html',
  styleUrls: ['./current-path.component.css']
})
export class CurrentPathComponent implements OnInit {

  @Input() currentPathItems: string[];

  constructor() { }

  ngOnInit() {
  }

}
