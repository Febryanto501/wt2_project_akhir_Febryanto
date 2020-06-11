import { Component, OnInit } from "@angular/core";

import { CoronaService } from "./corona.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "ns-items",
    templateUrl: "./corona.component.html",
})
export class CoronaComponent implements OnInit {
    $coronas: BehaviorSubject<Array<any>>;
    coronas = [];
    idxstart = 0;

    constructor(private cs: CoronaService) {
        this.$coronas = new BehaviorSubject([]);
    }

    ngOnInit(): void {
        this.cs.getCoronas().subscribe(
            (response: any) => {
                this.coronas.push(...response);
                this.$coronas.next(this.coronas);
                //console.log(this.coronas);
            },
            (err) => console.log(err)
        );
    }

    loadMore() {
        console.log("called");
        if (this.coronas.length <= 0) return;
        this.idxstart += 20;
        this.cs.getCoronas(this.idxstart).subscribe((response: any) => {
            if (response) {
                this.coronas.push(...response);
                this.$coronas.next(this.coronas);
                //console.log(this.coronas);
            }
        });
    }
}
