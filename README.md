# image-props
Image Properties of Image

* Size Info
    - supports png ( local, url)
* Background Color
* Top 10 Colors
* Text

**Usage**

```js

const imgProps = require('image-props');

(async()=>{
    const sizeInfo1 = await imgProps.getSizeInfo('./img/quote.png', 'kb');
    console.log("Size Info1:", sizeInfo1);

    const sizeInfo2 = await imgProps.getSizeInfo('https://i1.wp.com/exergic.in/wp-content/uploads/2018/04/placeholder.png', 'kb');
    console.log("Size Info2:", sizeInfo2);
})();
// ## output:
// Size Info1: ImageSizeInfo {
//   img: './img/quote.png',
//   units: 'kb',
//   size: 4.385,
//   width: 317,
//   height: 159 }

// Size Info2: ImageSizeInfo {
//   img:
//    'https://i1.wp.com/exergic.in/wp-content/uploads/2018/04/placeholder.png',
//   units: 'kb',
//   size: 6.3020000000000005,
//   width: 1200,
//   height: 800 }

```