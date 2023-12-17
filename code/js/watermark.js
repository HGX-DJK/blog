
function watermark(){
     this.watermark = {}
}
/**
 * @description 添加水印
 * @param {*} text 
 * @param {*} sourceBody 
 * @returns 
 */
watermark.prototype.setWatermark = function (text, sourceBody){
    let elementDomParent = document.querySelector(`.${sourceBody}`);
    var can = document.createElement('canvas');
    if(elementDomParent?.clientWidth == undefined || elementDomParent?.clientHeight == undefined )  return;
    can.width  = elementDomParent?.clientWidth     //设置水印之间的左右间距
    can.height = elementDomParent?.clientHeight/3  //设置水印之间的上下间距
    // console.log(elementDomParent?.clientWidth,elementDomParent?.clientHeight,"qqqqqqq")
    var cts = can.getContext('2d');
    cts.font = '23px Vedana';
    if(elementDomParent?.clientHeight<=200) {
        can.height = elementDomParent?.clientHeight;
        cts.font = '17px Vedana';
    };
    if(elementDomParent?.clientHeight>200 && elementDomParent?.clientHeight<400) {
        can.height = elementDomParent?.clientHeight/2;
        cts.font = '23px Vedana';
    };
    cts.fillStyle = 'rgba(255,255, 255, .25)';
    cts.textAlign = 'left';
    cts.textBaseline = 'Middle';
    cts.rotate(-10 * Math.PI / 180);
    cts.fillText(text,can.width/25, can.height - can.height/4);

    /**移除上一次的mask */
    var elementChild = elementDomParent && elementDomParent.querySelector(".class_mask");
    if(elementChild) elementChild.remove();
    /**添加新的mask类 */
    var water_div = document.createElement('div');
    water_div.classList.add("class_mask");
    water_div.style.pointerEvents = 'none';
    water_div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
    if (elementDomParent) {
        water_div.style.position = 'inherit';
        water_div.style.float = 'left';
        water_div.style.zIndex = '99999';
        water_div.style.width  = elementDomParent.clientWidth + 'px';
        water_div.style.height = elementDomParent.clientHeight + 'px';
        elementDomParent.appendChild(water_div)
    };
    //  else {
    //   water_div.style.top = '3px'
    //   water_div.style.left = '0px'
    //   water_div.style.position = 'fixed'
    //   water_div.style.zIndex = '999'
    //   water_div.style.width = document.documentElement.clientWidth + 'px'
    //   water_div.style.height = document.documentElement.clientHeight + 'px'
    //   document.body.appendChild(water_div)
    // }
}


