const fs = require('fs');
const axios = require('axios');
const PNG = require('pngjs').PNG;
class ImageSizeInfo{
    constructor(img, units='bytes'){
        this.img = img;
        this.units = units;
        this.size;
        this.width;
        this.height;
    }
    setProps(size, width, height){
        this.size = parseInt(size);
        if(this.units==='kb') this.toKiloBytes();
        if(this.units==='mb') this.toMegaBytes();
        this.width = width;
        this.height = height;
        return this;
    }
    toKiloBytes(){
        this.size = (this.size * 0.001);
    }
    toMegaBytes(){
        this.size = (this.size * 0.000001);
    }
}

const getPixels = async (data) => {
    return new Promise((resolve, reject) =>{
        const png = new PNG();
        png.parse(data,(err, img_data) => {
            if(err) {
                reject(err);
            }
            resolve([img_data.width, img_data.height]);
        });
    });
}

const getSizeInfo = async (img, units) => {
    try{
        let nImg = new ImageSizeInfo(img, units);
        let size;
        let data;
        if(img.indexOf('http') !== -1 ){
            const response = await axios.get(img,  { responseType: 'arraybuffer' });
            size = response.headers["content-length"];
            data = Buffer.from(response.data, "utf-8");
        }else{
            let stats = fs.statSync(img);
            size = stats.size;
            data = fs.readFileSync(nImg.img);
        }
        const pixels = await getPixels(data);
        nImg.setProps(size, pixels[0], pixels[1]);
        return nImg;
    }catch(error){
        return error;
    }
}

exports.getSizeInfo = getSizeInfo;