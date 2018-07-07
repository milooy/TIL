# CSS Hover Overlay
[codepen link](http://codepen.io/contempoinc/pen/DfLig)

```html
<figure>
    <a href="#">
        <img src="http://contempographicdesign.com/wp-content/uploads/2013/11/super-happy-cat.jpg" />
        <div class="info">
            <div class="info-wrapper">
                <h5>Super Happy Cat</h5>
                <h6>Photography</h6>
            </div>
        </div>
    </a>
</figure>
```

```css
/**
 * Just a simple CSS3 image overlay
 * By Chris Robinson aka contempoinc
 * http://themeforest.net/user/contempoinc
 */

body {
    font-family: 'Helvetica', 'Arial', 'Helvetica', 'Arial';
}

figure {
    position: relative;
    overflow: hidden;
    width: 320px;
}

figure img {
    position: relative;
    z-index: 0;
}

figure .info {
  position: absolute;
    height: 98%;
    width: 100%;
    top: 0;
    text-align: center;
    z-index: 2;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    opacity: 0;
    -webkit-transition: opacity 0.5s ease;
    -moz-transition: opacity 0.5s ease;
    -o-transition: opacity 0.5s ease;
    -ms-transition: opacity 0.5s ease;
    transition: opacity 0.5s ease;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    background: rgba(240,82,83,0.9);
}

figure .info-wrapper {
    position: relative;
    top: 45%;
    display: inline-block;
    vertical-align: middle;
    height: auto;
  z-index: 3;
  color: #fff;
  Uncomment for scaling animation
  -webkit-transform: scale(1.2, 1.2);
    -moz-transform: scale(1.2, 1.2);
    -o-transform: scale(1.2, 1.2);
    -ms-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
    -webkit-transition: -webkit-transform 0.5s ease;
    -moz-transition: -moz-transform 0.5s ease;
    -o-transition: -o-transform 0.5s ease;
    -ms-transition: -ms-transform 0.5s ease;
    transition: transform 0.5s ease;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
}

figure a:hover .info,
figure a:focus .info {
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
      opacity: 1;
}

figure a:hover .info .infowrapper,
figure a:focus .info .infowrapper {
  -webkit-transform: scale(1, 1);
    -moz-transform: scale(1, 1);
    -o-transform: scale(1, 1);
    -ms-transform: scale(1, 1);
    transform: scale(1, 1);
}

figure h5 {
    font-weight: bold;
    font-size: 15px;
    line-height: 23px;
    margin: 0;
}

figure h6 {
    margin: 0;
    font-weight: 400;
}
```
