import {Directive, ElementRef, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
declare var Hammer: any;

@Directive({
    selector: '[swipe-vertical]' // Attribute selector
})
export class SwipeVertical implements OnInit, OnDestroy {
    @Output() onSwipeUp = new EventEmitter();
    @Output() onSwipeDown = new EventEmitter();

    private el: HTMLElement;
    private swipeGesture: Gesture;
    private swipeDownGesture: Gesture;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        this.swipeGesture = new Gesture(this.el, {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_VERTICAL}]
            ]
        });
        this.swipeGesture.listen();
        this.swipeGesture.on('swipeup', e => {
            this.onSwipeUp.emit({ el: this.el });
        });
        this.swipeGesture.on('swipedown', e => {
            this.onSwipeDown.emit({ el: this.el });
        });
    }

    ngOnDestroy() {
        this.swipeGesture.destroy();
    }
}