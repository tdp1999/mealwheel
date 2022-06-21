import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';

interface WheelItem {
    fillStyle: string;
    text: string;
    id: number;
    textFillStyle: string;
    textFontSize: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild(NgxWheelComponent, { static: false }) wheel: any;

    // UI
    textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
    textAlignment: TextAlignment = TextAlignment.OUTER;
    colors = ['#FF0000', '#000000'];

    // Data
    items: WheelItem[] = [];

    // Form
    meal: string = '';

    // Result
    idToLandOn: number = 0;

    constructor(private _cdr: ChangeDetectorRef) {
        this.loadItems();
        this.randomize();
    }

    ngOnInit(): void {
        this.randomize();
    }

    ngAfterViewInit() {}

    // Spin
    onSpinComplete() {
        window.alert(`You landed on ${this.items[this.idToLandOn].text}`);
        this.randomize();
        this.resetWheel();
    }

    randomize() {
        if (this.items.length !== 0) {
            this.idToLandOn =
                this.items[Math.floor(Math.random() * this.items.length)].id;
        }
    }

    resetWheel() {
        this.wheel.reset();
        this._cdr.markForCheck();
    }

    // Form
    onSubmit() {
        let item: WheelItem = {
            fillStyle:
                this.items.length % 2 === 0 ? this.colors[0] : this.colors[1],
            text: this.meal,
            id: this.items.length,
            textFillStyle: 'white',
            textFontSize: '16',
        };
        this.meal = '';
        this.items.push(item);
        this.saveItem();
        this.randomize();
        this.resetWheel();
    }

    deleteItem(index: number) {
        this.items.splice(index, 1);
        this.saveItem();
        this.resetWheel();
    }

    loadItems() {
        let items = window.localStorage.getItem('items');
        if (items) {
            this.items = JSON.parse(items);
        }
    }

    saveItem() {
        window.localStorage.removeItem('items');
        window.localStorage.setItem('items', JSON.stringify(this.items));
    }

    removeAllItems() {
        window.localStorage.removeItem('items');
        this.items = [];
        this.resetWheel();
    }
}
