//import EXIF from './exif'
import fixOrientation from 'fix-orientation'

export default {
    resize(path, obj, callback){
        fixOrientation(path, function(fixedData){
            let img = new Image();
            img.src = fixedData;
            img.onload = function(){
                let that = this;
                // 默认按比例压缩
                let w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);

                let originW = w, originH = h;
                //console.log("origin: w=" + w + ",h=" + h);

                let quality = 0.5;  // 默认图片质量为0.5
                let scaleRatio = 1; // 尺寸压缩比例
                let base64 = ''; // 压缩后的内容 base64
                if (originW > 2800) {
                    scaleRatio = 2;
                }

                for(let count = 0; count<3; count++) { // 最多重试3次
                    w=originW/scaleRatio;
                    h=originH/scaleRatio;
                    //alert("w=" + w +",h=" + h);
    
                    //生成canvas
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    // 创建属性节点
                    
                    let imgWidth = w, imgHeight = h;
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
    
                    ctx.drawImage(that, 0, 0, imgWidth, imgHeight);
    
                    let maxLen = obj.maxLen || 200 * 1024;
                    // quality值越小，所绘制出的图像越模糊
                    quality = 0.5;
                    base64 = canvas.toDataURL('image/jpeg', quality);
                    while (base64.length > maxLen && quality > 0.1) {
                        quality -= 0.1;
                        base64 = canvas.toDataURL('image/jpeg', quality);
                        //alert("quality:" + quality + ",size:" + base64.length/1024);
                    }
    
                    if (base64.length > maxLen) { // 压缩不下来，调整尺寸继续压缩
                        scaleRatio++;
                        quality-=0.1; 
                    } else {
                        break;
                    }
                }

                // 回调函数返回base64的值
                callback(base64);
            }
        });
    }
}