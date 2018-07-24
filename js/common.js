//OS 분기처리
var ipadOS = false;
if (navigator.appVersion.indexOf("iPad")!=-1) ipadOS = true;

var AndroidOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("android") != -1 ) AndroidOS = true;

var isPc = (AndroidOS == false && ipadOS ) ? true : false;

var WindowsTenOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("webview") != -1 ) WindowsTenOS = true;

//윈도우10
init_js=function(src_name){
	var scriptUI=document.createElement('script');
	var urlUI = src_name;
	scriptUI.type='text/javascript';
	scriptUI.language='javascript';
	scriptUI.src=urlUI + '?d=' + new Date().getTime();
	//윈도우 10
	if(WindowsTenOS){
		window.external.notify(scriptUI.src);
	}else{
		$("body").append(scriptUI);
	}
	
}

$(document).ready(function(){

	//학습목표 레이어
	$('.ibtn.study').click(function(){
		$(this).parent().next('.popup-type2').toggle();
	});

	$('.popup-type1-close').click(function(){
		$('.popup-type2').hide();
	});

	// 정답 확인 버튼 클릭시 정답 보이는 레이어
	$(".answer_check").click(function(){
		var index = $(this).index();

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).children().next().css('display','none');
			$(" :input").each(function(){
				//$(this).val('');
			});
		}else{
			$('.answer_check').each(function(idx){
				//if(index === idx){

				//}else{
					$(this).removeClass('active');
					$(this).children().next().css('display','none');
				//}
			});

			$(this).addClass('active');
			$(this).children().next().css('display','block');
		}
	});


	//용어정리 레이어
	$(".term").each(function(){
		$(this).on("click", function(){
			$this = $(this);
			$(".term_layer").each(function(){
				$(this).remove();
			});
			//layerAclose();
			terms($this);

		});
	});

    function terms($this){
        var termTop = $this.offset().top;
        var termLeft = $this.offset().left;
        var termWidth = $this.width();

        if (parent.ZOOMVALUE == undefined) {
            parent.ZOOMVALUE = 1;
        }
        var zoom = parent.ZOOMVALUE;

        termTop = termTop / zoom;
        termLeft = termLeft / zoom;

        /*화살표의 위치*/
        if (termTop > 400 && termTop < 900){
            posY = "b";
        }else{
            posY = "t";
        }

        if (termLeft > 400){
            posX = "r";
        }else{
            posX = "l";
        }

        posArrow = posY + posX;

        termId = $this.attr("data-term");

        $.ajax({
            type: "GET",
            url: "term_list.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('term_list').each(function(){
                    $("term", $(this)).each(function(){
                        term = $(this).attr("sid");
                        if (termId == term )
                        {
                            tit = $(this).attr("title");
                            des = "<div style='padding-right:9px; line-height:22px;text-align:justify;'>"+$(this).attr("des")+"</div>";
                            asrc = $(this).attr("src");
                            if (asrc != ""){
                                src_str = "<div style='padding:5px'><img id='eee' width='280' /></div>";
                            }else{
                                src_str = "";
                            }

                            $termLayer = $("<div class='term_layer' style='width:300px;display:none;'>" +
                                "<div style='position:absolute;top:0px;left:0px;width:100%;height:30px;background-color:rgb(248, 216, 56);border-radius:3px 3px 0px 0px;'>"+
                                "<div style='position:absolute;top:4px;left:0px;font-size:16px;height:20px;padding:3px 10px; color:#fff;'>"+tit+"</div>"+
                                "<div style='position:absolute;top:-2px;right:5px;'><img class='termclose' src='images/common/close.png'/></div>"+
                                "</div>" +
                                "<span class='" + posArrow +"'></span>" + des +
                                src_str	+
                                "</div>").appendTo("body");

                            $('#eee').attr('src',asrc);

                            setTimeout(function(){
                                termLayerHeight = $termLayer.height();

                                if (posY == 'b'){
                                    termLayerTop = termTop - termLayerHeight - 50-17;
                                }else {
                                    termLayerTop = termTop + 29;
                                }

                                if (posX == 'r'){
                                    termLayerLeft = termLeft + termWidth -345 +37;
                                }else {
                                    termLayerLeft = termLeft - 6 ;
                                }

                                $termLayer.css({
                                    top:termLayerTop,
                                    left:termLayerLeft,
                                    display:'block'
                                });


                                $(".term_layer").each(function(){
                                    $(this).on("click", function(){
                                        $(this).remove();
                                    });
                                });
                            },100);
                        }
                    });
                });
            }
        });
	}
	

	//별도 팝업(새창 1536 x 1024)
	$('.pop_wrap .pop_close').on('click',function(){
		window.close();

	});

	//레이어 팝업(768 x 1024): 닫기 재정의
	$('.layer_wrap .layer_close02').on('click',function(){
		if ( $(this).parent('div').hasClass('ly3') == false ){
			$(this).parent('div').parent('div.layer_wrap').css('display','none');
			$('audio').attr('src', '');
			AllOff();

		} else {
			$(this).parent('div.layer_wrap').css('display','none');

		}
	});
	/* 이번 시간에는: 열기 재정의 - [2017-11-07_김규식] */
	$('.btnIs').on('click', function(){
		if( $('.ly2.view').css('display') == 'none' ){
			$('.ly2').css('display','block');

		} else {
			$('.ly2').css('display','none');

		}
	})
	/* 이번 시간에는: 닫기 재정의 - [2017-10-31_김규식] */
	/*
	$('.btnIs').on('click', function(){
		if( $('.ly2').css('display') == 'block' ){
			$('.ly2').css('display','none');
			return false;

		}
	})
    /* 팝업 예시보기 - [2017-10-16_김규식] */
    $('.btn_wrap div, .btn_wrap2 div, .btn_box div').each(function(){
		$(this).click(function(){
			//팝업 예시보기 재정의: 동작 방지 - [2017-10-31_김규식]
			if( $(this).hasClass('btnEx') ){


				var btn2_idx_ori = $(this).index();
				var btn2_idx = btn2_idx_ori + 1;
				$('.layer_wrap.view_ex0'+btn2_idx).css("display", "block");

			}
		});
	})

	//type : study 보충심화, view 실험관찰
	//레이어 OPEN 개별 js에서 함수를 호출 layer_open('study',0);
	layer_open = function(type,tab){
		$('.layer_wrap.'+ type).fadeIn(100);
		//$('.layer_wrap.'+ type).css('visibility','visible');
		$('.layer_wrap.'+ type).find('.tabs > span').removeClass('on').eq(tab).addClass('on');
		$('.layer_wrap.'+ type).find('.layer_body ul.tab_layer> li').hide().eq(tab).css('display','block');
	}
	//레이어 tab 체인지
	$('.tabs > span').on('click',function(){
		var idx = $(this).index();
		var tabObj = $(this).closest('.layer_wrap');
		$(this).parent().find('.tabs > span').removeClass('on').eq(idx).addClass('on');
		tabObj.find('ul.tab_layer> li').hide().eq(idx).css('display','block');

		//동영상 탭 컨트롤 - [2017-10-20_김규식]
		AllOff();
		var tab_idx = tabObj.find('.tab_layer').children('li:eq('+idx+')');
		if ( tab_idx.find('div.movie_slider_content').children('div').hasClass('pop_movie_player') == true ){
		//동영상이 존재할 때만 실행하도록 제어

			//동영상 플레이어 번호 호출
			var video_playerNum = tabObj.find('.tab_layer').children('li:eq('+idx+')').find('.embedded-video').attr('id');
			var playerNum_last = video_playerNum.charAt(video_playerNum.length - 1);
			var video_idx = playerNum_last - 1;
			movieSlider(video_idx);

		}
	});


	//말풍선 토글 - [2017-10-25_김규식]
	var page_num = $('.page_num').text();
	//view_num: 움직이는 GIF를 담고있는 클레스명, btn_index: 버튼 인덱스값, true_num: 대응하는 이미지의 마지막 숫자
	bub_toggle = function(view_num, btn_index, true_num){
		if ( $('.btn_wrap div:eq('+btn_index+')').hasClass('active') == false ){
		//함수가 호출 됐을 때. 이와 관련되는 GIF 이미지 상태를 확인하여 '활성화'가 아니라면

			//호출한 대상을 제외한 엘리먼트 처음 상태로 맞추기
			bub_resetAll();

			//호출한 대상과 영항을 갖는 엘리먼트 동작하기, 대상 버튼에 active 클레스 추가
			$('.'+view_num+'.a'+page_num+'-'+true_num).css('display','inline');
			$('.stop.a'+page_num+'-'+true_num).hide();
			$('.btn_wrap div:eq('+btn_index+')').addClass('active');
			$('.speech.'+view_num).fadeIn(300);

			//사운드 버튼 토글 - [2017-10-24_김규식]
			btnSound_toggle();

		} else {
		//GIF 이미지가 활성화 상태라면 처음 상태로 되돌린다.

			$('.btn_wrap div:eq('+btn_index+')').removeClass('active');
			bub_reset(view_num, btn_index, true_num);

		}
	}
	//호출한 대상을 제외한 엘리먼트 처음 상태로 맞추기 - [2017-10-25_김규식]
	bub_resetAll = function(){
		$('.am_wrap .layer_wrap').css('display','none');
		$('.am_wrap .stop').css('display','block');
		$('.btn_wrap div').removeClass('active');
		$('.speech').css('display','none');

	}

	/* - - - - - - - - - - - - -  - - - - - - - - - - - - - *//*

	//사운드 동작 - [2017-11-09_김규식]
	audioPlay = function (ctl, audio_idx){
		if( $('audio').length < 1){
		//제일 처음 함수가 호출 됐을 때 바디에 오디오를 붙인다.
			var audioStr='';
			audioStr=audioStr+'<audio id="player-audio">';
			audioStr=audioStr+'<source src="" />';
			audioStr=audioStr+'</audio>';
			$('body').append(audioStr);
			audio=$('audio')[0];
			audio.src = src_audio[audio_idx];

		} else if( $('audio').attr('src') == src_audio[audio_idx] ) {
		//바디에 오디오를 붙인 이후에는 오디오의 경로가 같은지 체크한다. --> 사용자가 엘리먼트를 클릭하여 동일한 함수를 호출했는지 확인한다. 동일한 함수를 호출 했다면 호출된 오디오의 주소가 같기 때문에 바디에 붙인 오디오에서 경로를 빼줌으로서 오디오 플레이를 중지시킬 수 있다.
			ctl ='pause';
			$('audio').attr('src', '');

		} else {
		//바디에 오디오를 붙인 이후, 호출된 오디오의 경로가 같지 않을 때는 호출된 인덱스 값에 따라서 배열에서 오디오 경로를 가지고 온다.
			clt = 'play';
			$('audio').attr('src', src_audio[audio_idx]);

		}

		if(ctl=='play'){
			audio.play();
		}else if(ctl=='pause'){
			audio.pause();
		}else if(ctl=='stop'){
			audio.load();
			audio.pause();
			if($(".btn.btnStop")){
				$(".btn.btnStop").removeClass('btnStop').addClass('btnSound');
			}
		}

		//사운드 종료: 말풍선 처음 상태로 되돌리기
		audio.addEventListener("ended", function() {
			bub_resetAll();

		}, true);

	}

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - */

	//사운드 버튼 토글 제어: 사운드 버튼이 아닌 재생 버튼에만 호출해서 사용 - [2017-10-19]
	function btnSound_toggle(){
		//사운드 버튼이 아닌 다른 재생 버튼, 예를 들어 말풍선 등. 오디오 속성을 가진 엘리먼트를 클릭 했을 때. 사운드 버튼을 처음 상태로 되돌리는 함수이다. --> 사운드 버튼과 말품선이 동시에 존재하는 화면에서 사용한다.
		if($('.btn.btnSound').hasClass('btnSound')){
			$(this).removeClass('btnSound').addClass('btnStop');

		}else{
			$('.btn.btnStop').removeClass('btnStop').addClass('btnSound');

		}
	}
	//사운드 버튼 토글 - [2017-10-19]
	$(".btn.btnSound, .btn.btnStop").on("click",function(){
		//순수하게 사운드 버튼을 클릭 했을 때의 동작을 담고있다. 사운드 버튼 이미지를 토글해 준다.
		if($(this).hasClass('btnSound')){
			$('.btn.btnStop').removeClass('btnStop').addClass('btnSound');
			$(this).removeClass('btnSound').addClass('btnStop');

		}else{
			$(this).removeClass('btnStop').addClass('btnSound');

		}
	});
	//말풍선, GIF애니메이션 '리셋 함수'
	function bub_reset(view_num, btn_index, true_num){
		//대응하는 엘리먼트를 처음 상태로 되돌린다
		$('.am_wrap .a'+page_num+'-'+true_num).css('display','block');
		$('.am_wrap .'+view_num+'.a'+page_num+'-'+true_num).css('display','none');
		$('.speech.'+view_num).css('display','none');

	}


	//내용핵심정리
	$('.summarize_wrap .summarize_btn').on('click',function(){
		layerAclose();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.summarize_pop').hide();
		}else{
			$(this).addClass('active');
			$('.summarize_pop').show();
		}
	});
	//내용핵심정리 본문 클릭 닫기
	$('.summarize_wrap .summarize_pop').on('click',function(){
		$('.summarize_wrap .summarize_btn').removeClass('active');
		$('.summarize_pop').hide();
	});



	//ref 참조사항
	$('.ref .title').on('click',function(){
		//학습목표닫기
		if($('.learning_goal .learning_goal_title')){
			$('.learning_goal .learning_goal_title').removeClass('active').parent().children('.learning_goal_text').hide();
		}
		//용어설명 닫기
		//$(".term_layer").each(function(){
		//	$(this).remove();
		//});

		//ref 여러개 있을 경우 닫기
		var index = $(this).parent().index();//부모 index 값
		$('.ref .title').each(function(){
			var idx = $(this).parent().index();//부모 index 값
			if(idx !== index){
				$(this).removeClass('active');
				$(this).parent().children('.text').hide();
			}
		});

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().children('.text').hide();
		}else{
			$(this).addClass('active');
			$(this).parent().children('.text').show();
		}

	});
	//ref 참조사항 본문 클릭 닫기
	$('.ref .text').on('click',function(){
		$(this).prev().removeClass('active');
		$(this).hide();
	});

	//학습목표
	$('.learning_goal .learning_goal_title').on('click',function(){
		//ref 참조사항
		if($('.ref .title')){
			$('.ref .title').removeClass('active').parent().children('.text').hide();
		}
		//용어설명 닫기
		//$(".term_layer").each(function(){
		//	$(this).remove();
		//});

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().children('.learning_goal_text').hide();
		}else{
			$(this).addClass('active');
			$(this).parent().children('.learning_goal_text').show();
		}

	});
	//학습목표 본문 클릭 닫기
	$('.learning_goal .learning_goal_text').on('click',function(){
		$('.learning_goal .learning_goal_img').removeClass('active');
		$('.learning_goal .learning_goal_text').hide();
	});


	// input 배경이미지	 2017-10-09
    $('input').each(function(input_idx){

        //console.log("input_idx :" + input_idx);

        $("input:eq("+ input_idx +")").focus(function(){
            $(this).removeClass("write");
        });

        $("input:eq("+ input_idx +")").blur(function(){
            if($(this).val() == 1){
                $(this).removeClass("write");
            } else if($(this).val() == 0){
                $(this).addClass("write");
            }
        });
    });

    // textarea 배경이미지	2017-10-09
    $('textarea').each(function(textarea_idx){

		//console.log("textarea_idx :" + textarea_idx);

		$("textarea:eq("+ textarea_idx +")").focus(function(){
			$(this).removeClass("write");
		});

		$("textarea:eq("+ textarea_idx +")").blur(function(){
			if($(this).val() == 1){
				$(this).removeClass("write");
			} else if($(this).val() == 0){
				$(this).addClass("write");
			}
		});
	});


});

//학습목표, 참조사항, 각종레이어 닫기
//레이어를 공통으로 닫기를 할 경우 이곳에 추가한다.
function layerAclose(){
	if($('.summarize_pop'))$('.summarize_pop').hide();
	if($('.ref .title'))$('.ref .title').removeClass('active').parent().children('.text').hide();
	if($('.learning_goal .learning_goal_img'))$('.learning_goal .learning_goal_img').removeClass('active').parent().children('.learning_goal_text').hide();
	if($('.a_ps'))$('.a_ps').hide();
	if($('.b_ps')){$('.b_ps').hide()};
	if($('.s_p_answer')){$('.s_p_answer').hide();};
	//if($('.ex_answer')){$('.ex_answer').hide().parent().removeClass('active');};
}

//슬라이더 js
var imageSlide = {

	init : function(){
		var slide_content = document.getElementsByClassName('slider_content');
		for(var i=0,j=slide_content.length; i<j; i++){
			var slider_image = slide_content[i].getElementsByClassName('slider_image')[0];
			var image = slider_image.children;
			var thumbnail = slide_content[i].getElementsByClassName('slider_thumbnail')[0];
			var prev_button = slide_content[i].getElementsByClassName('slide_prev_button')[0];
			var next_button = slide_content[i].getElementsByClassName('slide_next_button')[0];
			var thumbnail_list = thumbnail.children;
			slider_image.firstElementChild.classList.add('on')
			for(var m=0,n=thumbnail_list.length; m<n; m++){
				if(m===0) thumbnail_list[m].classList.add('on');
				thumbnail_list[m].addEventListener('mousedown',imageSlide.showImg,false);
				image[m].addEventListener('touchstart', imageSlide.swipe.swiper, false);
				image[m].addEventListener('touchmove', imageSlide.swipe.swiper, false);
				image[m].addEventListener('touchend',imageSlide.swipe.swiper, false);
			}

			prev_button.style.opacity = "0.3";
			prev_button.style.pointerEvents = 'none';
			prev_button.addEventListener('mousedown',function(){
				imageSlide.buttonAction.prevImageShow.call(this.parentNode);
			});
			next_button.addEventListener('mousedown',function(){
				imageSlide.buttonAction.nextImageShow.call(this.parentNode);
			});
		}
	},
	showImg  : function(){
		var content =  this.parentNode.parentNode.parentNode;
		var index = parseInt(this.getAttribute('data-num'));
		var slide = content.getElementsByClassName('slider_image')[0];
		var prevButton = content.getElementsByClassName('slide_prev_button')[0];
		var nextButton = content.getElementsByClassName('slide_next_button')[0];
		this.parentNode.getElementsByClassName('on')[0].classList.remove('on');
		this.classList.add('on');
		slide.getElementsByClassName('on')[0].classList.remove('on');
		slide.children[index-1].classList.add('on');
		if(index===slide.children.length) {
			nextButton.style.opacity = "0.3";
			nextButton.style.pointerEvents = 'none';
			prevButton.style.opacity = "1";
			prevButton.style.pointerEvents = 'auto';
		}else if(index===1){
			prevButton.style.opacity = "0.3";
			prevButton.style.pointerEvents = 'none';
			nextButton.style.opacity = "1";
			nextButton.style.pointerEvents = 'auto';
		}else {
			nextButton.style.opacity = "1";
			nextButton.style.pointerEvents = 'auto';
			prevButton.style.opacity = "1";
			prevButton.style.pointerEvents = 'auto';
		}
	},
	buttonAction : {

		prevImageShow : function(){
			console.log(this)
			var slide = this.getElementsByClassName('slider_image')[0];
			var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
			var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
			var prevButton = this.getElementsByClassName('slide_prev_button')[0];
			var nextButton = this.getElementsByClassName('slide_next_button')[0];
			if(index === 1) {
				return false;
			}else{
				slide.getElementsByClassName('on')[0].classList.remove('on');
				slide.children[index-2].classList.add('on');
				thumbnail.getElementsByClassName('on')[0].classList.remove('on');
				thumbnail.children[index-2].classList.add('on');
				if(index === 2) {
					prevButton.style.opacity = "0.3";
					prevButton.style.pointerEvents = 'none';
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
				}else{
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}
			}
		},
		nextImageShow : function(){
			var slide = this.getElementsByClassName('slider_image')[0];
			var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
			var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
			var prevButton = this.getElementsByClassName('slide_prev_button')[0];
			var nextButton = this.getElementsByClassName('slide_next_button')[0];

			if(index === slide.children.length) {
				return false;
			}
			else {
				slide.getElementsByClassName('on')[0].classList.remove('on');
				slide.children[index].classList.add('on');
				thumbnail.getElementsByClassName('on')[0].classList.remove('on');
				thumbnail.children[index].classList.add('on');
				if(index === slide.children.length-1) {
					nextButton.style.opacity = "0.3";
					nextButton.style.pointerEvents = 'none';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}else{
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}
			}
		}
	},
	swipe : {
		touch : null,
		start_x : null,
		start_y : null,
		end_x : null,
		end_y : null,
		move : false,
		swiper : function(event){
			if (typeof event !== 'undefined') {
				if (typeof event.touches !== 'undefined') {
					imageSlide.swipe.touch = event.touches[0];
					if(event.type === 'touchstart'){
						imageSlide.swipe.start_x = Math.floor(imageSlide.swipe.touch.pageX);
						imageSlide.swipe.start_y = Math.floor(imageSlide.swipe.touch.pageY);
						imageSlide.swipe.move = false;
					}else if(event.type === 'touchmove'){
						imageSlide.swipe.move = true;
						imageSlide.swipe.end_x = Math.floor(imageSlide.swipe.touch.pageX);
						imageSlide.swipe.end_y = Math.floor(imageSlide.swipe.touch.pageY);
					}else if(event.type === 'touchend'){
						if(imageSlide.swipe.move) imageSlide.swipe.start_x - imageSlide.swipe.end_x > 0 ? imageSlide.buttonAction.prevImageShow.call(this.parentNode.parentNode.parentNode.parentNode) : imageSlide.buttonAction.nextImageShow.call(this.parentNode.parentNode.parentNode.parentNode)

					}
				}
			}
		}
	}
}

// 디바이 터치 등록
var GameManager = {
	event: {
		isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
		eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
            	case 'eventDown':
            	selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
            	break;
            	case 'eventMove':
            	selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
            	break;
            	case 'eventUp':
            	selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
            	break;
            	case 'eventOut':
            	selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
            	break;
            }
            return selectedEvent;
        }
    }
};

// createElement 초기 설정
function QSAll (target) {return document.querySelectorAll(target);}

function createElement (type, targetElement, className, width, height) {
	var createObject = document.createElement(type);

	if (className !== undefined) createObject.className = className;
	if (width !== undefined) 	 createObject.style.width = width + 'px';
	if (height !== undefined) 	 createObject.style.height = height + 'px';

	targetElement.appendChild(createObject);
	return createObject;
}


// 디바이 터치 등록
var GameManager = {
	event: {
		isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
		eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
            	case 'eventDown':
            	selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
            	break;
            	case 'eventMove':
            	selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
            	break;
            	case 'eventUp':
            	selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
            	break;
            	case 'eventOut':
            	selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
            	break;
            }
            return selectedEvent;
        }
    }
};


function QS (target) { return document.querySelector(target); }
function eventSelector (eventType, e) {
	var eventMaster;

	if (eventType === 'eventDown') {
		switch (GameManager.event.eventSelector('eventDown')) {
			case "mousedown":
			eventMaster = e;
			break;
			case "touchstart":
			e.preventDefault();
			eventMaster = e.touches.item(0);
			break;
		}
	} else if (eventType === 'eventMove') {
		switch (GameManager.event.eventSelector('eventMove')) {
			case "mousemove":
			eventMaster = e;
			break;
			case "touchmove":
			eventMaster = e.touches.item(0);
			break;
		}
	} else if (eventType === 'eventUp') {
		switch (GameManager.event.eventSelector('eventUp')) {
			case "mouseup":
			eventMaster = e;
			break;
			case "touchend":
			eventMaster = e.changedTouches[0];
			break;
		}
	} else if (eventType === 'eventOut') {
		switch (GameManager.event.eventSelector('eventOut')) {
			case "mouseout":
			eventMaster = e;
			break;
			case "touchleave":
			eventMaster = e.touches.item(0);
			break;
		}
	}
	return eventMaster;
}


// 이벤트(설정) 추가 : mousedown, mousemove, mouseup, mouseout
function addEvent (target, eType, fnc) {
	var eventType;
	switch(eType){
		case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
		case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
		case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
		case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
	}
	return target.addEventListener(eventType, fnc, false);
}

// 이벤트(설정) 삭제 : mousedown, mousemove, mouseup, mouseout
function removeEvent (target, eType, fnc) {
	var eventType;
	switch(eType) {
		case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
		case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
		case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
		case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
	}
	return target.removeEventListener(eventType, fnc, false);
}

// 선택 사운드 (mousedown, touchstart)
function soundEvent (target, src) {
	target.addEventListener(GameManager.event.eventSelector('eventDown'), function(){
		efSound(src);
	}, false);
}



function initScale(id) {
	//var wrap = document.getElementById('container');
	var wrap = document.getElementById(id);

	GameManager.event.clientWidth = document.body.clientWidth;
	GameManager.event.clientHeight = document.body.clientHeight;

	GameManager.event.wrapWidth = wrap.clientWidth;
	GameManager.event.wrapHeight = wrap.clientHeight;

	GameManager.event.zoomVertical = (GameManager.event.clientHeight / GameManager.event.wrapHeight) * 1.0;
	GameManager.event.zoomHorizontal = (GameManager.event.clientWidth / GameManager.event.wrapWidth) * 1.0;

	if(parent.ZOOMVALUE == undefined) {
		parent.ZOOMVALUE = 1;
	}
	if (GameManager.event.clientHeight < GameManager.event.clientWidth) {
		GameManager.event.zoomRate = parent.ZOOMVALUE;
	} else {
		GameManager.event.zoomRate = GameManager.event.zoomHorizontal;
	}

    // alert(GameManager.event.zoomRate);
}


/* 웹뷰 Scale 조정치 */
currentScale=function()
{
	if( typeof WebKitCSSMatrix == "undefined" )
		return 1;

	if( window.getComputedStyle(document.body).webkitTransform == "none" )
		return 1;

	var curTransform = new WebKitCSSMatrix(window.getComputedStyle(document.body).webkitTransform);

	return curTransform.d;
}

function AllOff(){
	$("video, audio").each(function(){
		$(this).get(0).pause();
		$(this).parent().find('.play_pause_button').removeClass('pause');
		$(this).parent().find('.play_pause_button').addClass('play');
		$(this).parent().find('.play_pause_button').html('재생');
	});
}

function AllStop(){
	$("video, audio").each(function(){
		$(this).get(0).load();
		$('.video-btn-close').hide();
		$(".btn.btnPlay").show();
	});
}


//문제 클릭시 사운드
function play_sound_click(){
	if( $('audio#player-audio-click').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-click">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-click')[0];
	var aSrc_click='media/click.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}
//정답 사운드
function play_sound_o(){
	if( $('audio#player-audio-o').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-o">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-o')[0];
	var aSrc_click='media/eff_ok.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}
//오답 사운드
function play_sound_x(){
	if( $('audio#player-audio-x').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-x">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-x')[0];
	var aSrc_click='media/eff_fail.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}


//안드로이드 4.0 4.1 체크
function chkAndroid(){
	var uAgent = navigator.userAgent.toLowerCase();
	var mobilePhones = new Array('android 4.0','android 4.1');
	var isAndroid = false;
	for(var i=0;i < mobilePhones.length; i++){
		if(uAgent.indexOf(mobilePhones[i]) > -1)
		{
			isAndroid = true;
			break;
		}
	}
	return isAndroid;
}











/* 동영상 슬라이드 2017-09-21 */
function movieSlider(sidx,movieIdx) {
	var ww = 640;
	var hh = 360;
	var videoUrl;
	var sidx = sidx;
	var currentIdx = "0" + (sidx + 1);
	var movieIdx; //동영상 인덱스

	if ( movieIdx == null || movieIdx == "" ){ movieIdx = 0; };
	videoUrl = videoSlideUrl[sidx][movieIdx] + ".mp4";

	var videoSlide = new videoPlayer({container : "videoSlide_"+ currentIdx , src : videoUrl, width : ww, height : hh});
	//$(".movie_slider_content.s"+ currentIdx +" .videoSrc").load();
	//$(".movie_slider_content.s"+ currentIdx +" .videoSrc").get(0).play();
	videoSlide.video.load();
	videoSlide.play();

	//썸네일 토글
	var thumbnailToggle = function(){
		$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li").removeClass("on");
		$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li:eq("+ movieIdx +")").addClass("on");
	};
	thumbnailToggle();

	//썸네일
	$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li").off().on("click",function(){
		movieIdx = $(this).index();
		movieSlider(sidx,movieIdx);
		thumbnailToggle();
	});

	//좌우버튼
	var thumbnailCnt = $(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail li").length;
	$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").off().on("click",function(){
		if( movieIdx > 0 ) {
			movieIdx = movieIdx - 1;
			movieSlider(sidx,movieIdx);
		};
		thumbnailToggle();
	});
	$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").off().on("click",function(){
		if( movieIdx < thumbnailCnt-1 ) {
			movieIdx = movieIdx + 1;
			movieSlider(sidx,movieIdx);
		};
		thumbnailToggle();
	});

	//버튼 활성화/비활성화
	if ( movieIdx == 0 ) {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"0.3","pointer-events":"none"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"1","pointer-events":"auto"});
	} else if ( movieIdx == thumbnailCnt-1 ) {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"1","pointer-events":"auto"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"0.3","pointer-events":"none"});
	} else {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"1","pointer-events":"auto"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"1","pointer-events":"auto"});
	};
};

/* 동영상 슬라이드 실행 2017-09-21 */
function movieSliderInit(){
    $(".movie_slider_content").each(function(sidx){
        movieSlider(sidx,0);
    });
};

/* TD영역 클릭 시 input focus */
$(document).ready(function(){
//(function(){
	$("td").off().on("click",function(){
		if($(this).children("input")){
			$(this).children("input").focus();
		}
	});
//})();
});

/* 임시 : 동영상 포스터 제거 */
$(document).ready(function(){
	$("video").each(function(){
		//$(this).attr("poster","images/common/movie.png");
		$(this).removeAttr("poster");
	});
});

/* 임베디드 동영상 컨트롤러 제거 */
$(document).ready(function(){
	$('.embedded-video').addClass('del_control');
})

$(document).ready(function(){
	$('.vclose').on('click',function(){
		AllOff();
		$('.zoom_img_wrap').hide();
	});
});

$(function(){
	
	/* 사용한 아이콘 처리: 확인한 동영상에 디세츄레이션 효과 [2017.12.07]_김규식 */
	$('.btn.btnPlay, .btn.btn360').on('click', function(){
		var THIS = $(this);
		
		//버튼 타입 확인
		if ( THIS.hasClass('btnPlay') ){
			btn_toggleImg('Play');
		} else {
			btn_toggleImg('360');
		}
		
		//버튼 이미지 변경
		function btn_toggleImg(str){
			if ( THIS.hasClass('btn'+str) ){
				THIS.addClass('btn'+str+'ed').removeClass('btn'+str);
			}
		}
	});
	
});

$(function(){
	
  /* 텍스트 되돌리기 [2017.12.11]_김보민 */
  var $input_text = $('.resetArea').find('input, textarea');

  // 텍스트 입력시 버튼생성
  $input_text.keydown(function(){
    var resetIdx = $(this).parents('.resetArea').attr('data-reset');
    $('#resetBtn_'+resetIdx).addClass('on')
    $('#answerBtn_'+resetIdx).addClass('on')
  })

  // 입력 텍스트 지우기
  $('.btnReset').on('click', function(){
    var resetId = $(this).attr('id').split('_')[1];
    console.log(resetId)
    $('.resetArea').eq(resetId).find('input, textarea').val('');
  })
	
});

$(document).ready(function(){

		// 문제풀이 버튼
		$(".btn.end").on("click",function(){ //문제풀이 : 마무리퀴즈
			var layerStatus = $('.layer_wrap.qa').hasClass('on');
			if(!layerStatus){
				$('.layer_wrap.qa').addClass('on');
			}
		});
		$('.layer_wrap.qa .layer_close').on('click', function(){
			var layerStatus = $('.layer_wrap.qa').hasClass('on');
			if(layerStatus){
				$('.layer_wrap.qa').removeClass('on');
			}
		})

		// 문제풀이
		$('.layer_wrap.qa .sub_tabs span').on('click', function(){
			var tapIdx = $(this).index();
			var btnStatus = $(this).hasClass('on');

			if(!btnStatus){
				$(this).addClass('on').siblings().removeClass('on');
				$('.layer_wrap.qa .tab_layer>li').eq(tapIdx).addClass('on').siblings().removeClass('on');
			}
		})

		// 단원평가 버튼
		$(".btn.btnTest").on("click",function(){ //단원평가
			var layerStatus = $('.layer_wrap.test').hasClass('on');
			if(!layerStatus){
				$('.layer_wrap.test').addClass('on');
			}
		});
		$('.layer_wrap.test .layer_close').on('click', function(){
			var layerStatus = $('.layer_wrap.test').hasClass('on');
			if(layerStatus){
				$('.layer_wrap.test').removeClass('on');
			}
		})
		// 문제풀이
		var tapIdx = 0;
		$('.layer_wrap.test .sub_tabs span').on('click', function(){
			tapIdx = $(this).index();
			var btnStatus = $(this).hasClass('on');

			if(!btnStatus){
				$(this).addClass('on').siblings().removeClass('on');
				$('.layer_wrap.test .tab_layer>li').eq(tapIdx).addClass('on').siblings().removeClass('on');
			}
		})

		// 문제풀이 슬라이드 넘버
		$('.slide_btn .right').on('click', function(){

			if(tapIdx < $('.layer_wrap.test .sub_tabs span').length - 1){
				tapIdx++;
			}
			$('.layer_wrap.test .sub_tabs span').eq(tapIdx).addClass('on').siblings().removeClass('on');
			$('.layer_wrap.test .tab_layer>li').eq(tapIdx).addClass('on').siblings().removeClass('on');
		})
		$('.slide_btn .left').on('click', function(){

			if(tapIdx > 0){
				tapIdx--;
			}
			$('.layer_wrap.test .sub_tabs span').eq(tapIdx).addClass('on').siblings().removeClass('on');
			$('.layer_wrap.test .tab_layer>li').eq(tapIdx).addClass('on').siblings().removeClass('on');
		})
	})






