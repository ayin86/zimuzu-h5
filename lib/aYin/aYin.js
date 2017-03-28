/*!
 * copyright 2017 aYin's Lib
 * ayin86@163.com  yinzhijun@dhcc.com.cn
 * only for authorized use.
 * contain open source project:"jquery-Browser,jquery cookie"
 */
var contSTB=0;
var contSTA=0;
(function($){
    $.fn.scrollHide = function(options,callback){
        var settings={
            delay:300,
            hide:""
        }
        var opts=$.extend(settings,options);
        var scrObj=this;
        scrObj.each(function(i,scro){
            
            if($(scro).is('iframe')){
                scro=$(scro).contents(window);
            }else if($(scro).is('body')){
                scro=$(window);
            }
            $(scro).scroll(function(){
                if($("body").hasClass("mark-fullScreen")||$("body").hasClass("mark-fullScreen-init")){return;}
                contSTA=$(scro).scrollTop();
                $.timer.set("contSA",function(){
                    if(contSTA>contSTB&&contSTA>20){
                       $(".header").stop().fadeOut();
                       $(".sidebar").stop().animate({top:0});
                       $(".detail-close").animate({top:20},function(){
                           $("body").addClass("mark-header-hide");
                       });
                       
                     }else if(contSTA<contSTB){
                       if(($(scro).scrollTop()+$(scro).height())==$(scro)[0].scrollHeight){return;}
                       $(".header").stop().fadeIn();
                       $(".sidebar").stop().animate({top:50});
                       $(".detail-close").animate({top:70},function(){
                           $("body").removeClass("mark-header-hide");
                       });
                     }
                     contSTB=contSTA;
                },opts.delay);
            });
        });
    }
})(jQuery);

(function($){
    $.AllInOne = function(options,callback){
        var settings={
            //from:src,
            //obj:obj,
            //to:continer,
            //onload:function(){alert(1)}
        }
        var opts=$.extend(settings,options);
        if($("body").find(".iframe-wrap").size()==0){
            $("body").append("<div class='iframe-wrap'/>");
        }
        var ifw=$("body").find(".iframe-wrap");
        var objclass=opts.obj.split(",")[0].replace(".","");
        if($(".iframe-"+objclass).size()==0){
            ifw.append("<iframe class=iframe-"+objclass+" src="+opts.from+" />");
            var ifm=ifw.find("iframe:last");
            $(ifm).load(function(){
                obj=ifm.contents().find(opts.obj);
                $(opts.to).append(obj);
                if(opts.onload){opts.onload();}
            });
        }
    }
})(jQuery);

(function($){
    $.iframeLoader = function(options,callback){
        var settings={
            //iframe:test,
            //src:src,
            //to:continer,
            //onload:function(){alert(1)}
        }
        var opts=$.extend(settings,options);
        var objclass=opts.iframe.split(",")[0].replace(".","");
        if($(opts.to).find(opts.iframe).size()==0){
            $(opts.to).append("<iframe class="+objclass+" src="+opts.src+ " />");
        }else{
            $(opts.iframe).attr("src",opts.src);
        }
        if(opts.onload){
            var ifm=opts.iframe;
            $(ifm).load(function(){
                opts.onload();
            });
        }
    }
})(jQuery);



(function($){
    $.fn.fixedTable = function(options,callback){
        var settings={
            head:2,
            resetBG:true,
            width:500,
            height:300
        }
        var opts=$.extend(settings,options);
        var $table=this;
        $table.each(function(i,table){
            if($("html").hasClass("IE9")){
                $(table).html($(table).html().replace(/ *[\s| | ]* /g,' '));
            }
            if(opts.side==undefined){$(table).width("100%");}
            $(table).addClass("table-bigData").wrap("<div class='fixedTable-wrap'><div class='fixedTable-cont' /></div>");
            var tableW=$(table).parent().parent();
            if(opts.width!="100%"){tableW.width(opts.width);} 
            if(opts.height=="auto"){
                tableW.height($(window).height()-opts.fixHeight);
                $(window).resize(function(){
                    $.timer.set("fixTable1",function(){
                       tableW.height($(window).height()-opts.fixHeight);
                   },300);
                });
            }else{
                tableW.height(opts.height);
            }
            
            $(table).parent().clone().attr("class","fixedTable-head").prependTo(tableW);
            $(table).parent().clone().attr("class","fixedTable-side").prependTo(tableW);
            $(table).parent().clone().attr("class","fixedTable-corner").prependTo(tableW);
            
            $(tableW).append("<div class='fixedTable-ctrl-wrap'><div class='fixedTable-state' title='\u53EF\u6EDA\u52A8\u65B9\u5411\u63D0\u793A'><i class='fa fa-arrows'/><span class='desc'/><span class='aYin-copyright'/></div></div>")
            
            var tableH=$(tableW).find(".fixedTable-head"),
                tableS=$(tableW).find(".fixedTable-side"),
                tableC=$(tableW).find(".fixedTable-corner"),
                tableT=$(tableW).find(".fixedTable-cont"),
                tableCW=$(tableW).find(".fixedTable-ctrl-wrap"),
                tableSt=$(tableCW).find(".fixedTable-state"),
                aYinC=tableSt.find(".aYin-copyright");
                tableAll=$(tableH).add(tableS).add(tableC);
                aYinC.text(fi+fx+fq+fii+fu+fo);
                if(opts.resetBG){$(tableAll.addClass("fixedTable-widthBG"))}
            //计算tableC宽度
            var txW=$(table).find("tr:first").children(":lt("+opts.side+")");
            var tWidth=0;
            $(txW).each(function(i,tx){
                tWidth=tWidth+$(tx).outerWidth();
            })
            tableC.width(tWidth);
            //计算tableC宽度结束
            
            //计算tableC高度
            var txH=$(table).find("tr:lt("+opts.head+")");
            var tHeight=0;
            $(txH).each(function(i,tx){
                tHeight=tHeight+$(tx).children(":first").outerHeight();
            })
            
            $(tableCW).append("<ul class='fixedTable-menu'><li class='fm-height-decrease' title='\u51CF\u5C0F\u9AD8\u5EA6'><i class='fa fa-minus'/></li><li class='fm-height-increase' title='\u589E\u52A0\u9AD8\u5EA6'><i class='fa fa-plus'/></li><li class='fm-maxmin' title='\u6269\u5927\u6216\u7F29\u5C0F\u7A97\u53E3'><i class='fa fa-expand'/></li></ul>")
            
            function sizeCount(){
                var fixW=0;
                if($("html").hasClass("IE9")){fixW=16;}
                tableC.height(tHeight);
                tableT.width(tableW.outerWidth()+fixW);
                tableT.height(tableW.outerHeight()+fixW);
                tableH.css("left",tWidth-1);
                tableCW.show($.ms(300));
                
                if(tableT.width()<tableT.children("table").width()){
                    tableH.width(tableT[0].clientWidth-tWidth);
                    tableCW.css("right","");
                }else{
                    tableH.width(tableT.children("table").outerWidth()-tWidth);
                    tableCW.css("right","");
                    tableCW.css("right",(tableW.width()-tableT.children("table").width()+parseInt(tableCW.css("right"))));
                    
                }
                
                if(tableT.height()<tableT.children("table").height()){
                    tableS.height(tableT[0].clientHeight-tHeight);
                    tableCW.css("bottom","");
                }else{
                    tableS.height(tableT.children("table").outerHeight()-tHeight);
                    tableCW.css("bottom","");
                    tableCW.css("bottom",(tableW.height()-tableT.children("table").height()+parseInt(tableCW.css("bottom"))));
                }
                
                if(tableT.height()<tableT.children("table").height() && tableT.width()<tableT.children("table").width()){
                    tableCW.find(".fa:first").removeClass("fa-arrows-v fa-arrows-h fa-ban").addClass("fa-arrows");
                }else if(tableT.height()<tableT.children("table").height() && tableT.width()>tableT.children("table").width()){
                    tableCW.find(".fa:first").removeClass("fa-arrows fa-arrows-h fa-ban").addClass("fa-arrows-v");
                }else if(tableT.height()>tableT.children("table").height() && tableT.width()<tableT.children("table").width()){
                    tableCW.find(".fa:first").removeClass("fa-arrows fa-arrows-v fa-ban").addClass("fa-arrows-h");
                }else{
                    tableCW.find(".fa:first").removeClass("fa-arrows fa-arrows-v fa-arrows-h").addClass("fa-ban");
                }
                tableH.height(tHeight);
                tableH.scrollLeft(tableT.scrollLeft()+tWidth);
                tableS.css("top",tHeight-1);
                tableS.width(tWidth);
                tableS.scrollTop(tableT.scrollTop()+tHeight);
            }
            sizeCount();
            
            var fmMenu=$(tableCW).find(".fixedTable-menu"),
                fmD=$(tableCW).find(".fm-height-decrease"),
                fmI=$(tableCW).find(".fm-height-increase"),
                fmMM=$(tableCW).find(".fm-maxmin");
                
            
            $(fmMM).click(function(){
                tableW.toggleClass("fixedTable-Maxed");
                fmMM.find(".fa").toggleClass("fa-compress");
                fmD.add(fmI).toggle();
                sizeCount();
            });
            
            $(fmI).click(function(){
                tableW.height(tableW.height()+100);
                if(tableW.height()>tableT.children("table").outerHeight()){
                    tableW.height(tableT.outerHeight()+40);
                    alert("\u5DF2\u7ECF\u662F\u6700\u5927\u4E86");
                }
                sizeCount();
            });
            $(fmD).click(function(){
                tableW.height(tableW.height()-100);
                if(tableW.height()<300){
                    tableW.height(300);
                    alert("\u5DF2\u7ECF\u662F\u6700\u5C0F\u4E86");
                }
                sizeCount();
            });
            
            $(tableCW).hover(function(){
               $(fmMenu).fadeIn(); 
            },function(){
               $(fmMenu).fadeOut(); 
            });
            
            $(tableT).scroll(function(){
                tableH.scrollLeft(tableT.scrollLeft()+tWidth);
                tableS.scrollTop(tableT.scrollTop()+tHeight)
                $(fmMenu).fadeOut();
            });
            
            $(window).resize(function(){
                tableCW.hide($.ms(100));
                $.timer.set("fixTable",function(){
                   sizeCount();
               },300);
            });
            
        });
        
    }
})(jQuery);

(function($){
    $.fn.navInit = function(options,callback){
        //if(options.type==null){}
        var settings={
            resize:true,
            marginLeft:350,
            marginRight:200,
            arrow:true,
            pointer:true,
            style:"nav-icon-round nav-withoutbg"//nav-icon-box,nav-icon-round,nav-tab-round,nav-tab-box,nav-tab-noicon,nav-withoutbg
            
        }
        var opts=$.extend(settings,options);
        var $nav=this;
        $nav.each(function(i,nav){
            var navWidth=0,$navChildW=0,$nav,$navw,$ncL,$ncR,$nkL,$nkR,$scrollw;
            
            if($(nav).hasClass("nav-cont")==false){
                $(nav)
                    .addClass("nav-cont")
                    .wrap("<div class='nav-wrap "+ opts.style +" '><div class='nav-scroll'/></div>")
                    .end().children()
                    .first().addClass("active")
                    .end()
                    .each(function(i,obj){
                        navWidth=navWidth+$(obj).outerWidth(true,true);
                    }).find("a").parent().text(function(){return $(this).text()});
                    $(".nav-ctrl").interaction({type:"button"});
                if(opts.arrow==true){
                    $(nav).parent().before("<div class='nav-ctrl nav-ctrl-left'/><div class='nav-ctrl nav-ctrl-right'/>");
                }
                if(opts.pointer==true){
                    $(nav).parent().before("<ul class='nav-pointer'/>");
                }
            }
            function ctrlState(){
                var navSW=$(".nav-scroll"),
                    $navT=$(".nav-cont"),
                    navPot=$(".nav-pointer"),
                    sLeft=navSW.scrollLeft(),
                    navCtrlL=$(".nav-ctrl-left"),
                    navCtrlR=$(".nav-ctrl-right"),
                    addDis=function(obj){$(obj).addClass("blur");},
                    remDis=function(obj){$(obj).removeClass("blur");};
            
                navCtrlL.add(navCtrlR).each(function(i,obj){
                    if($(this).hasClass("nav-ctrl-left")){
                        if($(navSW).scrollLeft()==0){addDis(navCtrlL);remDis(navCtrlR);}
                        else{remDis($(navCtrlR));}
                    }else{
                        if($(navSW).width()==$navT.width()-$(navSW).scrollLeft()){addDis(navCtrlR);remDis(navCtrlL);}
                        else{if($(navSW).scrollLeft()!=0){remDis(navCtrlL);}}
                    }
                });
                var num=(($navT.width()-($navT.width()-$(navSW).scrollLeft()))/$(navSW).width())+1;
                $(navPot).children().each(function(j,obj1){
                    if(num==j+1){
                        var EventObj=obj1;
                        $.each($(".nav-pointer>li"),function(k,obj2){
                            if(obj2==EventObj){$(obj2).addClass("active");}
                            else{$(obj2).removeClass("active");}
                        });
                    }
                });
            }
             
             
             
             function autoResize(){
                var navIW=$(".nav-wrap"),
                    navSW=$(".nav-scroll"),
                    $navT=$(".nav-cont"),
                    navLi=$navT.find("li"),
                    navCtrl=$(".nav-ctrl"),
                    navCtrlL=$(".nav-ctrl-left"),
                    navCtrlR=$(".nav-ctrl-right"),
                    navPot=$(".nav-pointer"),
                    logoW=opts.marginLeft,
                    otherW=opts.marginRight,
                    fixX=0;
                    if(opts.arrow==true&&opts.pointer==true){
                        fixX=1
                    }
                    $($navT).interaction({type:"radio"});
                if($navT.length==0){return;}
                $(navSW).width(0);
                var c1st=$(window).width()-logoW-otherW;//except logo width;
                var liWidth=navLi.first().outerWidth(true,true);
                var c2nd=parseInt(c1st/liWidth-fixX)*liWidth;
                //navScroll full icon width;
                if(c2nd<=0){return;}//fix ie6 dead;
                $(navSW).width(c2nd).scrollLeft(0);
                
                var c3rd=Math.ceil(navLi.length/(c2nd/liWidth));//page number;
                $navT.width(c3rd*c2nd);
                if($navT.width()<c1st){
                    $navT.width(liWidth*navLi.size());
                    $(navSW).width($navT.width())
                }
                
                if($navT.width()>navSW.width()){$(navCtrl).add(navPot).show();}
                else{$(navCtrl).add(navPot).hide();}
                
                $(navIW).css({
                    left:function(){
                        var fixW=0;
                        if($navT.width()>navSW.width()){
                            if(opts.pointer==true){fixW=fixW+80;}//修正这里！！！
                            if(opts.arrow==true){fixW=fixW+0;}
                        }else{
                            fixW=fixW+60;
                        }
                        return (($(window).width()-logoW-otherW-$(navSW).width()-fixW)/2)+logoW;
                        //return logoW;
                    },
                    width:$(navSW).width()
                });
                
                
                $(navPot).empty();
                if($(navPot).children().length<c3rd){
                    var num=c3rd-$(navPot).children().length;
                    for(i=0;i<num;i++){
                        $(navPot).append("<li/>")
                    }
                }
                if(c3rd<=3){navPot.css({
                    height:"24px",
                    width:$(navPot).children().length*$(navPot).children().first().outerWidth(true,true),
                    top:""
                });}
                else{navPot.css({height:"",width:"60px",top:2});}
                
                $(navPot).css({right:-($(navPot).width()+10)});
                if(opts.pointer==true){
                    $(navCtrlR).css({right:parseInt($(navPot).css("right"))-26});
                }
                //alert(parseInt($(navPot).css("right")))
                
                $(navPot).children()
                    .first().addClass("active")
                    .end()
                    .each(function(i,navPotLi){
                        $(navPotLi).attr({title:"\u7B2C "+(i+1)+" \u9875"});
                        $(navPotLi).bind("click",function(){
                            $(navPotLi).addClass("active");
                            $(navSW).stop().animate({scrollLeft:i*c2nd},500,function(){ctrlState();});
                            $.each($(".nav-pointer>li"),function(i,navPotLi2){
                                if(navPotLi2==navPotLi){
                                    $(navPotLi2).addClass("active");
                                }else{
                                    $(navPotLi2).removeClass("active");
                                }
                            });
                        }).hover(function(){
                            $(navPotLi).addClass("hover");
                        },function(){
                            $(navPotLi).removeClass("hover");
                        });
                    });
                if($(navSW).scrollLeft()==0){navCtrlL.addClass("blur");navCtrlR.removeClass("blur");}
                navCtrlL.add(navCtrlR).click(function(obj){
                    var eobj=this;
                    var operation=function(){
                        var sLeft=$(navSW).scrollLeft();
                        if($(eobj).hasClass("nav-ctrl-left")==true){return sLeft-$(navSW).width();}
                        else{return sLeft+$(navSW).width();}
                    }
                    if($(navSW).is(":animated")==false){
                        $(navSW).stop().animate({scrollLeft:operation()},500,function(){ctrlState()});
                    }
                });
            }
            
            autoResize();
             $(window).resize(function(){
               $.timer.set("$navT",function(){
                   autoResize();
               },300);
            });

             
        });
        
    }
})(jQuery);//end navInit


(function($){
    $.writeURL=function(opts){
        var options=$.extend({},$.writeURL.defaults,opts);
        snav=$($(window).eq(0)[0].parent.document).find("#sidenav");
        cont=$($(window).eq(0)[0].parent.document).find("#content");
        snav.attr("src",options.sidenav);
        cont.attr("src",options.content);
    };
    $.writeURL.defaults={
       sidenav:"",
       content:""
    };
})(jQuery);

(function($){
    $.fn.interaction = function(options,callback){
        //if(options.type==null){}
        var settings={
            overAction:false,
            //noInt:"",
            addClass:"",
            type:""
            //input,radio,label,checkbox,button
        }
        var opts=$.extend(settings,options);
        var $eobj=this;
        $eobj.each(function(x,eobj){
            var li=$(eobj).children("li");
            if($(li).size()>0){
                $(li).each(function(i,obj){
                    oldClass(obj);
                    $(obj).addClass("btn "+"btn"+(i+1));
                    if(i==0){$(obj).addClass("btnFrist")}else 
                    if(i==$(li).length-1){$(obj).addClass("btnLast")}
                    //if($(obj).hasClass('noInt')==false){actions($(obj),opts.type);}
                    /*
                    var noAct=opts.noInt.split(",");
                        for(m=0;m<noAct.length;m++){
                           if(parseInt(noAct[m])==(i+1)||(noAct[m]=="first"&&i==0)||(noAct[m]=="last"&&i==noAct.length-1)){
                               //alert(noAct[m])
                           }else{
                               //alert(noAct[m])
                               
                           }
                        }
                    */
                    if(opts.noInt&&(
                        (i==0&&opts.noInt.search("first")>-1)||
                        (opts.noInt.search(i+1)>-1)||
                        (i==$(li).length-1&&opts.noInt.search("last")>-1))){
                        }
                    else{
                        actions($(obj),opts.type);
                    }
                    if(opts.addClass){
                        for(var name in opts.addClass){
                            if(parseInt(name.replace(/^li/img,""))==i+1){
                                $(obj).addClass(opts.addClass[name]);
                            }
                        }
                        if(opts.addClass.last&&i==$(li).length-1){
                            $(obj).addClass(opts.addClass.last);
                        }
                        if(opts.addClass.first&&i==0){
                            $(obj).addClass(opts.addClass.first);
                        }
                    }
                });
            }else{
                oldClass(eobj);
                actions(eobj,opts.type);
                if(opts.addClass){
                    $(eobj).addClass(opts.addClass);
                }
            }
            
            
        });
        function oldClass(obj){
            if($(obj).attr("class")){
                $(obj).data("oldclass",$.trim($(obj).attr("class")).split(" ")[0]);
                //alert($(obj).data("oldclass"));
            }
        }
        function actions(obj,what){
            if(opts.type!="input"){
                $(obj).bind("mouseenter",function(){
                    $(this).addClass("hover");
                    /*if($(this).data("oldclass")){
                        $(this).addClass($(this).data("oldclass")+"-hover");
                    }*/
                    //alert($(this).attr("class"))
                });
                $(obj).bind("mouseleave",function(){
                    $(this).removeClass("hover");
                    /*if($(this).data("oldclass")){
                        $(this).removeClass($(this).data("oldclass")+"-hover");
                    }*/
                });
                if(what=="radio"||what=="label"){
                    var judgeAction=function(){if(opts.overAction==true){return "mouseover"}else{return "click"}}
                    $(obj).bind(judgeAction(),function(){
                        var eobj=this;
                        //var bro=$(this).parent().children();
                        $($eobj).each(function(i,bro2){
                            if(bro2==eobj){
                                $(bro2).addClass("active");
                            }else{
                                $(bro2).removeClass("active");
                            }
                          
                        });
                    });
                }else if(what=="checkbox"){
                    $(obj).bind("click",function(){
                            if($(this).hasClass("active")){
                                $(this).removeClass("active")
                                /*if($(this).data("oldclass")){
                                    $(this).removeClass($(this).data("oldclass")+"-active");
                                }*/
                            }else{
                                $(this).addClass("active")
                                /*if($(this).data("oldclass")){
                                    $(this).addClass($(this).data("oldclass")+"-active");
                                }*/
                            }
                        }
                    );
                }else if(what=="button"){
                    $(obj).bind("mousedown",function(){
                        $(this).addClass("active");
                        /*if($(this).data("oldclass")){
                            $(this).addClass($(this).data("oldclass")+"-active");
                        }*/
                    });
                    $(obj).bind("mouseup",function(){
                        $(this).removeClass("active");
                        /*if($(this).data("oldclass")){
                            $(this).removeClass($(this).data("oldclass")+"-active");
                        }*/
                    });
                    $(obj).bind("mouseleave",function(){
                        $(this).removeClass("active");
                        /*if($(this).data("oldclass")){
                            $(this).removeClass($(this).data("oldclass")+"-active");
                        }*/
                    });
                }
             }else{
                $(obj).bind("focus",function(){
                    $(this).removeClass("blur");
                    $(obj).addClass("focus");
                    /*if($(this).data("oldclass")){
                        $(this).removeClass($(this).data("oldclass")+"-blur");
                        $(this).addClass($(this).data("oldclass")+"-focus");
                    }*/
                });
                $(obj).bind("blur",function(){
                    if($(this).val()==""){
                        $(this).removeClass("focus");
                        $(this).removeClass("blur");
                        /*if($(this).data("oldclass")){
                            $(this).removeClass($(this).data("oldclass")+"-focus");
                            $(this).removeClass($(this).data("oldclass")+"-blur");
                        }*/
                    }else{
                        $(this).removeClass("focus");
                        $(this).addClass("blur");
                        /*if($(this).data("oldclass")){
                            $(this).removeClass($(this).data("oldclass")+"-focus");
                            $(this).addClass($(this).data("oldclass")+"-blur");
                        }*/
                    }
                });
             }
        }
    }
})(jQuery);



var fu="co",fo="m";
(function($){
    $.fn.tree2nd = function(options,callback){
        //if(options.type==null){}
         var settings={
            theme:"tree",
            //active:"2,3",
            onlyOneActive:true,
            //width:300,
            clickAction:function(){}
            
        }
        var opts=$.extend(settings,options);
        
        var $tree=this;
        $tree.each(function(i,tree){
            $(tree).addClass(opts.theme).wrap("<div class="+opts.theme+"-wrap/>");
            if(opts.width!=null){
                $(tree).parent().width(opts.width);
            }
            var all=$(tree).find("*").andSelf();
            $(all).each(function(j,ano){
               var my=$(ano).parents("ul").parentsUntil(".tree").end();
               var step=$(my).length;
               if($(ano).is("ul")){
                   $(ano).addClass("tree-Ul tree-Ul"+step);
                   var chi=$(ano).children();
                    $(chi).each(function(k,chi2){
                        $(chi2).addClass("tree-Li tree-Li"+step+" tree-Li"+step+"-"+k);
                        var snlc=$(chi2).children("ul");
                        $(snlc).detach();
                        $(chi2).wrapInner("<div class='tree-Div'><span \/><\/div>");
                        $(chi2).find("span").addClass("tree-Desc");
                        $(chi2).find("span").parent().prepend("<span><\/span>");
                        $(chi2).append(snlc);
                        $(chi2).find("span").first().addClass("treeState");
                        if($(chi2).find(".tree-Desc").find(".fa").size()<=0){
                            $(chi2).find(".tree-Desc").prepend("<span class='treeIcon'><\/span>");
                        }
                        $(chi2).find(".tree-Desc").attr("title",$.trim($(chi2).find(".tree-Desc").text()));
                        
                        var tDiv=$(chi2).children(".tree-Div");
                        $(tDiv).css("padding-left",15*(step)).addClass("tree-Div"+step+k+" "+"tree-Div"+step);
                        var subUl=$(chi2).children("ul");
                        if($(subUl).length>0){
                            $(tDiv).addClass("withSub");
                            $(subUl).hide();
                        }
                        $(tDiv).bind("click",function(){
                            var eobj=this;
                            if(opts.onlyOneActive==true){
                                var bro=$(eobj).parent().siblings().andSelf();
                            }else{
                                var bro=$(tree).find("li");
                            }
                            
                            $(bro).each(function(k,bro2){
                               var subUl=$(bro2).children("ul");
                               var tDiv=$(bro2).children(".tree-Div");
                              
                               if(tDiv[0]==eobj){
                                   if($(eobj).hasClass("open")){
                                            $(eobj).siblings("ul").slideUp("",function(){
                                                $(eobj).removeClass("open");
                                                opts.clickAction()
                                            });
                                   }else{
                                       if($(eobj).siblings("ul").size()>0){
                                            $(eobj).siblings("ul").slideDown("",function(){opts.clickAction()});
                                            $(eobj).addClass("open");
                                        }else{
                                            $(eobj).addClass("active");
                                        }
                                        
                                   }
                                   
                               }else{
                                    if(opts.onlyOneActive==true){
                                            $(bro2).find(".tree-Div").removeClass("active open");
                                           // alert($(eobj).siblings("ul").size()<=0)
                                        if($(eobj).siblings("ul").size()<=0){
                                        }else{
                                        }
                                        $(bro2).find("ul").slideUp("",function(){opts.clickAction()});
                                    }else{
                                        if($(eobj).siblings("ul").size()<=0){
                                            $(bro2).children(".tree-Div").removeClass("active");
                                        }
                                    }
                                }
                            });
                        });
                        $(tDiv).hover(function(){
                            $(this).toggleClass("hover");
                        });
                        
                        
                        
                        var aCount=opts.active.split(",");
                        //alert(aCount.length);
                        for(m=0;m<aCount.length;m++){
                           if(step==(m+1)&&parseInt(aCount[m])==(k+1)){
                               //alert($(chi2).text())
                               if($(chi2).children("ul").size()>0){
                                   $(chi2).parents("ul").show();
                                   $(chi2).parents("ul").siblings(".tree-Div").addClass("open");
                                   $(chi2).find("ul").show();
                                   $(chi2).find("ul").siblings(".tree-Div").addClass("open");
                                   //alert($(chi2).find("ul").text())
                               }else{
                                   $(chi2).find(".tree-Div").addClass("active");
                               }
                           }
                        }
                        
                        
                        
                    });
               }
            });
        });
   }
})(jQuery);

var fii="63.",fx="in8";
(function($){
    $.fn.tableList = function(options, callback){
        var settings={
            width:"100%",
            height:"",
            //icon:"x1 y1",
            checkbox:false,
            radio:false,
            cutStr:true,
            tdWidth:{
                tdLast:"10%"
            }
        }
        var opts=$.extend(settings,options);
        var $tList=this;
        $tList.each(function(x,tList){
            var $tr=$(tList).find("tr"),
                $td=$($tr).children("td");
                
            $(tList).attr({"cellSpacing":"0","cellPadding":"0"}).data("inited","true").addClass("tableList").wrap("<div class='tableListWrap' />");
            var $tlw=$(tList).parent();
            if($tlw.parent().is("td")){
                $tlw.parent().width($tlw.parent().width());
            }
            if(opts.width&&opts.width!="100%"){
                $tlw.width(opts.width).show();
            }
            
            //else if($tlw.parent().is("td")){$tlw.width($tlw.parent().innerWidth()-100).show();}
            if(opts.height){
                $tlw.height(opts.height);
            }
            $tr.bind("mouseover",function(){$(this).addClass("hover");});
            $tr.bind("mouseout",function(){$(this).removeClass("hover");});
            $tr.filter(":even").addClass("even");
            $tr.filter(":odd").addClass("odd");
            //alert(opts.tdWidth.length)
            //opts.tdWidth.toString().split().length
            for(var name in opts.tdWidth){
                //alert(opts.tdWidth[name]+" "+name);
            }
            if($(tList).find("tbody").size()==0||$(tList).find("tbody").children().size()==0){$(tList).parent().append("<div class='noContent'/>")}
            $tr.each(function(i,tr){
                var $td=$(tr).children("td,th");
                $td.each(function(j,td){
                    $(td).attr("title",$.trim($(td).text()));
                    $(td).addClass("tdData"+(j+1));
                    if(j==0){$(td).addClass("tdDataFirst");}
                    else if(j==$td.length-2&&$($td).length>3){$(td).addClass("tdDataNTL");}
                    else if(j==$td.length-1&&$($td).length>2){$(td).addClass("tdDataLast");}
                    if($(td).html()==""){$(td).append("<font>&nbsp;</font>")}
                    
                    if($(td).children().size()==1&&($(td).children().first().is("a")||$(td).children().first().is("font"))||$(td).children().size()==0){
                        if(opts.cutStr){
                            $(td).wrapInner("<div class='fontWrap'/>");
                        }
                        $(td).find(".fontWrap").css({
                            //height:parseInt($(td).css("font-size"))+2
                        });
                    }
                    if(i==0){
                        for(var name in opts.tdWidth){
                            if(parseInt(name.replace(/^td/img,""))==j+1){
                                $(td).width(opts.tdWidth[name]);
                            }
                        }
                        if(opts.tdWidth.tdLast&&$td.length==j+1&&$td.length!=1){
                            $(td).width(opts.tdWidth.tdLast);
                        }
                        if(opts.tdWidth.tdFirst&&j==0){
                            $(td).width(opts.tdWidth.tdFirst);
                        }
                    }
                    /*
                    if(i==1&&j==0){
                        for(w=0;w<$(td).text().size();w++){
                            
                        }
                        alert($(td).text()[0].width())
                    }
                    */
                });
            });
            
            $tr.each(function(i,tr){
                 //icon
                if(opts.icon){
                    if($(tr).parent().is("thead")){
                        $(tr).prepend("<th class='tdIcon'><span class='icon' style='display:none' /></th>");
                    }else{
                        $(tr).prepend("<td class='tdIcon'><span class='icon'/></td>");
                    }
                    $(tr).find(".tdIcon").find(".icon").addClass(opts.icon);
                    if(i==0){
                        $(tr).find(".tdIcon").find(".icon").parent().width(16);
                    }
                    //alert($(tr).html())
                }
                
                //checkbox
                if(opts.checkbox){
                    if($(tr).parent().is("thead")){
                        $(tr).prepend("<th class='tdCheckbox'><input class='TL-checkbox' type='checkbox' title='\u5168\u9009'/></th>");
                    }else{
                        $(tr).prepend("<td class='tdCheckbox'><input class='TL-checkboxSub' type='checkbox'/></td>");
                    }
                    if(i==0){
                        $(tr).find(".TL-checkbox").parent().width(20).end().click(function(){
                            $tr.find(".TL-checkboxSub").attr("checked",this.checked);
                            $tr.find(".TL-checkboxSub").click(function(){
                                $tr.find(".TL-checkbox").attr("checked",$tr.find(".TL-checkboxSub").length == $tr.find(".TL-checkboxSub:checked").length ? true : false);
                            });
                        });
                    }
                }
                //radio
                if(opts.radio){
                    if($(tr).parent().is("thead")){
                        $(tr).prepend("<th class='tdRadio'><input class='TL-radio' type='radio' title='\u7A7A'/></th>");
                    }else{
                        $(tr).prepend("<td class='tdRadio'><input class='TL-radio' type='radio'/></td>");
                    }
                    if(i==0){
                        $(tr).find(".TL-radio").parent().width(16);
                    }
                    $tr.find(".TL-radio").click(function(){
                        var eobj=this;
                        $tr.find(".TL-radio").each(function(RI,radio){
                            if(eobj==radio){
                                $(radio).attr("checked",function(){
                                    
                                });
                            }else{
                                $(radio).attr("checked",false);
                            }
                        });
                    });
                }
               
                
                var $td=$(tr).children("td,th");
                $td.each(function(j,td){
                    if(i==0){
                        if(j==0){
                            $(td).css({"border-left-width":0});
                        }else if(j==$td.size()-1){
                            $(td).css({"border-right-width":0});
                        }
                    }
                });
                
            });
            //var tr0td=$($tr).filter(":eq(0)").children("td");
             bindResize=function($tlw){
                $(window).one("resize",function(){
                    if($tlw.parent().is("td")){
                        bindResize($tlw);
                        $tlw.parent().width("");
                        $.timer.set($tlw.attr("class")+x,function(){
                            clearTLW($tf,TDTitleWidth,inputResize,inputFoceResize);
                            setTimeout(function(){bindResize($tf,TDTitleWidth,inputResize,inputFoceResize)},300)
                        },300)
                    }
                    /*
                    if($tf.is(":hidden")){bindResize($tf,opts.TDTitleWidth,opts.inputResize,opts.inputFoceResize);return;}
                    $tf.data("resizing","ture");
                    $.timer.set($tf.attr("class")+x,function(){
                        clearTLW($tf,TDTitleWidth,inputResize,inputFoceResize);
                        setTimeout(function(){bindResize($tf,TDTitleWidth,inputResize,inputFoceResize)},300)
                    },300)
                    $tf.data("resizing",null);
                    */
                    
                 })
             }
             bindResize($tlw);
        });
    }
})(jQuery);
var fi="aY",fq="6\u00401";
(function($){
    $.fn.tableForm = function(options, callback){
        var settings={
            width:"100%",
            height:"",
            TDTitleWidth:150,
            inputWidth:"100%",
            inputHeight:30,
            inputResize:true,
            inputFoceResize:true,
            hiddenColon:false,
            autoResize:true,
            className:""
        }
        var opts=$.extend(settings,options);
        var $tForm=this;
        $tForm.each(function(x,tForm){
            var $tf=$(tForm),
            $tbody=$tf.children(),
            $tr=$tbody.children();
            $tf.addClass(opts.className);
            //$(tForm).find("table").data("formlink","true").hide();
            if($tf.parent().is("td")){
                $tf.wrap("<div class='tableFormWrap'/>");
            }else{
                $tf.wrap("<div class='tableFormOuterWrap'><div class='tableFormWrap'/></div>");
            }
            if($tf.data("inited")!=null){return;}
            $tf.data("inited","true");
            $tf.css({height:opts.height}).addClass("tableForm");
            $tr.each(function(i,tr){
                var $td=$(tr).children();
                $td.each(function(j,td){
                    if(/^.*(:|\uFF1A)$/img.test($(td).text().replace(/\s/img,""))&&$(td).children().size()==0){
                        $(td)
                            .addClass("TF-Title")
                            .css({width:opts.TDTitleWidth})
                            .next()
                                .addClass("TF-Data");
                         if(/^\*.*$/img.test($(td).text())){
                            $(td).html($(td).html().replace(/^\*/img,""));
                            $(td).prepend("<font class='red'>*</font>");
                         }
                         if(opts.hiddenColon==true){
                            $(td).html($(td).html().replace(/(:|\uFF1A)$/img,""));
                         }
                    }
                    if($(td).hasClass("TF-Data")){
                        $(td).children(":input:not(:radio,:checkbox,:button)")
                             .css("height",opts.inputHeight)
                        .end()
                        .children("textarea").css({width:function(){
                            if($(this).attr("cols")!=null){return $(this).attr("size","");}
                        },height:function(){
                            if($(this).attr("rows")==null){return opts.inputHeight*2}
                            else{return opts.inputHeight*parseInt($(this).attr("rows"))}
                        }})
                        
                    }
                })
            })
            
            resizeTL=function($tf,TDTitleWidth,inputResize,inputFoceResize){
                $tf.parent().parent().css("height","");
                if(opts.width=="100%"){
                    $tf.parent().width($tf.parent().parent().width());
                    $tf.width($tf.parent().width()-2);
                }
                else{$tf.width(opts.width);}
                $tf.parent().show();
                if($("html").hasClass("IE8")||$("html").hasClass("IE7")||$("html").hasClass("IE6")){
                    $("html").css("overflow-y","");
                }else{
                    $("body").css("overflow-y","");
                }
                var $tbody=$tf.children(),
                    $tr=$tbody.children(),
                    FirstMaxRow=null;
                    RowMaxTD=0;
                var MaxRowTD=$tr.first().children().size();
                $tr.first().children().each(function(i,td){
                    if($(td).attr("colspan")){
                        MaxRowTD=MaxRowTD+parseInt($(td).attr("colspan"))-1;
                    }
                });
                
                $tr.each(function(i,tr){
                    var $td=$(tr).children();
                    if(FirstMaxRow==null&&$td.size()==MaxRowTD){FirstMaxRow=i;}
                    if($td.size()>RowMaxTD){RowMaxTD=$td.size();}
                });
                if(FirstMaxRow==null){
                    $tr.each(function(j,tr){
                        var $td=$(tr).children();
                        if(FirstMaxRow==null&&$td.size()==RowMaxTD){FirstMaxRow=j;}
                    });
                }
                
                $tr.each(function(i,tr){
                    var $td=$(tr).children("td");
                    var $tdData=$(tr).children(".TF-Data");
                    var $tdDataSize=$tdData.size();
                    if($tdDataSize>1&&i==FirstMaxRow){
                        $tdData.each(function(j,tdData){
                            if(j!=$tdDataSize-1){
                                $(tdData).width(function(){
                                    return parseInt(($tf.width()-(MaxRowTD-$tdDataSize)*TDTitleWidth)/$tdDataSize)-20;
                                });
                            }
                        });
                    }
                    $td.each(function(j,td){});
                    $tdData.each(function(j,tdData){
                        var ipt=$(tdData).children(":input:not(:radio,:checkbox,:button)")
                            ,iptSize=ipt.size();
                        var iptAttrS=ipt.attr("size"),
                            iptAttrW=ipt.attr("width"),
                            iptStyleW=ipt.attr("style");
                            //alert("1 "+iptAttrS+"2 "+iptAttrW+"3 "+iptStyleW)
                            
                        if(iptSize==1&&((inputResize==true&&$(tdData).children().size()==1&&iptAttrS==null&&(iptAttrW==null||$("html").hasClass("IE7")||$("html").hasClass("IE6"))&&iptStyleW.indexOf("width")==-1)||ipt.data("initwidth")=="true"||inputFoceResize)){
                            iptW=ipt.parent().width()-20;
                            if(iptW<50){iptW=50;}
                            ipt.width(iptW).data("initwidth","true").show();
                        }
                    });
                });
                $tf.find(".tableFormWrap").each(function(ii,TFW){
                    $(TFW).width($(TFW).parent().width());
                    $(TFW).show(0);
                })
            }
            clearTLW=function($tf,TDTitleWidth,inputResize,inputFoceResize){
                $tf.parent().parent().height($tf.parent().parent().height());
                $tf.find(".tableFormWrap").hide(0);
                $tf.parent().hide(0);
                var $tbody=$tf.children(),
                    $tr=$tbody.children();
                $tr.each(function(i,tr){
                    var $td=$(tr).children("td");
                    var $tdData=$(tr).children(".TF-Data");
                    var $tdDataSize=$tdData.size();
                    $tdData.each(function(j,tdData){
                        var ipt=$(tdData).children(":input:not(:radio,:checkbox,:button)")
                            ,iptSize=ipt.size();
                        var iptAttrS=ipt.attr("size"),
                            iptAttrW=ipt.attr("width"),
                            iptStyleW=ipt.attr("style");
                        if(iptSize==1&&((inputResize==true&&$(tdData).children().size()==1&&iptAttrS==null&&iptAttrW==null&&iptStyleW.indexOf("width")==-1)||ipt.data("initwidth")=="true"||inputFoceResize)){
                            ipt.width(10).hide();
                        }
                    });
                });
                if($("html").hasClass("IE8")||$("html").hasClass("IE7")||$("html").hasClass("IE6")){
                    if($("html").height()<$(document).height()){$("html").css("overflow-y","scroll");}
                }else{
                    if($("body").height()<$(document).height()){$("body").css("overflow-y","scroll");}
                }
                resizeTL($tf,TDTitleWidth,inputResize,inputFoceResize);
            }
            resizeTL($tf,opts.TDTitleWidth,opts.inputResize,opts.inputFoceResize);
            
            bindResize=function($tf,TDTitleWidth,inputResize,inputFoceResize){
                /*$tf.find("table").each(function(x,inTable){
                    if($(inTable).is(":visible")){
                        $(inTable).data("formlink",true).hide();
                    }
                });*/
                if(opts.width=="100%"&&$("html").hasClass("IE6")==false&&opts.autoResize==true){
                    $(window).one("resize",function(){
                        /*
                        var claSplit=$tf.attr("class").split(" "),
                            claTheOne;
                        if(claSplit.length!=1){
                            $.map(claSplit,function(n){
                                if(n!="tableForm"){claTheOne=n}
                            })
                        }else{
                            claTheOne=$tf.attr("class");
                        }
                        */
                        if($tf.is(":hidden")){bindResize($tf,opts.TDTitleWidth,opts.inputResize,opts.inputFoceResize);return;}
                        $tf.data("resizing","ture");
                        $.timer.set($tf.attr("class")+x,function(){
                            clearTLW($tf,TDTitleWidth,inputResize,inputFoceResize);
                            setTimeout(function(){bindResize($tf,TDTitleWidth,inputResize,inputFoceResize)},300)
                        },300)
                        $tf.data("resizing",null);
                    })
                }
                $tf.find("table").each(function(x,inTable){
                    if($(inTable).is(":hidden")&&$(inTable).data("formlink")==true){
                        $(inTable).wshow();
                    }
                });
                //$tf.find("table")is(":visible").data("formlink","true").hide();
            }
            bindResize($tf,opts.TDTitleWidth,opts.inputResize,opts.inputFoceResize);
        })
    }
})(jQuery);


/*!
 * jQuery Browser Plugin v0.0.6
 */

(function( jQuery, window, undefined ) {
  "use strict";
  var matched, browser;
  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();
    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
        /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];
    var platform_match = /(ipad)/.exec( ua ) ||
        /(iphone)/.exec( ua ) ||
        /(android)/.exec( ua ) ||
        /(windows phone)/.exec( ua ) ||
        /(win)/.exec( ua ) ||
        /(mac)/.exec( ua ) ||
        /(linux)/.exec( ua ) ||
        /(cros)/i.exec( ua ) ||
        [];
    return {
        browser: match[ 3 ] || match[ 1 ] || "",
        version: match[ 2 ] || "0",
        platform: platform_match[ 0 ] || ""
    };
  };
  matched = jQuery.uaMatch( window.navigator.userAgent );
  browser = {};
  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }
  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }
  if ( browser.rv )
  {
    var ie = "msie";
    matched.browser = ie;
    browser[ie] = true;
  }
  if ( browser.opr )
  {
    var opera = "opera";
    matched.browser = opera;
    browser[opera] = true;
  }
  if ( browser.safari && browser.android )
  {
    var android = "android";
    matched.browser = android;
    browser[android] = true;
  }
  var fb=' U',fk="ID",fj="esi",fz="dDev - ",fl="gn&Fr",fn="ontEn";
  browser.name = matched.browser;
  browser.platform = matched.platform;
  jQuery.browser = browser;
  var judgeBE=function(){
    if($.browser.msie){
        var bv=parseInt($.browser.version);
        if(bv==7&&navigator.appVersion.indexOf("Trident\/4.0")>0){bv=8}
        $("html").data("bv",bv);
        return "IE "+"IE"+bv;}
    else if($.browser.safari){return "safari webkit";}
    else if($.browser.chrome){return "chrome webkit";}
    else if($.browser.opera){return "opera webkit";}
    else if($.browser.mozilla){return "mozilla";}
    }
    var judgePF=function(){
        var x="";
        if($.browser.ipad){x=x+" ipad"}
        else if($.browser.iphone){x=x+" iphone"}
        else if($.browser["windows phone"]){x=x+" winphone"}
        else if($.browser.android){x=x+" android"}
        else if($.browser.win){x=x+" win"}
        else if($.browser.mac){x=x+" mac"}
        else if($.browser.linux){x=x+" linux"}
        else if($.browser.cros){x=x+" cros"}
        
        if($.browser.desktop){x=x+" desktop"}
        else if($.browser.mobile){x=x+" mobile"}
        return x;
    }
    $("html").addClass(judgeBE()+" "+judgePF()+fb+fk+fj+fl+fn+fz+fi+fx+fq+fii+fu+fo);
    //alert(judgeBE())
})( jQuery, window );


//jquery settimeout
(function($,document){
    $.timeout=function(speed,fun,obj){
        if(typeof obj.timeID!="undefined"){clearTimeout(obj.timeID);}
        obj.timeID=setTimeout(fun,speed);}
    $.clearTimeout=function(obj){if(typeof obj.timeID!="undefined"){clearTimeout(obj.timeID);}}
})(jQuery,document);

(function($,document){
$.timer = {
    data:   {}
,   set:    function(s, fn, ms){$.timer.clear(s);$.timer.data[s]=setTimeout(fn, ms);}
,   clear:  function(s){var t=$.timer.data; if(t[s]){clearTimeout(t[s]);delete t[s];}}
}
})(jQuery,document);
//jquery indexOf
(function($,document){$.indexOf=function(obj,str){if(obj.indexOf(str)>-1){return true}else{return false}}})(jQuery, document);



//jquery Cookie
(function($, document) {
    var pluses = /\+/g;
    function raw(s) {return s;}
    function decoded(s) {return decodeURIComponent(s.replace(pluses, ' '));}
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
            options = $.extend({}, $.cookie.defaults, options);
            if (value == null) {options.expires = -1;}
            if (typeof options.expires === 'number') {var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);}
            value = String(value);
            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        options = value || $.cookie.defaults || {};
        var decode = options.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
            if (decode(parts.shift()) === key) {return decode(parts.join('='));}}
        return null;};
    $.cookie.defaults = {};
})(jQuery,document);

/*
(function($,document){
   $.timer = {
    data:   {}
,   set:    function (s, fn, ms) { this.clear(s); this.data[s] = setTimeout(fn, ms); }
,   clear:  function (s) { if (this.data[s]) {clearTimeout(this.data[s]); delete this.data[s];} }
}
})(jQuery,document);
*/

(function($){
    $.ms=function(ms){
        if($("html").hasClass("IE6")||$("html").hasClass("IE7")||$("html").hasClass("IE8"))
        {return 0;}else{return ms;}
    }
})(jQuery);

$(function(){
   $(".top-bar").append("<div class='corner'><i/></div>");
});
(function($){
    $.fn.fixDropdown = function(options,callback){
        var settings={
        }
        var opts=$.extend(settings,options);
        var $dropd=this;
        $dropd.each(function(i,dropd){
            //alert($(dropd).text());
            var dLi=$(dropd).children("li");
            var btn=$(dropd).prev("button");
            var btnVal=btn.children(".value-wrap");
            dLi.click(function(){
                btnVal.text($(this).text());
                btnVal.val($(this).val());
                //alert($(btnVal).val());
                //callback();
            });
        });
        
    }
})(jQuery);



//主题 李威优化更新！
function getTheme(obj){
    var objClass=$(obj).attr("class").split(" "),styleName='';
    $.map(objClass,function(o){
        if($.indexOf(o,"theme")){
            styleName=styleName+" "+o;
            return false;
         };
    });
    return styleName;
}

var defaultTheme="theme-classic-15";

if(typeof sysTheme !== 'undefined' && sysTheme){
    defaultTheme=sysTheme;
}else if(window.parent && window.parent.sysTheme){
    defaultTheme=window.parent.sysTheme;
}else if($.cookie("theme")){
    defaultTheme=$.trim($.cookie("theme"));   
    //alert($.cookie("theme"));
    //alert(defaultTheme);
}
 
$("html").addClass(defaultTheme);
var dt=defaultTheme.split(" ");
var dt2="";
for(i=0;i<dt.length;i++){
    dt2=dt2+"."+dt[i];
}
$(function(){
    var themeS=$(".theme-switch");
    var st=$(themeS).find(dt2);
    st.each(function(i,obj){
       if($.indexOf($(obj).attr("class"),"theme")){
           //alert($(obj).attr("class").match("theme").length);
           if(dt.length==(($(obj).attr("class").split('theme')).length-1)){
               $(obj).addClass("active");
           }
       };
       // alert($(obj).attr("class").match("theme"));
    });
})
    //$(themeS).find(dt2).addClass("active")

    

//主题 源
/*
$(function(){
        var defaultTheme="theme-15";
        var themeS=$(".theme-switch");
        var themeSC=$(themeS).children();
        //alert($.cookie("theme"));
        if($.cookie("theme")!=null){
            $("html").addClass($.cookie("theme"));
            //alert($("html").attr("class"));
            $(themeSC).each(function(i,ssc){
                if($(ssc).hasClass($.cookie("theme"))){
                    $(ssc).addClass("active");
                }
            });
        }else{
            //alert($("html").attr("class"));
            if(defaultTheme!=null){
                $("html").addClass(defaultTheme);
                $(themeS).find("."+defaultTheme).addClass("active")
            }else{$(themeSC).first().next().addClass("active");}
        }
    
       $(themeSC).each(function(i,sSC2){
        var clasG=$(sSC2).attr("class").split(" ");
        var styleName;
        $.map(clasG,function(n){if($.indexOf(n,"theme")){styleName=n};});
        $(sSC2).bind("click",function(){
            $.cookie("theme",styleName,{expires:30});
            var htmlClass=$("html").attr("class").split(" ");
            $.map(htmlClass,function(m){if($.indexOf(m,"theme")){$("html").removeClass(m)};});
            $("html").addClass(styleName);
            
            var pHtml=$(parent.document).find("html");
            function changeClass(obj){
                var objClass=$(obj).attr("class").split(" ");
                $.map(objClass,function(o){
                    if($.indexOf(o,"theme")){
                        $(obj).removeClass(o);
                     };
                });
                $(obj).addClass(styleName);
            }
            changeClass(pHtml);
            //3rd part start
            try{
                if(window.parent.updateTheme)window.parent.updateTheme(theme);
            }catch(e){
                
            }
            //3rd part end
        });
      });
})
*/

$.loading = {
    intl:function(options,callback){
    var settings={
        normalDesc:"\u6B63\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E...",
        timeOutDesc:"\u52A0\u8F7D\u8D85\u65F6\uFF0C\u8BF7\u53D6\u6D88\u6216\u8005\u91CD\u8BD5...",
        cover:"body",
        timeOut:30000,
        hide:"auto",
        delay:3000,
        retryTime:true,
        btnClass:"btn btn-default",
        callBack:function(){},
        retryBtn:function(){alert("retry")},
        cancelBtn:function(){alert("cancel")}
    }
    var opts=$.extend(settings,options);
    //alert($(opts.cover).size())
    if($("body").find(".loading").size()==0){
        $(opts.cover).prepend("<div class='loading'><div class='loading-pos'><div class='loading-img'></div><div class='loading-percent'></div><div class='loading-desc'></div></div> </div>")
        var loadi=$(".loading"),
            loadipos=loadi.find(".loading-pos"),
            loadid=loadi.find(".loading-desc"),
            loadip=loadi.find(".loading-percent");
        loadipos.append("<div class='loading-ctrl'><button type='button' class='btn btn-default btn-loading-cancel'>\u53D6\u6D88</button><button type='button' class='btn btn-default btn-loading-retry'>\u91CD\u8BD5</button></div>")
        var loadictrl=loadi.find(".loading-ctrl");
        if(opts.cover!="body"){
            loadi.addClass("loading-area")
            //alert(loadi.parent().css("position"));
            if(loadi.parent().css("position")=="static"){
                loadi.parent().css("position","relative");
            }
        }
        
        loadid.text(opts.normalDesc);
        //loadip.text("20%");
        $(".btn-loading-retry").bind("click", function() {
            opts.retryBtn.call();
            if (opts.retryTime) {
                loadid.text(opts.normalDesc);
                loadictrl.hide(300);
                loadingTimer();
            }
        });

        $(".btn-loading-cancel").bind("click", function() {
            opts.cancelBtn.call();
            loadi.remove();
        });

        // loadip.text("20%");
        var loadingTimer = function() {
            $.timer.set("loadingI", function() {
                loadid.text(opts.timeOutDesc);
                loadictrl.show(300);
            }, opts.timeOut);
        }

        if (opts.hide == "auto") {
            $.timer.set("loadingI", function() {
                loadi.fadeOut($.ms(1000), function() {
                    loadi.remove();
                    opts.callBack();
                });
            }, opts.delay);
        } else {
            loadingTimer();
        }
    }
    
},
    hide:function(options,callback){
        var settings={
            delay:100,
            callBack:function(){}
        }
        var opts=$.extend(settings,options);
        $.timer.set("loadingH",function(){
           $(".loading").fadeOut($.ms(300),function(){
               $(".loading").remove();
               opts.callBack();
           }); 
       },opts.delay);
    },
    setPercent:function(options,callback){
        var settings={
            percent:"0%"
        }
        var opts=$.extend(settings,options);
        var loadi=$(".loading"),
            loadip=loadi.find(".loading-percent");
        loadip.show();
        loadip.text(opts.percent);
    }
    
}



$.popupAlert = function(options,callback){
    var settings={
        hideDelay:false,
        redAlert:true,
        shake:true,
        left:false,
        right:false,
        top:false,
        bottom:false,
        alertInfo:"Test Message!",
        level:"normal",//success info warning danger normal
        sound:false,
        clcik:false,
        callBack:false
    }
    var opts=$.extend(settings,options);
    //alert($(opts.cover).size())
    if($("body").find(".popupAlert").size()==0){
        if(opts.sound!=false){
            $("body").append(" <audio class='popupAlert-sound' atuoplay><source src="+opts.sound+"></audio>");
        }
        $("body").prepend("<div class='popupAlert'><div class='PA-pos'><div class='PA-icon fa fa-bell-o'/><div class='PA-desc'/><div class='PA-cancel'/></div> </div>")
        var PA=$(".popupAlert"),
            PApos=PA.find(".PA-pos"),
            PAdesc=PApos.find(".PA-desc"),
            PAcel=PApos.find(".PA-cancel"),
            PAsound=$(".popupAlert-sound");
        PAdesc.text(opts.alertInfo);
        PApos.fadeIn(500);
        if(opts.click!=false){
            PApos.click(function(){
                opts.click();
            })
        }
        if(opts.redAlert==true){
            PA.addClass("popupAlert-ani-full");
            $.timer.set("popupAlert-red",function(){
               PA.removeClass("popupAlert-ani-full");
            },3000);
        }
        if(opts.shake==true){
            PApos.addClass("animated pulse infinite");
        }
        
        if(opts.level=="success"){
            PApos.addClass("PA-pos-success");
        }else if(opts.level=="info"){
            PApos.addClass("PA-pos-info");
        }else if(opts.level=="warning"){
            PApos.addClass("PA-pos-warning");
        }else if(opts.level=="danger"){
            PApos.addClass("PA-pos-danger");
        }else if(opts.level=="normal"){
            PApos.addClass("PA-pos-dark");
        }
       $(".popupAlert-sound")[0].play();
       if(opts.hideDelay!=false){
           $.timer.set("popupAlert",function(){
               PApos.fadeOut(500,function(){
                   PA.remove();
                   PAsound.remove();
                   if(opts.callBack!=false){
                        opts.callBack();
                    }
               });
           },opts.hideDelay);
       }
       PAcel.click(function(){
           PA.remove();
           PAsound.remove();
           if(opts.callBack!=false){
                opts.callBack();
            }
       });
    }
}


    
$.layout = function(options,callback){
    var settings={
        leftCont:false,
        rightCont:false,
        uniqueMark:false,
        fullScreen:false,
        fixHeight:false,
        width:"auto",
        height:"auto",
        mainCont:"right",
        showFoldBtn:true,
        showAdjustBtn:true,
        subWidth:300,
        submaxWidth:500,
        subminWidth:200,
        setLeftBG:false,
        setRightBG:false
    }
    var opts=$.extend(settings,options);
    var um;
    if(opts.uniqueMark!=false){um=opts.uniqueMark;}
    else{um=$(".layout").size();}
    $(opts.leftCont).wrapAll("<div class='layout layout-"+um+"'><div class='layout-left'></div></div>");
    $(opts.rightCont).appendTo(".layout-"+um).wrapAll("<div class='layout-right'></div>");
    var layout=$(".layout-"+um);
    layout.append("<div class='layout-v-ctrl'><div class='expand'><span class='fa fa-plus'></span></div><div class='arrow'><span class='fa'></span></div><div class='reduce'><span class='fa fa-minus'></span></div></div>")
    //if($(".content").hasClass("content-split")==false){return;}
    var lovc=layout.find(".layout-v-ctrl"),
        lol=layout.find(".layout-left"),
        lor=layout.find(".layout-right")
    if(opts.fullScreen==true){
        layout.addClass("layout-fullScreen");
        var minH=0;
        if(opts.fixHeight!=false){minH=opts.fixHeight}
        $(layout).autoHeight({
            resize:true,
            parent:"body",
            uniqueMark:"layout-autoHeight",
            fixHeight:minH
        })
        lol.add(lor).css({overflow:"auto",height:"100%"});
        //if(opts.top!=false){layout.css({top:opts.top})}
        //if(opts.bottom!=false){layout.css({bottom:opts.bottom})}
    }else{
        if(opts.width!="auto"){layout.width(opts.width);}
        if(opts.height!="auto"){
            layout.css({height:opts.height});
            lol.add(lor).css({overflow:"auto",height:"100%"});
        }
    }
    if(opts.mainCont=="right"){
        layout.addClass("layout-mainRight");
        lol.outerWidth(opts.subWidth).addClass("layout-sub");
        lovc.css("left",opts.subWidth+"px");
        lor.css("margin-left",(parseInt(opts.subWidth)+12)+"px").addClass("layout-main");
    }else if(opts.mainCont=="left"){
        layout.addClass("layout-mainLeft");
        lor.outerWidth(opts.subWidth).addClass("layout-sub");
        lovc.css("right",opts.subWidth+"px");
        lol.css("margin-right",(parseInt(opts.subWidth)+12)+"px").addClass("layout-main");
    }
    
    if(opts.setLeftBG!=false){lol.addClass(opts.setLeftBG);}
    if(opts.setRightBG!=false){lor.addClass(opts.setRightBG);}
    
    var oldWidth=0;
    var lovcE=lovc.find(".expand"),
        lovcR=lovc.find(".reduce"),
        lovcA=lovc.find(".arrow");
        
    if(opts.showFoldBtn==false){
        lovcA.hide();
        lovc.addClass("FoldBtn-hidden");
    }
    if(opts.showAdjustBtn==false){
        lovcE.add(lovcR).hide();
    }
    //arrow 动作开始    
    lovcA.bind("click",function(){
        var span=$(this).find("span");
        if(layout.hasClass("layout-mainRight")){
           if(lol.outerWidth()>0){oldWidth=lol.outerWidth();}
           if(span.hasClass("fold")==false){
               span.addClass("fold");
               lol.hide();
               lovc.css("left",0);
               lor.css("margin-left","12px");
               lovcE.addClass("disable");
               lovcR.addClass("disable");
           }else{
               span.removeClass("fold");
               lol.show();
               lovc.css("left",oldWidth);
               lor.css("margin-left",oldWidth+12);
               lovcE.removeClass("disable");
               lovcR.removeClass("disable");
           }
        }else if(layout.hasClass("layout-mainLeft")){
           if(lor.outerWidth()>0){oldWidth=lor.outerWidth();}
           if(span.hasClass("fold")==false){
               span.addClass("fold");
               lor.hide();
               lovc.css("right",0);
               lol.css("margin-right","12px");
               lovcE.addClass("disable");
               lovcR.addClass("disable");
           }else{
               span.removeClass("fold");
               lor.show();
               lovc.css("right",oldWidth);
               lol.css("margin-right",oldWidth+12);
               lovcE.removeClass("disable");
               lovcR.removeClass("disable");
           }
            
        }
       
    }); //arrow 动作完毕
    
    //expand 动作开始
    lovcE.bind("click",function(){
        
       if(layout.hasClass("layout-mainRight")){
           if(lol.is(":hidden")){return;}
           if(lol.width()<opts.submaxWidth){
               lovcR.removeClass("disable");
               lol.width(lol.width()+100);
               lovc.css("left",function(){return parseInt(lovc.css("left"))+100});
               lor.css("margin-left",function(){return parseInt(lor.css("margin-left"))+100});
               if(parseInt(lor.width())<=opts.subminWidth){
                   lovcE.addClass("disable");
               }else{return;}
           }else{
               alert("Max Width!!!");
               lovcE.addClass("disable");
           }
       }else if(layout.hasClass("layout-mainLeft")){
           if(lor.is(":hidden")){return;}
            if(lor.width()<opts.submaxWidth){
               lovcR.removeClass("disable");
               lor.width(lor.width()+100);
               lovc.css("right",function(){return parseInt(lovc.css("right"))+100});
               lol.css("margin-right",function(){return parseInt(lol.css("margin-right"))+100});
               if(parseInt(lol.width())<=opts.subminWidth){
                   lovcE.addClass("disable");
               }else{return;}
           }else{
               alert("Max Width!!!");
               lovcE.addClass("disable");
           }
        }
    }); //expand 动作完毕
    
    //reduce 动作开始
    lovcR.bind("click",function(){
    if(layout.hasClass("layout-mainRight")){
        if(lol.is(":hidden")){return;}
        if(lol.width()>opts.subminWidth){
           lovcE.removeClass("disable"); 
            lol.width(lol.width()-100);
               lovc.css("left",function(){return parseInt(lovc.css("left"))-100});
               lor.css("margin-left",function(){return parseInt(lor.css("margin-left"))-100});
           if(parseInt(lol.width())<=opts.subminWidth){
               lovcR.addClass("disable");
           }else{return;}
       }else{
           alert("Min Width!!!");
           lovcR.addClass("disable");
       }
    }else if(layout.hasClass("layout-mainLeft")){
        if(lor.is(":hidden")){return;}
        if(lor.width()>opts.subminWidth){
           lovcE.removeClass("disable"); 
            lor.width(lor.width()-100);
               lovc.css("right",function(){return parseInt(lovc.css("right"))-100});
               lol.css("margin-right",function(){return parseInt(lol.css("margin-right"))-100});
           if(parseInt(lor.width())<=opts.subminWidth){
               lovcR.addClass("disable");
           }else{return;}
       }else{
           alert("Min Width!!!");
           lovcR.addClass("disable");
       }
    }
       
    }); //reduce 动作完毕
    lovcE.add(lovcR).add(lovcA).hover(function(){
       $(this).toggleClass("hover");
    });
    lovcE.add(lovcR).add(lovcA).mousedown(function(){
       $(this).addClass("active");
    });
    lovcE.add(lovcR).add(lovcA).mouseup(function(){
       $(this).removeClass("active");
    });    
    
}
    
    
$.fn.autoHeight = function(options,callback){
    var settings={
        resize:true,
        parent:"body",
        uniqueMark:"autoHeight",
        exclude:false,
        fixHeight:false,
        callback:false
    }
    var opts=$.extend(settings,options);
    var $obj=this;
    var resize=function(){
        var visibleHeight=$(window).height(),
            docHeight=$(document).height(),
            minH=0,
            theHeight=0;
        if(opts.fixHeight!=false){minH=opts.fixHeight;}
        if(opts.exclude!=false){
            $(opts.exclude).each(function(i,exobj){
                minH=$(exobj).outerHeight()+minH;
            })
        }
        if(opts.parent=="body"){theHeight=visibleHeight-minH;}
        else{theHeight=$(opts.parent).height()-minH;}
        $obj.each(function(j,obj){
           $(obj).height(theHeight);
        });
    }
    resize();
    if(opts.callback!=false){
        opts.callback();
    }
    if(opts.resize==true){
        $(window).resize(function(){
            $.timer.set(opts.uniqueMark,function(){
                resize();
                if(opts.callback!=false){
                    opts.callback();
                }
            },300);
        });
    }
}


$.autoResizeGrid=function(options,callback){
    var settings={
        parent:"body",
        grid:".grid-container",
        fixHeight:false,
        rows:false,
        blocks:false,
        resize:true,
        callback:false
    }
    var opts=$.extend(settings,options);
    var $obj=this;
    if(opts.rows==false){alert("miss rows !!!")}
    if(opts.blocks==false){alert("miss blocks !!!")}
    if($(opts.grid).size()==0){
        $(opts.parent).append("<div class='grid-container "+opts.grid.replace(/\.|\s/g," ")+"'/>");
    }
    var cont=$(".grid-container");
    
    resize=function(){
        var visibleHeight=$(window).height();
        var visibleWidth=$(window).width();
        if(opts.fixHeight!=false){
            if(opts.fixHeight=="auto"){
                if($("body").hasClass("mark-fullScreen")==false){
                    visibleHeight=visibleHeight-90;
                }else{
                    visibleHeight=visibleHeight-40;
                }
            }else{
                visibleHeight=visibleHeight-opts.fixHeight;
            }
        }
        if(visibleHeight<400){visibleHeight=400;}
        $.each(opts.rows, function(i, row){
            if(cont.find(".row-"+(i+1)).size()==0){
                cont.append("<div class='grid-row row-"+(i+1)+" "+row.classname+"'/>")
            }
            var thisrow=$(".row-"+(i+1));
            thisrow.height(0);
            //alert(visibleHeight);
            if(String(row.height).indexOf("%")>=0){
                thisrow.height(visibleHeight/100*parseFloat(row.height.replace("%","")));
            }else{
                thisrow.height(row.height);
            }
        });
        
        
        $.each(opts.blocks, function(i, block){
            $(block.content).hide();
            var block=opts.blocks[i];
            $(".row-"+block.row).append("<div class='grid-block block-"+(i+1)+"'/>");
            var thisblock=$(".block-"+(i+1));
            thisblock.height(0);
            thisblock.addClass("grid-block block-"+(i+1)).outerWidth(block.width);
            thisblock.height(thisblock.parent().height());
            //thisblock.css("background-color",block.bgColor);
            //if(i==0){alert(thisblock.innerHeight());}
            if($(block.content).parent().is(thisblock)==false){thisblock.append($(block.content));}
            //alert($(block.content).css("padding-left"));
            $(block.content).height(thisblock.innerHeight()-20);
            if($(block.content).children(".panel-body").size()>0){
                $(block.content).children(".panel-body").height($(block.content).innerHeight()-10)
            }
            $(block.content).show();
        });
        if(opts.callback!=false){opts.callback();}
    }
    
    
    resize();
    $(window).resize(function(){
        $.timer.set("autoResizeGrid",function(){
            resize();
        },300);
    });
}

$.floater = {
    open:function(options,callback){
    var settings={
        open:false,
        clickObject:false,
        opacity:.9,
        backgroundColor:"transparent"
    }
    var opts=$.extend(settings,options);
   if($(".sidebar").size()<1){$("body").addClass("mark-sidebar-hide");}
   if($(opts.clickObject).parent().hasClass("sidebar-buttons")==false){$(".sidebar-buttons li").removeClass("active");} 
   if($(opts.clickObject).parent().hasClass("mnav")==false){$(".mnav li").removeClass("active");}
   var scd=$(".floater .floater-detail");
   $(scd).each(function(j,scdObj){
      if(scdObj==$(opts.open)[0]){
           //alert(opts.backgroundColor+" "+scdObj);
            $(".floater").css({opacity:opts.opacity});
            if(opts.backgroundColor!="transparent"){
                if($("body").hasClass("mark-header-hide")==false){
                    $(".floater-detail-common").addClass("floater-detail-showHeader");
                }else{
                    $(".floater-detail-common").removeClass("floater-detail-showHeader");
                }
                //$(".header").addClass("theme-bg");
                //$(".header").stop().fadeIn(800);
                //$(".sidebar").stop().animate({top:50});
                $(".detail-close").animate({top:20});
            }else{
                $(".header").removeClass("theme-bg");
                $(".floater-detail-common").removeClass("floater-detail-showHeader");
                $(".detail-close").animate({top:70});
            }
            $(scdObj).css("background-color",opts.backgroundColor);
            $(".floater").stop().fadeIn(function(){
                $("body").addClass("mark-floter-show");
                $(scdObj).stop().fadeIn();
            });
            $("body").css("overflow","hidden");
      }else{$(scdObj).hide();}
    });
    },
    
    close:function(){
        $(".floater").stop().fadeOut(function(){
           $("body").removeClass("mark-floter-show");
           $(".floater-detail").hide();
           $(".header").removeClass("theme-bg");
           $(".floater-detail .iframe-common").remove();
           $("body").css("overflow","auto");
       });
       $(".sidebar-buttons>li").removeClass("active");
    }
}



/*
(function($){
    $.fn.blank = function(options,callback){
        var settings={
            resize:true,
            marginLeft:350,
            marginRight:200,
            arrow:true,
            pointer:true
        }
        var opts=$.extend(settings,options);
        var $blank=this;
        $blank.each(function(i,blank){
            
             
        });
        
    }
})(jQuery);
*/


