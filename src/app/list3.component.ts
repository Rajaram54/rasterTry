import { Component } from '@angular/core';
import { appService } from './app.service';
import { destroyPlatform } from '@angular/core/src/application_ref';
import { Raster } from 'paper';
@Component({
    selector: 'my-app',
    templateUrl: './list3.component.html',
})
export class AppList3 {
    private tool: any;
    private toolLine: any;
    private toolCircle: any;
    private toolraster: any;
    public finder: Array<any> = ['StLine', 'circle', 'freehand','rasterPon'];
    private raster: any;
 
    constructor() {
    

    }
    ngOnInit(): void {

        //setting up paper project on canvas
        //project one
        let canvas: any = document.getElementById('myCanvas');
        paper.setup(canvas);
        let projectIndex = paper.project.index;
        canvas.setAttribute("projectIndex", projectIndex);

        //project two
        let canvas1: any = document.getElementById('myCanvas1');
        paper.setup(canvas1);
        let projectIndex1 = paper.project.index;
        canvas1.setAttribute("projectIndex", projectIndex1);

        //project three
        let canvas3: any = document.getElementById('myCanvas2');
        paper.setup(canvas3);
        let projectIndex3 = paper.project.index;
        canvas3.setAttribute("projectIndex", projectIndex3);

        //Reused canvas three for project four
        let canvas4: any = document.getElementById('myCanvas2');
        paper.setup(canvas4);
        let projectIndex4 = paper.project.index;
        canvas3.setAttribute("projectIndex", projectIndex4);

        //Reused canvas three for project five
        let canvas2: any = document.getElementById('myCanvas2');
        paper.setup(canvas2);
        let projectIndex2 = paper.project.index;
        canvas2.setAttribute("projectIndex", projectIndex2);

        //Tools setup
        // Freehand tool
        var path1;
        this.tool = new paper.Tool();
        this.tool.onMouseDown = (event) => {
            this.fn1(event.event);
            path1 = new paper.Path();
            path1.add(event.point);
            path1.strokeColor = 'black';
        }

        this.tool.onMouseDrag = function (event) {
            path1.add(event.point);
        }

        // straight line tool
        this.toolLine = new paper.Tool();
        var firstx, firsty;
        var path2, from, to;
        this.toolLine.onMouseDown = (event) => {
            this.fn1(event.event);
            from = new paper.Point(event.point.x, event.point.y);
            path2 = new paper.Path.Line(from, from);
            path2.strokeColor = 'black';
        }
        this.toolLine.onMouseUp = function (event) {
            path2.segments[1].point.x = event.point.x;
            path2.segments[1].point.y = event.point.y;
        }
        this.toolLine.onMouseDrag = function (event) {
            path2.segments[1].point.x = event.point.x;
            path2.segments[1].point.y = event.point.y;
        }

        // pan Tool

        this.toolraster =new paper.Tool();
        var tempX,tempY;
        this.toolraster.onMouseDown=(event)=>{
            this.fn1(event.event);
            //raster.position.x += 100;
            console.log('down event',event.point);
            tempX=event.point.x;
            tempY=event.point.y;
        }
        this.toolraster.onMouseDrag=(event)=>{
            console.log('drag event',event.point);
            this.raster.position.x+=event.point.x-tempX;
            this.raster.position.y+=event.point.y-tempY;
            tempX = event.point.x;
            tempY = event.point.y;
            console.log('update raster positon',this.raster.position);
        }

       
        //this.raster.on('load', ()=> {
         

        //circle Tool                                       
        this.toolCircle = new paper.Tool();
        var path4, finalx, finaly, path3, startX, startY;
        this.toolCircle.onMouseDown = (event) => {
            this.fn1(event.event);
            startX = event.point.x;
            startY = event.point.y;
            var path4 = new paper.Path.Circle(new paper.Point(event.point.x, event.point.y), 0);
            path.strokeColor = 'black';
        }
        this.toolCircle.onMouseDrag = function (event) {
            if (path4) path4.remove();
            finalx = event.point.x;
            finaly = event.point.y;
            let r = Math.sqrt((Math.pow((finalx - startX), 2) + Math.pow((finalx - startY), 2)));
            path4 = new paper.Path.Circle(new paper.Point((finalx + startX) / 2, (finaly + startY) / 2), r / 2);
            path4.strokeColor = 'black';
            paper.view.draw();
        }
        this.toolCircle.onMouseUp = function (event) {
            if (path4) path4.remove();
            finalx = event.point.x;
            finaly = event.point.y;
            let r = Math.sqrt((Math.pow((finalx - startX), 2) + Math.pow((finalx - startY), 2)));
            path4 = new paper.Path.Circle(new paper.Point((finalx + startX) / 2, (finaly + startY) / 2), r / 2);
            path4.strokeColor = 'black';
        }

        //Staright Line Code 
        var path = new paper.Path();
        path.strokeColor = 'black';
        var start = new paper.Point(100, 100);
        path.moveTo(start);
        path.lineTo(new paper.Point(start.x + 100, start.y - 50));

        // Rectangle canvas setUp
        var path5;
        var rectangle = new paper.Path.Rectangle(new paper.Point(100, 100), new paper.Point(100, 150));
        path5 = new paper.Path.Rectangle(rectangle);
        path5.strokeColor = 'black';

    }

    toolFinder(args) {
        switch (args) {
            case 'freeHand': this.tool.activate();
                break;
            case 'StLine': this.toolLine.activate();
                break;
            case 'circle': this.toolCircle.activate();
                break;
            case 'rasterPon': this.toolraster.activate();
            break;
        }
    }

    

    fn1(ev) {
        let id = ev.target.getAttribute("projectIndex");
        if (id != null) {
            for (var x = 0; x < paper.projects.length; x++) {
                if (paper.projects[x].index == id) {
                    paper.projects[x].activate();
                }
            }
        }
    }
    loadImage() {
        
        let img = new Image();
        img.onload= ()=>{
            console.log("image on load");
            
            // if(paper.project.activeLayer._children.length!=0){
            //     for(var x=0;x<paper.project.activeLayer._children.length;x++){
            //     paper.project.activeLayer._children[x].remove();
            //     }
            // }
        this.raster= new paper.Raster(img);
        this.raster.position = paper.project.view.center; 
        if(this.raster._loaded&&this.toolraster.activate()){
            console.log('Now the image is definitely ready.');
            
            // this.toolraster.onMouseUp=(event)=>{
                
            // }
        
        }
        
        } 
        img.onerror= ()=>{
            console.log("image on error");
        }
        img.src = './assets/image.jpg';
    }

    ngOnDestroy() {
        var len = paper.projects.length;
        if (len != 0) {
            while (len - 1 != -1) {
                paper.projects[len - 1].remove();
                len--;
            }
        }
    }
}