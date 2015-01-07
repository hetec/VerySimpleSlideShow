Simple slide show application which is integrable in your website.

In your HTML file first insert the following script and link tags:

<script src="js/SimpleDiaShow.js" type="text/javascript"></script>

<script src="js/loadImage.js" type="text/javascript"></script>
    
<link href="css/baseStyle.css" type="text/css" rel="stylesheet">

After this specify a div which shall contain the slide show and give it an id of 'diaShow'. The default dimension of the div will be 500px * 600px. Your are able to alter this values by changing the css for the selector #diaShow

To create a slide you have to create an new DiaShow Object and assign a configuration object to it. For instance:

var slider = new DiaShow();

createDiaShow({
  diaShow:slider,

  reverseDirection:false,

  delay:10000
});

diaShow = name of the object
reverseDirection = The direction of sliding through the images in the img directory
delay = time a image is visible

The slide show starts automatically when the page was loaded.

The images in img will be update by each reload of the page.
