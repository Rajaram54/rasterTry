import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    templateUrl: './list3.component.html',

})
export class AppList3 {
    private tool: any;
    private toolLine: any;
    private toolCircle: any;
    private toolraster: any;
    public finder: Array<any> = ['StLine', 'circle', 'freeHand', 'rasterPon', 'rectangle', 'ellipse'];
    private raster: any;
    private toolRectangle: any;
    private toolEllipse: any;
    private pathsArray : Array<any> = new Array();
    private selectedPath: any;

    // hitOption Activation 
    public hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5,
        bounds: true
    };


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

        this.toolraster = new paper.Tool();
        var tempX, tempY;
        this.toolraster.onMouseDown = (event) => {
            this.fn1(event.event);

            console.log('down event', event.point);
            tempX = event.point.x;
            tempY = event.point.y;
        }
        this.toolraster.onMouseDrag = (event) => {
            console.log('drag event', event.point);
            this.raster.position.x += event.point.x - tempX;
            this.raster.position.y += event.point.y - tempY;
            tempX = event.point.x;
            tempY = event.point.y;
        }

        //circle Tool                                       
        this.toolCircle = new paper.Tool();
        var path4, finalx, finaly, startX, startY;
        this.toolCircle.onMouseDown = (event) => {
            this.fn1(event.event);
            startX = event.point.x;
            startY = event.point.y;
            var path4 = new paper.Path.Circle(new paper.Point(event.point.x, event.point.y), 0);
            path4.strokeColor = 'black';
        }
        this.toolCircle.onMouseDrag = function (event) {
            if (path4) path4.remove();
            finalx = event.point.x;
            finaly = event.point.y;
            let r = Math.sqrt((Math.pow((finalx - startX), 2) + Math.pow((finalx - startY), 2)));
            path4 = new paper.Path.Circle(new paper.Point((finalx + startX) / 2, (finaly + startY) / 2), r / 2);
            path4.strokeColor = 'black';
            paper.view.draw();
            startX = (finalx + startX) / 2;
            startY = (finaly + startY) / 2;
        }
        this.toolCircle.onMouseUp = function (event) {
            if (path4) path4.remove();
            finalx = event.point.x;
            finaly = event.point.y;
            let r = Math.sqrt((Math.pow((finalx - startX), 2) + Math.pow((finalx - startY), 2)));
            path4 = new paper.Path.Circle(new paper.Point((finalx + startX) / 2, (finaly + startY) / 2), r / 2);
            path4.strokeColor = 'black';
        }

        //     //Staright Line Code 
        //   var path = new paper.Path();
        //     path.strokeColor = 'black';
        //     var start = new paper.Point(100, 100);
        //     path.moveTo(start);
        //     path.lineTo(new paper.Point(start.x + 100, start.y - 50));

        // Rectangle tool setUp
        var path5, fixedX, variableY;
        this.toolRectangle = new paper.Tool();
        this.toolRectangle.onMouseDown = (event) => {
            this.fn1(event.event);
            fixedX = new paper.Point(event.point.x, event.point.y);
            variableY = new paper.Point(event.point.x, event.point.y);
            //path5 = new paper.Path.Rectangle(fixedX, variableY);
            //path5.strokeColor = 'black';
           // paper.view.draw();
        }
        this.toolRectangle.onMouseDrag = (event) => {
            if (path5) path5.remove();
            let newPosition = new paper.Point(event.point.x, event.point.y);
            path5 = new paper.Path.Rectangle({
                from: fixedX,
                to: newPosition,
                strokeColor: 'black',
                data: {
                    name: "rectangle",
                    color: "black"
                }
            });
            paper.view.draw();
        }
        this.toolRectangle.onMouseMove = (event) => {
            if (this.selectedPath) {
                this.selectedPath.selected = false;
                this.selectedPath = null;
            }
            if (event.event.target.getAttribute("projectIndex") == paper.project.index) {
                let hitTest = paper.project.hitTest(event.point, this.hitOptions);
                if (hitTest) {
                    console.log('hitresult',hitTest);
                    hitTest.item.selected = true;
                    this.selectedPath = hitTest.item;
                }
                paper.view.draw();
            }
        }
        this.toolRectangle.onMouseUp = (event) => {
            this.pathsArray.push(path5);
            path5 = null;
        }

        // Eclipse tool SetUp
        var path6, EfixedX, EvariableY;
        this.toolEllipse = new paper.Tool();
        this.toolEllipse.onMouseDown = (event) => {
            this.fn1(event.event);
            EfixedX = new paper.Point(event.point.x, event.point.y);
            EvariableY = new paper.Point(event.point.x, event.point.y);
            let rect = new paper.Rectangle(EfixedX, EvariableY);
            path6 = new paper.Path.Ellipse(rect);
            path6.strokeColor = 'black';
            paper.view.draw();
        }
        this.toolEllipse.onMouseDrag = (event) => {
            if (path6) path6.remove();
            let newPosition = new paper.Point(event.point.x, event.point.y);
            let rect = new paper.Rectangle(EfixedX, newPosition);
            path6 = new paper.Path.Ellipse(rect);
            path6.strokeColor = 'black';
            paper.view.draw();
        }
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
            case 'rectangle': this.toolRectangle.activate();
                break;
            case 'ellipse': this.toolEllipse.activate();
                break;
        }
    }
    fn1(ev) {
        let id = ev.target.getAttribute("projectIndex");
        if (id != null) {
            for (var x = 0; x < paper.projects.length; x++) {
                if (paper.projects[x].index == id) {
                    paper.projects[x].activate();
                    this.raster = this.selectRaster();
                }
            }
        }
    }
    myhit(event): any {
        console.log("hi");
    }

    loadImage() {
        let img = new Image();
        let count = 0;
        img.onload = () => {
            console.log("image on load");
            this.raster = new paper.Raster(img);
            this.raster.position = paper.project.view.center;
        }
        img.onerror = () => {
            console.log("image on error");
        }
        let isRasterLoaded = this.selectRaster();
        if (!isRasterLoaded)
            img.src = './assets/image.jpg';
        else
            alert("image has already loaded");
    }

    selectRaster() {
        if (paper.project && paper.project.activeLayer && paper.project.activeLayer.children) {
            for (var arrLen = 0; arrLen < paper.project.activeLayer.children.length; arrLen++) {
                if (paper.project.activeLayer.children[arrLen].className == 'Raster') {
                    return paper.project.activeLayer.children[arrLen];
                }
            }
        }
        return null;
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