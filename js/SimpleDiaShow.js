
function DiaShow(){
  var dir_img = "img";
  var dir_php = "php";

  var start = true;
  var counter = 0;
  var numberOfImages = 0;
  var main = null;
  var sec_mainImg = null;
  var image = null;
  var images = null
  var delay = 5000;
  var interval;
  var reverseDirection = false; //default is left
  var pos = 1;




  var buildScaffold = function(){
    main = document.querySelector("#diaShow");
    sec_mainImg = document.createElement('section');
    sec_mainImg.setAttribute("id","mainImg");
    sec_mainImg.setAttribute("title", "by hetec");
    sec_mainImg.setAttribute("class","imageBox");
    main.appendChild(sec_mainImg);
    addImageTagToDiv('left');
    addImageTagToDiv('middle');
    addImageTagToDiv('right');
    image = document.querySelectorAll('#mainImg img');

  }

  var calcNumberOfImg = function(){
    for(i in images){
      numberOfImages++;
    }
    console.log("Number of images: " + numberOfImages);
  }

  var addImageTagToDiv = function(id){
    var img = new Image();
    img.setAttribute('id', id);
    sec_mainImg.appendChild(img);
  }

  var loadImages = function(){
    var text;
    var http = new XMLHttpRequest();
    if(http != null){
        http.onreadystatechange = function(){
           if(http.readyState == 4 && http.status == 200){
             text = http.responseText;
             images = JSON.parse(text);
             console.log(images);
           }
        }
    http.open("POST", dir_php + "/imageChecker.php", false);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send("dir=" + dir_img);
    }
  }

  var getNextImage = function(){

    counter++;
    if(counter > numberOfImages - 1){
      counter = 0;
    }
    document.getElementById("middle").setAttribute('src', dir_img + '/' + images[counter]);
    document.getElementById("left").setAttribute('src', dir_img + '/' + images[counter]);
    document.getElementById("right").setAttribute('src', dir_img + '/' + images[((counter + 1)>(numberOfImages - 1))?0:(counter+1)]);
  }

  var getPrevImage = function(){
    counter--;
    if(counter < 0){
      counter = numberOfImages - 1;
    }
    document.getElementById("middle").setAttribute('src', dir_img + '/' + images[counter]);
    document.getElementById("left").setAttribute('src', dir_img + '/' + images[counter]);
    document.getElementById("right").setAttribute('src', dir_img + '/' + images[((counter - 1)<0)?(numberOfImages - 1):(counter-1)]);

  }

  this.setDelay = function(d){
    if(checkPara(d, 'number')){
      delay = d;
    }else{
      throw "The insert delay has to be not empty and of type NUMBER";
    }
  }

  this.reverseDirection = function(on){
    if(checkPara(p_direction, "boolean")){
      reverseDirection = on;
    }else{
      throw "The insert value of direction has to be not empty and of type BOOLEAN";
    }


  }
   var toggleCSS = function(){
    if(pos == 1){
      image[1].setAttribute('id','left');
      image[1].style.opacity = '0';
      image[2].setAttribute('id','middle');
      image[2].style.opacity = '1';
      image[0].setAttribute('id','right');
      image[0].style.opacity = '0';
      pos = 2;
    }else if(pos == 2){
      image[1].setAttribute('id','right');
      image[1].style.opacity = '0';
      image[2].setAttribute('id','left');
      image[2].style.opacity = '0';
      image[0].setAttribute('id','middle');
      image[0].style.opacity = '1';
      pos = 3;
    }else if(pos == 3){
      image[1].setAttribute('id','middle');
      image[1].style.opacity = '1';
      image[2].setAttribute('id','right');
      image[2].style.opacity = '0';
      image[0].setAttribute('id','left');
      image[0].style.opacity = '0';
      pos = 1;
    }

  }

  var slide = function(pause){
    if(reverseDirection === false){
      //getNextImage();
      //setTimeout(slide, delay);

      interval = setInterval(function(){
        if(start == true){
          //getNextImage();
          toggleCSS();
          start = false;
        }else{
          getNextImage();
          toggleCSS();
        }

      }, delay);

    }else{
        interval = setInterval(function(){
        if(start == true){
          //getNextImage();
          toggleCSS();
          start = false;
        }else{
          getPrevImage();
          toggleCSS();
        }
      }, delay);
    }
  }

  var handlePauseStart = function(){
    if(pause == false){
      pause = true;
    }else{
      pause = false;
    }
    if(reverseDirection === true){
      counter++;
    }else{
      counter--;
    }
    autoSlide(pause);
  }


  var autoSlide = function(){
    if(reverseDirection === false){
      if(start == true){
        counter = -1;
      }
      getNextImage();
      slide();
    }else{
      if(start == true){
        counter = 1;
        start = false;
      }
      slide();
    }
  }

  this.start = function(){
    buildScaffold();
    loadImages();
    calcNumberOfImg();
    autoSlide();
  }

  var checkPara = function(para, type){
    if(para != undefined && para != null){
      if(typeof para == type && type != undefined){
        return true;
      }else{
        throw "ERROR WITH PASSED PARAMETERS: One of the insert parameters is of a wrong type! Expected type: " + type;
      }
    }else{
      console.log("Default value is used!")
      return false;
    }
  }

  createDiaShow = function(obj){
    if(checkPara(obj.delay, 'number')){
      delay = obj.delay;
    }
    if(checkPara(obj.reverseDirection, "boolean")){
      reverseDirection = obj.reverseDirection;
    }
    if(checkPara(obj.diaShow, "object")){
      window.onload = function(){
          obj.diaShow.start();
      };
    }else{
      throw "No DIASHOW object set!";
    }

}

}