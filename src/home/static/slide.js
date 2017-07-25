function Slider() {
  this.oWrapper = $('#wrapper');
  this.bgOne = $('.bg1').attr('src');
  this.bgTwo = $('.bg2').attr('src');
  this.bgThree = $('.bg3').attr('src');
  this.bgFour = $('.bg4').attr('src');
  this.oParent = null;
  this.oSlider = null;
  this.slider_item = null;
  this.btn_item = null;

  this.iNow = 0;
  this.slider_w = 0;
  this.slider_h = 0;
  this.timer = null;
  this.get_l = null;

  this.settings = {
    slider_num: 4,
    w: 1200,
    h: 500
  };
};

Slider.prototype = {
  nextSlider: function (dis) {
    var self = this;

    if (dis > this.settings.w * 0.4) { //当拖拽的距离差（其实就是距离浏览器右边的width）大于body的width的0.4时
      if (this.iNow === this.slider_item.length - 1) { //如果是最后一个图片
        for (var i = 1; i < this.slider_item.length - 1; i++) { //从第一个开始遍历
          $(this.slider_item[i]).css({left: this.slider_w}); //除下标为0和最后一个外的所有图片left值都是this.slider_w

          this.slider_item.eq(this.iNow).animate({left: -this.slider_w}); //最后一张图片动画使得left值为-this.slider_w，就是向左隐藏了。
          // 这里因为move时已经移动了一些距离，所以直接left: 0
          this.slider_item.eq(0).animate({left: 0}); //第一张图片就出现，作为当前图片。
        }

        this.iNow = 0;
      } else { //如果不是最后一张图片
        this.slider_item.eq(this.iNow).animate({left: -this.slider_w}); //当前的就隐藏
        this.slider_item.eq(this.iNow + 1).animate({left: 0}); //

        this.iNow ++;
      }

      // 圆点及主题颜色的变化
      this.setDot(this.iNow);

      if (this.iNow === 0) {
        this.themeClass(true);
      } else {
        this.themeClass(false);
      }
    } else { //当拖拽的距离差（其实就是距离浏览器右边的width）小于body的width的0.4时
      this.slider_item.eq(this.iNow).animate({left: 0}); //返回之前当前的 图片

      if (this.iNow === this.slider_item.length - 1) {
        this.slider_item.eq(0).animate({left: this.slider_w});
      } else {
        this.slider_item.eq(this.iNow + 1).animate({left: this.slider_w});
      }
    }
  },

  prevSlider: function (dis) {
    var self = this;

    if (Math.abs(dis) > this.settings.w * 0.4) { // 拖动超过一定距离时
      this.slider_item.eq(this.iNow).animate({left: this.slider_w});
      this.slider_item.eq(this.iNow - 1).animate({left: 0});

      if (Math.abs(this.iNow) === this.slider_item.length - 1) {
        this.iNow = 0;
      } else {
        this.iNow --;
      }

      // 圆点及主题颜色的变化
      this.setDot(this.iNow);

      if (this.iNow === 0) {
        this.themeClass(true);
      } else {
        this.themeClass(false);
      }
    } else {
      this.slider_item.eq(this.iNow).animate({left: 0});
      this.slider_item.eq(this.iNow - 1).animate({left: -this.slider_w});
    }
  },

  moveDistance: function (dis) {
    if (dis < 0) { //小于0，就是往左拖拽
      this.slider_item.eq(this.iNow).css({left: dis}); //拖拽导致当前的图片的left值是dis（负数，就是不断地被遮住）

      if (this.iNow === this.slider_item.length - 1) { //如果是最后一个
        this.slider_item.eq(0).css({left: this.get_l + dis}); //则第一个会继续出现，当第一个的left为0的时候，就是当前显示了。
      } else {
        this.slider_item.eq(this.iNow + 1).css({left: this.get_l + dis}); //body的width与dis相加，最后得到0.
      }
    } else if (dis > 0) {
      this.slider_item.eq(this.iNow).css({left: dis});
      this.slider_item.eq(this.iNow - 1).css({left: dis - this.get_l});
    }
  },

  mousedown: function (ev) {
    var self = this;
    var oEvent = ev || window.event;
    var disX = oEvent.clientX;
    var recordX = oEvent.clientX;

    document.onmousemove = function (ev) { //鼠标移动所执行的函数
      var oEvent = ev || window.event;

      recordX = oEvent.clientX; //鼠标不停移动，距离所在地方到浏览器可见区域最左边有多长，是随着鼠标不停在变化的。
      // console.log('disX',disX); //这个是不会改变的，固定的，就是你鼠标一开始停在哪里开始拖拽，它就是那个值不变。
      // console.log('recordX',recordX);
      // console.log('disX - recordX',disX - recordX);

      self.moveDistance(recordX - disX); //引用moveDistance函数
    };

    document.onmouseup = function (ev) { //当鼠标移动没有移足够的距离，就是拖拽到一半的情况。
      if (disX - recordX > 0) { //往左拖拽
        self.nextSlider(disX - recordX);
      } else if (disX - recordX < 0) { //往右拖拽,recordX比disX大
        self.prevSlider(disX - recordX);
      }

      document.onmousemove = null;
      document.onmouseup = null;
    };
  },

  themeClass: function (state) {
    var self = this;

    if (state) {
      this.oWrapper.addClass('theme-white');
    } else {
      //this.oWrapper.removeClass('theme-white');
    }
  },

  sliderChange: function (index) {
    var self = this;
    console.log('this.iNow',this.iNow);
    console.log('index',index);


    if (this.iNow < index) { //如果index比0大
      this.slider_item.eq(this.iNow).animate({left: -this.slider_w}); //第一个图片消失被移到左边，距离left为负的图片的长度。

      this.slider_item.eq(index).css({left: this.slider_w}); //点击的第几个圆点，会使得第几个图片的left为a标签的长度

    } else {
      this.slider_item.eq(this.iNow).animate({left: this.slider_w});
      this.slider_item.eq(index).css({left: -this.slider_w});
    }

    this.slider_item.eq(index).animate({left: 0}, function () { //接着动画，使得left为0,就是显示在当前页面。
      if (index === 0) {
        self.themeClass(true);
      } else {
        self.themeClass(false);
      }
    });
  },

  setDot: function (index) {
    this.btn_item.removeClass('btn-item__cur'); //刚开始所有的都恢复为圆点
    this.btn_item.eq(index).addClass('btn-item__cur'); //刚开始选中的就带有这个class的效果
  },

  setData: function () {
    var sliderBox_w = this.settings.w * this.slider_item.length; //document.body.width() * 有几个class='slider_item'的<a>标签
    var sliderBox_h = this.settings.h * this.slider_item.length; //760 * 有几个class='slider_item'的<a>标签 这里我声明了有5个，那么这个值就是3800.

    this.oParent.css({width: this.settings.w, height: this.settings.h}); //设置id为oParent的div的长，高
    this.slider_item.css({position: 'absolute', width: this.settings.w, height: this.settings.h}); //设置slider_item为 position:'absolute',父元素为 class='slider'

    for (var i = 1; i < this.slider_item.length; i++) { //从1开始，所以初始化是0,所以第一张图片为0，正常显示。
      $(this.slider_item[i]).css({left: this.settings.w}); //除了0，其余的所有都是距离左边是document.body.width();
    }

    this.oSlider.css({width: sliderBox_w, height: this.settings.h}); //class为slide的div,就是包含了5个图片的div，长为 document.body.width() * 5，高为760

    this.setDot(0); //刚开始是选中第一个
    this.themeClass(true);
  },

  createElem: function (oParent,btn_left,btn_right) {
    var createSlider = document.createElement('div');
    var imgStr = '';
    var btnStr = '';
    var left_= '';
    var right_ = '';

    imgStr += '<a href="javascript:;" class="slider-item" style=" background: url('+ this.bgOne + ') no-repeat center;"></a>';
    btnStr += '<a href="javascript:;" class="btn-item"></a>';
    imgStr += '<a href="javascript:;" class="slider-item" style=" background: url('+ this.bgTwo + ') no-repeat center;"></a>';
    btnStr += '<a href="javascript:;" class="btn-item"></a>';
    imgStr += '<a href="javascript:;" class="slider-item" style=" background: url('+ this.bgThree + ') no-repeat center;"></a>';
    btnStr += '<a href="javascript:;" class="btn-item"></a>';
    imgStr += '<a href="javascript:;" class="slider-item" style=" background: url('+ this.bgFour + ') no-repeat center;"></a>';
    btnStr += '<a href="javascript:;" class="btn-item"></a>';

    left_= '<span class="btn_left glyphicon glyphicon-triangle-left" style="font-size:30px;"></span>';
    right_ = '<span class="btn_right glyphicon glyphicon-triangle-right" style="font-size:30px;"></span>';
      

    $(createSlider).attr({id: oParent, class: 'slider-box'});
    if(btn_left && btn_right){
      $(createSlider).html('<div class="slider">'+imgStr+'</div><div class="btn-box">'+btnStr+'</div>'+left_+right_);
    }else if(btn_left && !btn_right){
      $(createSlider).html('<div class="slider">'+imgStr+'</div><div class="btn-box">'+btnStr+'</div>'+left_);
    }else if(btn_right && !btn_left){
      $(createSlider).html('<div class="slider">'+imgStr+'</div><div class="btn-box">'+btnStr+'</div>'+right_);
    }else {
       $(createSlider).html('<div class="slider">'+imgStr+'</div><div class="btn-box">'+btnStr+'</div>');
    }

    this.oWrapper.append(createSlider);
  },

  btn_left_change:function(){

      if(this.iNow == this.slider_item.length - 1){
        for(var i = 1;i<this.slider_item.length-1;i++){
          $(this.slider_item[i]).css({left:this.slider_w});
          this.slider_item.eq(0).css({left:this.slider_w});
          this.slider_item.eq(0).animate({left:0});
          this.slider_item.eq(this.iNow).animate({left:-this.slider_w});
        }   
        
        this.iNow = 0;
      }else if(this.iNow == this.slider_item.length - 2){
        this.slider_item.eq(this.iNow).animate({left:-this.slider_w});
        this.slider_item.eq(this.iNow + 1).css({left:this.slider_w});
        this.slider_item.eq(this.iNow + 1).animate({left:0});
        this.iNow++;
      }else{
        this.slider_item.eq(this.iNow).animate({left:-this.slider_w});
        this.slider_item.eq(this.iNow + 1).animate({left:0});
        this.iNow++;
      }

      this.setDot(this.iNow);
      if (this.iNow === 0) {
        this.themeClass(true);
      } else {
        this.themeClass(false);
      }
  },

  btn_right_change:function(){
    if(this.iNow == 0){
        this.slider_item.eq(this.iNow).animate({left:this.slider_w});
        this.slider_item.eq(this.slider_item.length-1).css({left:-this.slider_w});
        this.slider_item.eq(this.slider_item.length-1).animate({left:0});
      this.iNow = this.slider_item.length - 1;
    }else {
      this.slider_item.eq(this.iNow).animate({left:this.slider_w});
      this.slider_item.eq(this.iNow - 1).css({left:-this.slider_w});
      this.slider_item.eq(this.iNow - 1).animate({left:0});
      this.iNow--;
    }
    this.setDot(this.iNow);
    if(this.iNow === 0){
      this.themeClass(true);
    } else {
      this.themeClass(false);
    }

  },

  inital: function (oParent,btn_left,btn_right,opt) {
    var self = this;

    $.extend(this.settings, opt);   //opt会合并到this.settings对象，并且opt会覆盖相同的key值

    this.createElem(oParent,btn_left,btn_right);   //this指prototype对象，去引用 createElem方法。


    this.oParent = $('#'+oParent+'');
    this.oSlider = this.oParent.find('.slider');
    this.slider_item = this.oSlider.find('.slider-item');
    this.btn_item = this.oParent.find('.btn-item');
    this.btn_left_ = this.oParent.find('.btn_left');
    this.btn_right_ = this.oParent.find('.btn_right');

    this.setData();  //引用setData()方法

    this.slider_w = this.slider_item.eq(0).width(); //第一个的长
    this.slider_h = this.slider_item.eq(0).height(); //第一个的高
    this.get_l = this.settings.w;

    this.btn_item.click(function () {
      var index = $(this).index(); //取得点击的点的下标
      // console.log('index',this.iNow);

      self.setDot(index);

      self.sliderChange(index);

      self.iNow = $(this).index();  //点击的是第几个，就把值传给全局iNow。
    });

    this.btn_left_.click(function(){
      // var index = $(this).index();
      self.btn_left_change();
      // self.iNow = $(this).index();
    })
    this.btn_right_.click(function(){
      // var index = $(this).index();
      self.btn_right_change();
      // self.iNow = $(this).index();
    })

    this.oSlider.on('mousedown', function () { //触发mousedown事件,实际上就是拖拽行为导致图片滑动
      self.mousedown(); //引用mousedown()方法

      return false;
    });
  },

  constructor: Slider
};