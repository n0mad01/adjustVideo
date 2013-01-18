# adjustVideo

### a jquery plugin for adjusting video iframes

##### live examples:
[videoplugin.soluch.at](http://videoplugin.soluch.at/)

##### usage:

simple resizing the video to the surrounding elemts width
```javascript
$('#section1').adjustVideo(); // simple resizing to the surrounding elements width
```

resizing the video to a particular size
```javascript
$('#section2').adjustVideo({
    'center' : true, // centering the video
    'width' : '450' // resizing video to a specific width ( keeping the aspect ratio )
});
```

resizing the video to a particular size disregarding the aspect ratio
```javascript
$('#section2').adjustVideo({
    'width' : '400',
    'height' : '400'
});
```
