const imgProps = require('../index');
const assert = require('assert');
const path = require('path');
const sampleImg = path.resolve('./img/quote.png');
const url = "https://i1.wp.com/exergic.in/wp-content/uploads/2018/04/placeholder.png";

describe('Local : Image Size Info', ()=> {
    it("Error if image not found", async()=> {
        let res = await imgProps.getSizeInfo('./notfound.png', 'mb');
        assert.notEqual('No File Found', `${res}`);
        assert.notEqual(4385, `${res.size}`);
        assert.notEqual('mb', `${res.units}`);
    });
    it("get size of image in bytes", async() => {
        let res = await imgProps.getSizeInfo(sampleImg);
        assert.equal(res.size, 4385);
    });
    it("get size of image in kb", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'kb');
        assert.equal(res.size, 4.385);
    });
    it("get units of image in kb", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'kb');
        assert.equal(res.units, 'kb');
    });
    it("get size of image in mb", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'mb');
        assert.equal(res.size, 0.004385);
    });
    it("get units of image in mb", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'mb');
        assert.equal(res.units, 'mb');
    });
    it("get width of image", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'mb');
        assert.equal(res.width, '317');
    });
    it("get height of image", async() => {
        let res = await imgProps.getSizeInfo(sampleImg, 'mb');
        assert.equal(res.height, '159');
    });
});

describe('Url : Image Size Info', ()=> {
    it("Error if image not found", async()=> {
        let res = await imgProps.getSizeInfo('http://notfound.png', 'mb');
        assert.notEqual('No File Found', `${res}`);
        assert.notEqual(6302, `${res.size}`);
        assert.notEqual('mb', `${res.units}`);
    });
    it("get size of image in bytes", async() => {
        let res = await imgProps.getSizeInfo(url);
        assert.equal(res.size.toString().slice(0,4), '6302');
    });
    it("get size of image in kb", async() => {
        let res = await imgProps.getSizeInfo(url, 'kb');
        assert.equal(res.size.toString().slice(0,6), '6.3020');
    });
    it("get units of image in kb", async() => {
        let res = await imgProps.getSizeInfo(url, 'kb');
        assert.equal(res.units, 'kb');
    });
    it("get width of image", async() => {
        let res = await imgProps.getSizeInfo(url, 'mb');
        assert.equal(res.width, '1200');
    });
    it("get height of image", async() => {
        let res = await imgProps.getSizeInfo(url, 'mb');
        assert.equal(res.height, '800');
    });    
});