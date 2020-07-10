import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CanvasService } from '../../core/services/canvas/canvas.service';

@Component({
  selector: 'velooc-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements OnInit, AfterViewInit {
  context: CanvasRenderingContext2D;
  canvas;
  lastPos;
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;
  @ViewChild('myCanvasContainer', { static: false }) myCanvasContainer: ElementRef;
  @HostListener('touchstart', ['$event'])
  touchStart(event: any) {
    this.canvasService.touchStart(event);
  }
  @HostListener('touchmove', ['$event'])
  touchMove(event: any) {
    this.canvasService.touchMove(event);
  }
  @HostListener('touchend', ['$event'])
  touchEnd(event: any) {
    this.canvasService.touchEnd(event);
  }
  @HostListener('mouseenter', ['$event'])
  mouseEnter(event: MouseEvent) {
    this.canvasService.mouseEnter(event);
  }
  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent) {
    this.canvasService.mouseDown(event);
  }
  @HostListener('mousemove', ['$event'])
  mouseMove(event: MouseEvent) {
    this.canvasService.mouseMove(event);
  }
  @HostListener('mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    this.canvasService.mouseUp(event);
  }
  @HostListener('mouseleave', ['$event'])
  mouseLeave(event: MouseEvent) {
    this.canvasService.mouseLeave(event);
  }
  @HostListener('window:click', ['$event'])
  checkDataClick() {
    const url = this.canvasService.storageCanvas(this.canvas).url;
    this.canvasService.emitUrlImageCanvas({ url });
  }
  @HostListener('window:touchend', ['$event'])
  checkDataTouch() {
    const url = this.canvasService.storageCanvas(this.canvas).url;
    this.canvasService.emitUrlImageCanvas({ url });
  }

  constructor(private canvasService: CanvasService) {}

  ngOnInit(): void {}

  redraw() {
    this.canvasService.clear();
  }

  ngAfterViewInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.lastPos = null;
    this.canvasService.setCanvas({ canvas: this.canvas, context: this.context, lastPos: this.lastPos });
    this.canvasService.context.strokeStyle = '#000000';
    this.canvas.width = 500;
    this.canvas.height = 300;
    this.redraw();
  }
}
