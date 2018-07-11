import { Component } from '@angular/core';
import { HitResult, Tool } from 'paper';
import { appService } from './app.service';
@Component({
    selector: 'my-app3',
    templateUrl: './list3.component.html',
    styleUrls: ['./list3.component.css']
})
export class AppList3 {
    private tool: any; //Freehand tool
    private toolLine: any;//Straight tool
    private toolCircle: any;//circle tool
    private toolraster: any;// Raster tool
    public finder: Array<any> = ['StLine', 'ellipse', 'rectangle', 'circle', 'BossSymbol', 'freeHand', 'rasterPan', 'magnify', 'zoom', 'deleteLoadImg', 'imgreset'];
    private raster: any;// Raster vaeriable
    private toolRectangle: any;// Rect tool
    private toolEllipse: any;//Elipse tool
    private Arrr: Array<any> = new Array();// Circle Path Push
    private pathsArray: Array<any> = new Array();//Rect Path Push
    private selectedPath: any; // Hit Points
    private toolBoss: any;//Boss tool
    private loadedImage: any;//image loading in Raster
    private img: any;// storing img variable
    private toolZoomPlus: any;//Zooming tool
    private toolMagnify: any;//Mnagnifying tool
    private imgarray: Array<any> = new Array();//image pushing array in raster
    private imgsrc: Array<any> = new Array();// image from service
    private currentImgIndex: number = 0;// image index from service 
    private selectedPathHitresult: any;// getting hit result
    private subRaster: any; //creating subraster(magnify)
    private tempx: any;
    private tempy: any;
    private newraster: any;
    private isImg: any = false;
    private isImg1: any = false;
    private isImg2: any = false;
    private isImg3: any = false;


    // hitOption Activation 
    public hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5,
        bounds: true
    };


    constructor(public service: appService) {

        this.imgsrc = this.service.getImages();
    }
    ngOnInit(): void {

        //setting up paper project on canvas
        //project one


        let canvas: any = document.getElementById('myCanvas');
        paper.setup(canvas);
        let projectIndex = paper.project.index;
        canvas.setAttribute("projectIndex", projectIndex);
        canvas.setAttribute("imgIndex", 0);

        //project two
        let canvas1: any = document.getElementById('myCanvas1');
        paper.setup(canvas1);
        let projectIndex1 = paper.project.index;
        canvas1.setAttribute("projectIndex", projectIndex1);
        canvas1.setAttribute("imgIndex", 0);

        //project three
        let canvas3: any = document.getElementById('myCanvas2');
        paper.setup(canvas3);
        let projectIndex3 = paper.project.index;
        canvas3.setAttribute("projectIndex", projectIndex3);
        canvas3.setAttribute("imgIndex", 0);
        let text = new paper.PointText(new paper.Point(10, 10));
        text.fillColor = 'red';
        text.content = 'Active';


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
        // Rectangle tool setUp
        var path5, fixedX;
        this.toolRectangle = new paper.Tool();
        this.toolRectangle.onMouseDown = (event) => {
            //console.log('mouse down');
            if (this.selectRaster()) {
                this.fn1(event.event);
                console.log("raster suc")
                fixedX = new paper.Point(event.point.x, event.point.y);
                console.log("down point");
            }
            if (!this.selectedPath) {
                this.fn1(event.event);
                fixedX = new paper.Point(event.point.x, event.point.y);
                console.log("down point");

            } else {
                this.selectedPath.selected = false;
                this.selectedPath.strokeColor = 'red';
                console.log("else down point");
                this.selectedPath.data.color = 'red';
            }
        }
        this.toolRectangle.onMouseDrag = (event) => {
            if (this.selectRaster()) {
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
            if (!this.selectedPath) {
                console.log('drawing new');
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
            } else {
                this.resizeRectangle(event, this.selectedPath, this.selectedPathHitresult);
            }
        }
        this.toolRectangle.onMouseMove = (event) => {
            console.log('mouse move');
            if (this.selectedPath) {
                this.selectedPath.selected = false;
                this.selectedPath = null;
                this.selectedPathHitresult = null;
            }
            if (event.event.target.getAttribute("projectIndex") == paper.project.index) {
                let hitTest = paper.project.hitTest(event.point, this.hitOptions);
                if (hitTest) {
                    hitTest.item.selected = true;
                    this.selectedPath = hitTest.item;
                    this.selectedPathHitresult = hitTest;
                }
                paper.view.draw();
            }
        }
        this.toolRectangle.onMouseUp = (event) => {
            console.log('mouse up');
            this.pathsArray.push(path5);
            path5 = null;
            if (this.selectedPath && this.selectedPath.data.color == 'red') {
                this.selectedPath.strokeColor = 'black';
                this.selectedPath.data.color = 'black';
            }
        }

        // straight line tool

        this.toolLine = new paper.Tool();
        var path2, from;
        this.toolLine.onMouseDown = (event) => {

            if (!this.selectedPath) {
                this.fn1(event.event);
                from = new paper.Point(event.point.x, event.point.y);
                path2 = new paper.Path.Line(from, from);
                path2.strokeColor = 'black';

            } else {
                this.selectedPath.selected = false;
                this.selectedPath.strokeColor = 'red';
                this.selectedPath.data.color = 'red';
            }
        }
        this.toolLine.onMouseUp = function (event) {
            path2.segments[1].point.x = event.point.x;
            path2.segments[1].point.y = event.point.y;
            if (this.selectedPath && this.selectedPath.data.color == 'red') {
                this.selectedPath.strokeColor = 'black';
                this.selectedPath.data.color = 'black';
            }
        }
        this.toolLine.onMouseDrag = function (event) {
            if (!this.selectedPath) {
                path2.segments[1].point.x = event.point.x;
                path2.segments[1].point.y = event.point.y;
            }
            else {
                this.resizeCircle(event, this.selectedPath, this.selectedPathHitresult);
            }
        }
        this.toolLine.onMouseMove = (event) => {
            // console.log('mouse move');
            if (this.selectedPath) {
                this.selectedPath.selected = false;
                this.selectedPath = null;
                this.selectedPathHitresult = null;
            }
            if (event.event.target.getAttribute("projectIndex") == paper.project.index) {
                let hitTestLine = paper.project.hitTest(event.point, this.hitOptions);
                if (hitTestLine) {
                    console.log('hitresult', hitTestLine);
                    hitTestLine.item.selected = true;
                    this.selectedPath = hitTestLine.item;
                    this.selectedPathHitresult = hitTestLine;
                }
                paper.view.draw();
            }
        }
        this.toolLine.onMouseUp = (event) => {
            console.log('mouse up');
            path2 = null;
            if (this.selectedPath && this.selectedPath.data.color == 'red') {
                this.selectedPath.strokeColor = 'black';
                this.selectedPath.data.color = 'black';
            }
        }

        // pan Tool
        this.toolraster = new paper.Tool();

        this.toolraster.onMouseDown = (event) => {

            this.fn1(event.event);
            //console.log('down event', event.point);
            this.tempx = event.point.x;
            this.tempy = event.point.y;
        }
        this.toolraster.onMouseDrag = (event) => {
            //console.log('drag event', event.point);
            //  console.log(this.raster.position);
            this.raster.position.x += event.point.x - this.tempx;
            this.raster.position.y += event.point.y - this.tempy;
            this.tempx = event.point.x;
            this.tempy = event.point.y;
        }


        //zoom + tool

        this.toolZoomPlus = new paper.Tool();
        // Scale the path horizontally by 300%
        var zoom, xy;
        this.toolZoomPlus.onMouseDown = (event) => {
            this.fn1(event.event);
            zoom = event.point;
            xy = event.point;
            // console.log("paper.project.index", paper.project.index);

        }
        this.toolZoomPlus.onMouseDrag = (event) => {
            let distance = (event.point.y - zoom.y);
            //console.log(distance);
            let _zoomScale = 1 - (0.005 * (distance));
            this.raster.scale(_zoomScale, xy);
            zoom = event.point;
        }

        //Magnify tool 
        this.toolMagnify = new paper.Tool();
        this.toolMagnify.onMouseDown = (event) => {
            this.fn1(event.event);
            let raster = this.selectRaster();
            if (raster) {
                this.setUpSubRaster(raster, event);
            }
        }

        this.toolMagnify.onMouseDrag = (event) => {
            let raster = this.selectRaster();
            if (raster) {
                this.setUpSubRaster(raster, event);
            }
        }
        this.toolMagnify.onMouseUp = (event) => {
            if (this.subRaster) {
                this.subRaster.remove();
                this.subRaster = null;
            }
        }


        //circle Tool                                       
        this.toolCircle = new paper.Tool();
        var path4, finalx, finaly, start;
        this.toolCircle.onMouseDown = (event) => {
            this.fn1(event.event);
            start = event.point;
        }

        this.toolCircle.onMouseDrag = function (event) {
            if (path4) path4.remove();
            finalx = event.point.x;
            finaly = event.point.y;
            let r = Math.sqrt((Math.pow((finalx - start.x), 2) + Math.pow((finaly - start.y), 2)));
            path4 = new paper.Path.Circle(new paper.Point((finalx + start.x) / 2, (finaly + start.y) / 2), r / 2);
            path4.strokeColor = 'black';
         // path4.fillColor='white';
            paper.view.draw();
        }
        this.toolCircle.onMouseUp = (event) => {
            this.Arrr.push(path4);
            path4 = null;
        }

        //     //Staright Line Code 
        //     var path = new paper.Path();
        //     path.strokeColor = 'black';
        //     var start = new paper.Point(100, 100);
        //     path.moveTo(start);
        //     path.lineTo(new paper.Point(start.x + 100, start.y - 50));



        //Boss Symbol
        var center, path10;
        this.toolBoss = new paper.Tool();
        this.toolBoss.onMouseDown = (event) => {
            this.fn1(event.event);
            center = new paper.Point(50, 50);
            // var circle = new paper.Path.Circle(center, 40);
            // circle.strokeColor = 'black';
            var points = 6;
            var radius1 = 25;
            path10 = new paper.Path.Star(center, points, radius1, 0);
            path10.rotate(90);
            path10.strokeColor = 'black';
        }
        this.toolBoss.onMouseMove = (event) => {
            if (path10) {
                if (event.event.target.getAttribute("projectIndex") == paper.project.index) {
                    let hitTest = paper.project.hitTest(event.point, this.hitOptions);
                    if (hitTest) {
                        center = new paper.Point(50, 50);
                        var circle1 = new paper.Path.Circle(center, 40);
                        circle1.strokeColor = 'black';
                    }
                    else {
                        // circle1.strokeColor='white';
                        circle1.remove();
                    }
                }

            }
        }


        // Eclipse tool SetUp
        var path6, EfixedX, EvariableY;
        this.toolEllipse = new paper.Tool();
        this.toolEllipse.onMouseDown = (event) => {
            this.fn1(event.event);
            EfixedX = new paper.Point(event.point.x, event.point.y);
            EvariableY = new paper.Point(event.point.x, event.point.y);
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
    toolFinder(event, args) {
        if (event.target) {
            if (event.target.getAttribute("selected") == 'true') {
                event.target.setAttribute("selected", false);
                event.target.style.color = '#333';
                paper.tool = null;
                //console.log("BLACK");
            } else {
                for (let x = 0; x < event.target.parentNode.children.length; x++) {
                    let sibling = event.target.parentNode.children[x];
                    if (sibling.getAttribute("selected") == 'true') {
                        sibling.setAttribute("selected", false);
                        sibling.style.color = '#333';
                        //       console.log("black");
                    }
                }
                event.target.setAttribute("selected", true);
                event.target.style.color = 'red';
                // console.log("Red");
                switch (args) {
                    case 'freeHand':
                        this.tool.activate();
                        break;
                    case 'StLine':
                        this.toolLine.activate();
                        break;
                    case 'circle':
                        this.toolCircle.activate();
                        break;
                    case 'rectangle': this.toolRectangle.activate();
                        break;
                    case 'ellipse': this.toolEllipse.activate();
                        break;
                    case 'rasterPan': {
                        if (this.selectRaster()) {
                            this.toolraster.activate();
                        }
                        else {
                            paper.tool = null;
                        }
                        break;
                    }
                    case 'magnify': {
                        if (this.selectRaster()) {
                            this.toolMagnify.activate();
                        }
                        else {
                            paper.tool = null;
                        }
                        break;
                    }
                    case 'zoom': {
                        if (this.selectRaster()) { this.toolZoomPlus.activate(); } else {
                            paper.tool = null;
                        } break;
                    }
                    case 'BossSymbol': {
                        this.toolBoss.activate();
                        break;
                    }
                    case 'deleteLoadImg': {
                        this.removeCurrentRaster();
                        if (paper.project.view.element.id == "myCanvas") { this.isImg1 = false; }
                        if (paper.project.view.element.id == "myCanvas1") { this.isImg2 = false; }
                        if (paper.project.view.element.id == "myCanvas2") { this.isImg3 = false; }
                    }
                        break;
                    case 'imgreset':
                        {
                            for (let x = paper.project.activeLayer.children.length - 1; x >= 0; x--) {
                                if (paper.project.activeLayer.children[x].className == 'Raster') {
                                    paper.project.activeLayer.children[x].remove();
                                    this.loadImage();
                                }
                            }
                            break;
                        }
                    default: paper.tool = null;
                }
            }
        }
    }
    fn1(ev) {
        let id = ev.target.getAttribute("projectIndex");
        let text;
        if (id != null) {
            //remove previous active text
            paper.project.activeLayer.children.forEach((item) => {
                if (item.className == 'PointText') item.remove();
            });
            for (var x = 0; x < paper.projects.length; x++) {
                if (paper.projects[x].index == id) {
                    paper.projects[x].activate();
                    this.raster = this.selectRaster();
                    // this.isActive=this.isActiveFun();
                    //get current projects image Index
                    this.currentImgIndex = +paper.project.view.element.getAttribute('imgIndex');
                    //Activate Text 
                    text = new paper.PointText(new paper.Point(10, 10));
                    text.fillColor = 'red';
                    text.content = 'Active';
                }
            }
        }
    }
    scrollFunc(ev) {
        //set imgIndex to canvas
        if (!this.isImg) return;
        if (ev.deltaY < 0) {
            // console.log('scrolling up');
            if (this.currentImgIndex > 0)
                this.currentImgIndex--;
        }
        else {
            //console.log('scrolling down');
            if (this.currentImgIndex < this.imgsrc.length - 1)
                this.currentImgIndex++;
        }
        paper.project.view.element.setAttribute("imgIndex", `${this.currentImgIndex}`);
        this.loadImage();
    }

    cutImage() {
        let imagDiv = document.getElementById('images');
        this.loadedImage = null;
        var currIndex, imgCurrIndex;
        if (imagDiv.childElementCount) {
            for (let index = 0; index < imagDiv.children.length; index++) {
                if (imagDiv.children[index]['src'] == `${window.location.protocol}//${window.location.host}${this.imgsrc[this.currentImgIndex].slice(1)}`) {
                    this.loadedImage = imagDiv.children[index];
                    imgCurrIndex = index;
                    currIndex = paper.project.index;
                }
            }
        } if (this.loadedImage) {
            console.log("Loaded img", this.selectRaster().bounds.bottomRight);
            var rasLeftx;
            var rasLefty;
            var rasRigx;
            var rasRigy;
            let bottomright = this.selectRaster().bounds.bottomRight;
            let topLeft = this.selectRaster().bounds.topLeft;
            //for top left
            if (topLeft.x >= 0 && topLeft.x <= paper.project.view.bounds.width) {
                rasLeftx = topLeft.x;
            }
            else if (topLeft.x < 0) {
                rasLeftx = 0;
            }
            else if (topLeft.x > paper.project.view.bounds.width) {
                rasLeftx = paper.project.view.bounds.width;
            }
            if (topLeft.y >= 0 && topLeft.y <= paper.project.view.bounds.height) {
                rasLefty = topLeft.y;
            }
            else if (topLeft.y < 0) {
                rasLefty = 0;
            }
            else if (topLeft.y > paper.project.view.bounds.height) {
                rasLefty = paper.project.view.bounds.height;
            }

            //for bottom right
            if (bottomright.x >= 0 && bottomright.x <= paper.project.view.bounds.width) {
                rasRigx = bottomright.x;
            }
            else if (bottomright.x < 0) {
                rasRigx = 0;
            }
            else if (bottomright.x > paper.project.view.bounds.width) {
                rasRigx = paper.project.view.bounds.width;
            }
            if (bottomright.y >= 0 && bottomright.y <= paper.project.view.bounds.height) {
                rasRigy = bottomright.y;
            }
            else if (bottomright.y < 0) {
                rasRigy = 0;
            }
            else if (bottomright.y > paper.project.view.bounds.height) {
                rasRigy = paper.project.view.bounds.height;
            }

            var ratioHeight = this.imgarray[imgCurrIndex].naturalHeight / paper.project.view.bounds.height;
            var ratioWidth = this.imgarray[imgCurrIndex].naturalWidth / paper.project.view.bounds.width;
            var scaleLx = (ratioWidth * (rasLeftx - topLeft.x)) / this.raster.scaling.x;
            var scaleLy = (ratioHeight * (rasLefty - topLeft.y)) / this.raster.scaling.y;
            var scaleRx = (ratioWidth * (rasRigx - topLeft.x)) / this.raster.scaling.x;
            var scaleRy = (ratioHeight * (rasRigy - topLeft.y)) / this.raster.scaling.y;
            var canv = document.createElement('canvas');
            canv.id = 'someId';
            canv.width = this.loadedImage.naturalWidth;
            canv.height = this.loadedImage.naturalHeight;
            //document.body.appendChild(canv); 
            paper.setup(canv);
            if (this.newraster) this.newraster.remove();
            this.newraster = new paper.Raster(this.loadedImage);
            this.newraster.position = paper.view.center;
            paper.view.draw();
            var ctx = canv.getContext('2d');
            var imgData = ctx.getImageData(scaleLx, scaleLy, (scaleRx - scaleLx), (scaleRy - scaleLy));
            let newCanvas = document.createElement('canvas');
            newCanvas.width = imgData.width;
            newCanvas.height = imgData.height;
            newCanvas.id = 'cutImage';
            let newContext = newCanvas.getContext('2d');
            newContext.putImageData(imgData, 0, 0);
            //let data = newCanvas.toDataURL();
            let winOne = window.open();
            winOne.document.body.appendChild(newCanvas);
            var w = window.open();
          w.document.body.appendChild(newCanvas);
            //remove newly created project and activate old project
            paper.project.remove();
            paper.projects[currIndex].activate();
        }
    }
    loadImage() {
        this.isImg = true;
        if (paper.project.view.element.id == "myCanvas") { this.isImg1 = true; }
        if (paper.project.view.element.id == "myCanvas1") { this.isImg2 = true; }
        if (paper.project.view.element.id == "myCanvas2") { this.isImg3 = true; }
        let imagDiv = document.getElementById('images');
        this.loadedImage = null;
        if (imagDiv.childElementCount) {
            for (let index = 0; index < imagDiv.children.length; index++) {
                if (imagDiv.children[index]['src'] == `${window.location.protocol}//${window.location.host}${this.imgsrc[this.currentImgIndex].slice(1)}`) {
                    this.loadedImage = imagDiv.children[index];
                }
            }
        }
        //if (!this.selectRaster()) {
        if (this.loadedImage) {
            this.setupRaster(this.loadedImage);
        } else {
            this.img = new Image();
            imagDiv.appendChild(this.img);
            this.img.onload = () => {
                this.setupRaster(this.img);
            }
            this.img.onerror = () => {
                //  console.log("image on error");
            }

            this.img.src = this.imgsrc[this.currentImgIndex];
            this.imgarray.push(this.img);

        }
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
    resizeCircle(ev, path, hitresult) {
        if (!path && !hitresult) return;
        switch (hitresult.type) {
            case 'bounds': {
                switch (hitresult.name) {
                    case "top-left": {
                        path.bounds.topLeft = ev.point;
                    } break;
                    case "bottom-right":
                        {
                            path.bounds.bottomRight = ev.point;
                        } break;
                }
            }
                break;
        }
    }
    resizeRectangle(ev, path, hitresult) {
        // console.log("delta"+ev.delta);
        if (!path && !hitresult) return;
        switch (hitresult.type) {
            case 'bounds': {
                switch (hitresult.name) {
                    case "top-right": {
                        let xPoint = path.bounds.topRight.x;
                        let yPoint = path.bounds.topRight.y;
                        let xlPoint = path.bounds.bottomLeft.x;
                        let ylPoint = path.bounds.bottomLeft.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xPoint && xlPoint < ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (path.segments[index].point.x == xlPoint && xlPoint > ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            if (path.segments[index].point.y == yPoint && ylPoint > ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (path.segments[index].point.y == ylPoint && ylPoint < ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }
                    }
                        break;
                    case "top-left": {
                        let xPoint = path.bounds.topLeft.x;
                        let yPoint = path.bounds.topLeft.y;
                        let xrPoint = path.bounds.bottomRight.x;
                        let yrPoint = path.bounds.bottomRight.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xPoint && xrPoint > ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (path.segments[index].point.x == xrPoint && xrPoint < ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            if (path.segments[index].point.y == yPoint && yrPoint > ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (path.segments[index].point.y == yrPoint && yrPoint < ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }

                    } break;
                    case "bottom-right": {
                        let xPoint = path.bounds.bottomRight.x;
                        let yPoint = path.bounds.bottomRight.y;
                        let xtPoint = path.bounds.topLeft.x;
                        let ytPoint = path.bounds.topLeft.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xPoint && xtPoint < ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (path.segments[index].point.x == xtPoint && xtPoint > ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            if (path.segments[index].point.y == yPoint && ytPoint < ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (path.segments[index].point.y == ytPoint && ytPoint > ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }

                    } break;
                    case "bottom-left": {
                        let xPoint = path.bounds.bottomLeft.x;
                        let yPoint = path.bounds.bottomLeft.y;
                        let xtPoint = path.bounds.topRight.x;
                        let ytPoint = path.bounds.topRight.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xPoint && xtPoint > ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (path.segments[index].point.x == xtPoint && xtPoint < ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            if (path.segments[index].point.y == yPoint && ytPoint < ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (path.segments[index].point.y == ytPoint && ytPoint > ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }
                    } break;
                    case "right-center": {
                        let xPoint = path.bounds.rightCenter.x;
                        let xlPoint = path.bounds.leftCenter.x;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xPoint && xlPoint < ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (xlPoint >= ev.point.x && path.segments[index].point.x == xlPoint) {
                                path.segments[index].point.x = ev.point.x;
                            }
                        }
                        break;
                    }
                    case "left-center": {
                        let xlPoint = path.bounds.leftCenter.x;
                        let xPoint = path.bounds.rightCenter.x;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.x == xlPoint && xPoint > ev.point.x) {
                                path.segments[index].point.x = ev.point.x;
                            }
                            else if (xPoint <= ev.point.x && path.segments[index].point.x == xPoint) {
                                path.segments[index].point.x = ev.point.x;
                            }

                        }
                        break;
                    }
                    case "top-center": {
                        let yPoint = path.bounds.topCenter.y;
                        let ybPoint = path.bounds.bottomCenter.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.y == yPoint && ybPoint > ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (ybPoint <= ev.point.y && path.segments[index].point.y == ybPoint) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }
                        break;
                    }
                    case "bottom-center": {
                        let yPoint = path.bounds.bottomCenter.y;
                        let ytPoint = path.bounds.topCenter.y;
                        for (let index = 0; index < path.segments.length; index++) {
                            if (path.segments[index].point.y == yPoint && ytPoint < ev.point.y) {
                                path.segments[index].point.y = ev.point.y;
                            }
                            else if (ytPoint >= ev.point.y && path.segments[index].point.y == ytPoint) {
                                path.segments[index].point.y = ev.point.y;
                            }
                        }
                        break;
                    }
                }
            }
                break;
            case 'stroke': {
                path.translate(ev.delta);
            }
                break;
        }
    }
    setUpSubRaster(raster, ev) {
        let disX, disY;

        disX = this.raster.position.x / this.raster.scaling.x - paper.project.view.center.x;
        disY = this.raster.position.y / this.raster.scaling.y - paper.project.view.center.y;

        let x = (ev.point.x - 10) / this.raster.scaling.x - disX;
        let y = (ev.point.y - 10) / this.raster.scaling.y - disY;
        if (this.subRaster) this.subRaster.remove();
        this.subRaster = raster.getSubRaster(x, y, 20 / this.raster.scaling.x, 20 / this.raster.scaling.y);
        this.subRaster.scale(2);
        paper.view.draw();
    }
    setupRaster(img) {
        console.log("image on load");
        this.removeCurrentRaster();
        this.raster = new paper.Raster(img);
        this.raster.sendToBack();
        this.raster.width = paper.project.view.size.width;
        this.raster.height = paper.project.view.size.height;
        this.raster.position = paper.project.view.center;
    }

    removeCurrentRaster() {
        paper.project.activeLayer.children.forEach((img) => {
            if (img.className == 'Raster') img.remove();
        });
    }

    ngOnDestroy() {
        var len = paper.projects.length;
        if (len != 0) {
            while (len - 1 != -1) {
                paper.projects[len - 1].remove();
                len--;
            }
        }
        var toolDestroy = paper.tools.length;
        if (toolDestroy != 0) {
            while (toolDestroy - 1 != -1) {
                paper.tools[toolDestroy - 1].remove();
                toolDestroy--;
            }
        }
    }
}