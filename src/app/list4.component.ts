import { Component, ElementRef,ApplicationRef } from '@angular/core';
import {appService} from './app.service';
import { AppList5 } from './list5.component';
import { DragulaService } from 'ng2-dragula';


@Component ({
   selector: 'my-app2',
   templateUrl: './list4.component.html',
})
export class AppList4  {
    public imagesArr: Array<any>; 
  
    constructor(public service: appService, 
      public elementRef: ElementRef,
      public appRef:ApplicationRef,
    public drag: DragulaService) {
        this.imagesArr = this.service.getImages();
}
ngOnInIt(){
  
  let self = this, tar, src, fromTarget, obj: any = {}, newObj: any = {}, targetArr: any = [], resArr: any = [] overlay, nativeEl;

 // if (self.viewerLayout && self.viewerLayout['root']) barCmpRef = this.viewerLayout['root'].getItemsById('cmpFunctionBar')[0];
  if (this.elementRef) nativeEl = jQuery(this.elementRef.nativeElement);
  if (nativeEl.find('.list5') && nativeEl.find('.list5').length) overlay = nativeEl.find('.list5');
 // if (barCmpRef && barCmpRef.container && barCmpRef.container.compRef) barCmpInstance = barCmpRef.container.compRef.instance;
  //if (barCmpInstance && barCmpInstance.elementRef) barNativeEl = jQuery(barCmpInstance.elementRef.nativeElement);


  if (self.drag) {
      self.drag.setOptions('customizeCatalogBag',{
          direction: 'horizontal',
          liftDelay: 250,
          copy: ((el, source) => {
              if (source) src = jQuery(source);
              if (src && (src.hasClass('list5'))) return false;
              else return true;
          }),
         // removeOnSpill: '.list5',
          moves: ((el, target, source, sibling) => {
              //Finding the source of dragging
              if (!(el && jQuery(el).closest('.spantool') && jQuery(el).closest('.spantool').length && overlay)) overlay.show(); //From function-bar creates an overlay to prevent drop in any other location             
              //if (barNativeEl && barNativeEl.find('.viewer-storage-scu') && barNativeEl.find('.viewer-storage-scu').length) barNativeEl.find('.viewer-storage-scu').hide();
              return true;
          }),

          accepts: ((el, target, source, sibling) => {
              obj = {};
              newObj = {};
              targetArr = [];
              resArr = [];
              if (target) tar = jQuery(target);
              if (source) src = jQuery(source);
              
            
              if (tar && tar.hasClass('list5')) return;
              return true;
          }),
          invalid: ((el, handle) => {
              if (overlay) overlay.hide();
          })
      });

          self.drag.find('customizeCatalogBag').drake.on('drop', ((el, target, container) => {
              if (!target) return false;
              obj = {};
              newObj = {};
              targetArr = [];
              resArr = [];                
              }));

        

          self.drag.find('customizeCatalogBag').drake.on('dragend', ((el) => {
              obj = {};
              newObj = {};
              targetArr = [];
              resArr = [];
             
          }));


      }
      if (!this.appRef['_runningTick']) this.appRef.tick();
      this.createDragula();
  }
  createDragula() {
    if (this.drag && this.drag.find('customizeCatalogBag')
        && this.drag.find('customizeCatalogBag' ).drake
        && this.drag.find('customizeCatalogBag' ).drake.containers)
        this.drag.find('customizeCatalogBag').drake.containers = [];
    if (jQuery('.spantool' ) && jQuery('.spantool').length) {
        jQuery('.spantool').each((index, container) => {
            if (this.drag && this.drag.find('customizeCatalogBag')
                && this.drag.find('customizeCatalogBag').drake
                && this.drag.find('customizeCatalogBag').drake.containers)
                this.drag.find('customizeCatalogBag').drake.containers.push(jQuery(container)[0]);
        });
    }
}

}
