"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),Logger=function(){function a(b){_classCallCheck(this,a);var c={error:0,warn:10,info:20,debug:30};if(this.DEBUG_LEVELS=c,!1 in window||"undefined"==typeof console){var d=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"],e=function(){};window.console={};for(var f=0;f<d.length;++f)window.console[d[f]]=e}this.debuglevel=this.DEBUG_LEVELS[b],this.log("loglevel set to: ",b)}return _createClass(a,[{key:"log",value:function(){if(this.debuglevel>=this.DEBUG_LEVELS.debug){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];console.log(b.join(" "))}}},{key:"info",value:function(){if(this.debuglevel>=this.DEBUG_LEVELS.info){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];console.info(b.join(" "))}}},{key:"debug",value:function(){if(this.debuglevel>=this.DEBUG_LEVELS.debug){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];for(var d in b)console.debug(b[d])}}},{key:"error",value:function(){if(this.debuglevel>=this.DEBUG_LEVELS.error){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];console.error(b.join(" "))}}},{key:"warn",value:function(){if(this.debuglevel>=this.DEBUG_LEVELS.warn){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];console.warn(b.join(" "))}}}]),a}(),Calendar=function(){function a(b,c,d,e){return _classCallCheck(this,a),this.startDate=moment(b),this.endDate=moment(c),this.datastore=d,this.$e=e,this.init=!1,Logger.info("calendar instance: ",this.startDate.format("DD.MM.YYYY"),"-",this.endDate.format("DD.MM.YYYY")),this}return _createClass(a,[{key:"build",value:function(){this.$e.empty();var a,b=$("<table/>",{"class":"dates"}),c=$("<tr/>",{"class":"week"}),d=6-(6-this.startDate.weekday());if(0!=d)for(var e=0;d>e;e++)a=this.startDate.clone().subtract(d-e,"d"),$("<td/>").addClass("day").addClass("inactive").attr("title",a.format("DD.MM.YYYY")).html(a.format("dd<br/>DD")).appendTo(c);for(var f,g,h,i=this.endDate.diff(this.startDate,"d"),j={},k=0,l=-1,m="",n="",o=0;i>=o;o++){if(a=this.startDate.clone().add(o,"d"),n=a.format("YYYY-MM-DD"),f=this.datastore.getByDayAndType(n,"total"),j[n]=0,g=0,"undefined"!=typeof f[n]){var p=f[n].values;p.forEach(function(a){g=g+a.inOk+a.inN+a.outOk+a.outN}),g>k&&(k=g,-1==l&&(l=k)),l>g&&(l=g),j[n]=g}m=g>0?"active":"inactive",0==a.weekday()&&(c.appendTo(b),c=$("<tr/>",{"class":"week"})),h=$("<td/>").addClass("day").addClass(m).attr("id","d"+n).attr("title",a.format("dddd, DD.MM.YYYY")).html(a.format("dd<br/>DD")).appendTo(c),h.on("click",function(a){var b=$(a.target);if(b.hasClass("active")){var c=b.attr("id").substr(1);Controller.triggerTrafficByDay(c)}})}c.appendTo(b),b.appendTo(this.$e);for(var q,r=Math.round((k-l)/5),s=0;i>=s;s++)n=this.startDate.clone().add(s,"d").format("YYYY-MM-DD"),q=j[n],$("#d"+n).addClass("t"+Math.round(q/r));return this.init=!0,this}},{key:"markCurrent",value:function(a){this.init||this.build(),$(".today").removeClass("today"),$("#d"+a).addClass("today")}}]),a}(),Dropdown=function(){function a(b,c){return _classCallCheck(this,a),this.$e=c,this.data=b,this}return _createClass(a,[{key:"build",value:function(){this.$e.empty(),this.data.entries.sort(function(a,b){return a.sort>b.sort});var a=$("<form />").addClass("traffic-switch").attr("name","form").appendTo(this.$e);$("<div>").addClass("traffic-switch-label").appendTo(a);var b,c,d=$("<label/>"),e=$("<select/>").attr({name:"link",size:1});for(var f in this.data.entries)b=this.data.entries[f],c=Controller.getMapping(b.trigger),"total"==b.trigger&&(c="Datenverbrauch: "+c),$("<option/>").html(c).attr({id:b.trigger,value:b.trigger}).addClass("dropdownElement").appendTo(e);return d.append(e),a.append(d),e.on("change",function(a){Controller.triggerTrafficByType(a.target.value)}),this}}]),a}(),DataLoader=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"load",value:function(a,b){return $.ajax({context:b,dataType:"json",url:a})}}]),a}(),DataStore=function(){function a(b){_classCallCheck(this,a),this.data=b,this.byDay=d3.nest().key(function(a){return a.day.substring(0,10)}).entries(this.getAll()),this.byTypeAndTime=d3.nest().key(function(a){return a.t}).key(function(a){return a.ts}).entries(this.getAll()),this.byTimeSlot=d3.nest().key(function(a){return a.ts}).key(function(a){return a.t}).sortKeys(d3.ascending).entries(this.getAll()),this.byDayAndType=d3.nest().key(function(a){return a.day.substring(0,10)}).key(function(a){return a.t}).sortKeys(d3.ascending).entries(this.getAll())}return _createClass(a,[{key:"getAll",value:function(){return this.data}},{key:"getByDay",value:function(){var a=arguments.length<=0||void 0===arguments[0]?void 0:arguments[0];if("undefined"!=typeof a){var b=this.byDay.filter(function(b){return b.key==a});return b}return this.byDay}},{key:"getByTimeSlot",value:function(){var a=arguments.length<=0||void 0===arguments[0]?void 0:arguments[0],b=arguments.length<=1||void 0===arguments[1]?void 0:arguments[1];if("undefined"!=typeof a&&"undefined"!=typeof b){var c=this.byTimeSlot.filter(function(c){return parseInt(c.key)>a&&parseInt(c.key)<b});return c}return this.byTimeSlot}},{key:"getByType",value:function(){var a=arguments.length<=0||void 0===arguments[0]?void 0:arguments[0];if("undefined"!=typeof a){var b=this.byTypeAndTime.filter(function(b){return b.key==a});return b}return this.byTypeAndTime}},{key:"getByDayAndType",value:function(){var a=arguments.length<=0||void 0===arguments[0]?void 0:arguments[0],b=arguments.length<=1||void 0===arguments[1]?void 0:arguments[1],c={};return"undefined"!=typeof a&&"undefined"!=typeof b?(this.byDayAndType.forEach(function(d){d.key==a&&d.values.forEach(function(d){d.key==b&&(c[a]=d)})}),c):void 0}}]),a}(),TimeChart=function(){function a(b,c){_classCallCheck(this,a),this.$e=c,this.store=b}return _createClass(a,[{key:"draw",value:function(a,b){Logger.info("timechart",a,b);var c=this.store.getByDayAndType(a,b);if("undefined"!=typeof c[a]){var d=c[a].values,e=function(a,b){return a.ts<b.ts?-1:1};d.sort(e);var f=[];d.forEach(function(a){a.total=a.inOk+a.inN+a.outOk+a.outN,f.push(a.total)});var g,h=d3.max(f);switch(Config.timeChartYScalePrecision){case 2:g=60;break;case 1:g=50;break;case 0:g=45}var i,j={top:0,right:0,bottom:20,left:g},k=this.$e.outerHeight()-j.top-j.bottom,l=this.$e.outerWidth()-j.left-j.right;i=Config.bodyWidth<400?.5:Config.bodyWidth<600?1:2;var m=96,n=(l-m*i)/m,o=l/m,p=d3.scale.linear().domain([0,24]).range([0,l]),q=d3.scale.linear().domain([0,h]).range([0,k-10]),r=d3.scale.linear().domain([h,0]).range([0,k]),s=d3.select("#time-chart-container");s.selectAll("g").remove();var t=d3.svg.axis().scale(p).orient("bottom").tickValues([0,6,12,18,24]).tickFormat(function(a){return 0==a||24==a?"":a+":00"}),u=d3.svg.axis().scale(r).ticks(3).orient("left").tickFormat(this.formatTraffic);s.append("g").attr("class","x axis").attr("transform","translate("+j.left+","+k+")").call(t),s.append("g").attr("class","y axis").attr("transform","translate("+j.left+",0)").call(u).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".2em").style("text-anchor","end").text("Datenvolumen");var v=s.append("g").attr("class","presenceBars").attr("transform","translate("+j.left+",0)"),w=s.append("g").attr("class","dataBars").attr("transform","translate("+j.left+",0)");v.selectAll("rect").data(d).enter().append("rect").attr("class",function(a){if(Array.isArray(a.p)){var b=["presenceBar"],c=a.p.indexOf("male")>-1,d=a.p.indexOf("female")>-1;return b.push(c&&d?"two-person":c?"male-person":d?"female-person":"no-person"),b.join(" ")}switch(a.p){case 1:return"one-person presenceBar";case 2:return"two-person presenceBar";default:return"no-person presenceBar"}}).attr("data-presence",function(a){return a.p}).attr("width",o+.5).attr("x",function(a,b){return o*b}).attr("y",0).attr("height",k),w.selectAll("rect").data(d).enter().append("rect").attr("class","dataBar").attr("data-start",function(a){return moment(a.ts).format()}).attr("data-end",function(a){return moment(a.te).format()}).attr("data-presence",function(a){return a.p}).attr("width",n).attr("x",function(a,b){return n*b+i*b}).attr("y",k).attr("height",0).on("click",function(){var a=$(this),b=a.attr("data-start"),c=a.attr("data-end");Controller.triggerTrafficByTimespan(b,c)}).transition().delay(function(a,b){return 10*b}).attr("y",function(a){return k-q(a.total)}).attr("height",function(a){return q(a.total)})}}},{key:"formatTraffic",value:function(a,b){if(0==b)return"";var c=1073741824,d=1048576,e=1024,f=function(a){var b;switch(Config.timeChartYScalePrecision){case 2:b=Math.round(100*a)/100;break;case 1:b=Math.round(10*a)/10;break;case 0:b=Math.round(a)}return b=""+b,b=b.replace(".",",")};return a=a>1e9?f(a/c)+"GB":a>1e6?f(a/d)+"MB":f(a/e)+"KB"}}]),a}(),DetailChart=function(){function a(b,c){_classCallCheck(this,a),this.GB=1073741824,this.MB=1048576,this.KB=1024,this.store=b,this.$e=c}return _createClass(a,[{key:"draw",value:function(a,b,c){Logger.info("detailchart",a,b,c);var d="#detail-chart-container",e="#detail-chart-inout-container";"total"==b?($(d).show(),$("#lineInOut").show(),$(e).show()):($(d).hide(),$("#lineInOut").hide(),$(e).show());var f=this.store.getByDay(a);if(0!=f.length){var g=this.prepareData(f,b,c),h=_.filter(g.chartValues,function(a){return a.label!=Controller.getMapping("total")&&a.label!=Controller.getMapping("inbound")&&a.label!=Controller.getMapping("outbound")}),i=_.filter(g.chartValues,function(a){return a.label==Controller.getMapping("inbound")||a.label==Controller.getMapping("outbound")}),j=_.flatten([_.pluck(h,"percent"),_.pluck(i,"percent")]);this.createChart(d,h,d3.max(j)),this.createChart(e,i,d3.max(j)),this.updateTrafficCount(g.raw[b].total),this.updatePresenceCount(g.raw[b].presence)}}},{key:"createChart",value:function(a,b,c){var d,e=10,f=2,g=this.$e.outerWidth();d=Config.bodyWidth<400?g/2+30:Config.bodyWidth<600?g/3+50:g/4+30;var h=d3.scale.linear().domain([0,c]).range([0,g/2]);d3.select(a).selectAll("g").remove();var i=d3.select(a),j=i.append("g").attr("class","barGroup").attr("width",g/2).attr("transform","translate("+d+",0)"),k=i.append("g").attr("class","labelGroup"),l=i.append("g").attr("class","valueGroup").attr("transform","translate("+d+",0)");j.selectAll("rect").data(b).enter().append("rect").attr("transform",function(a,b){return"translate(0,"+(b*e+b*f)+")"}).attr("width",function(a){return h(a.percent)}).attr("height",e-1).attr("class","dataBar"),k.selectAll("text").data(b).enter().append("text").attr("x",0).attr("transform",function(a,b){return"translate(0,"+(b*e+b*f)+")"}).attr("y",e/2).attr("dy",".35em").text(function(a){return a.label}),l.selectAll("text").data(b).enter().append("text").attr("x",0).attr("transform",function(a,b){return"translate(0,"+(b*e+b*f)+")"}).attr("y",e/2).attr("dy",".35em").attr("dx","-.35em").style("text-anchor","end").text(function(a){return a.percent+"%"})}},{key:"prepareData",value:function(a,b,c){var d,e,f,g,h=d3.nest().key(function(a){return a.t}).sortKeys(d3.ascending).entries(a[0].values),i={};h.forEach(function(a){d=0,e=0,f=0,g=[0,0],a.values.forEach(function(a){moment(a.ts).isBetween(c[0],c[1])&&(d=d+parseInt(a.inOk)+parseInt(a.inN)+parseInt(a.outOk)+parseInt(a.outN),e=e+parseInt(a.inOk)+parseInt(a.inN),f=f+parseInt(a.outOk)+parseInt(a.outN),1==a.p?g=[1,0]:2==a.p&&(g=[1,1]))}),i[a.key]={total:d,inbound:e,outbound:f,presence:g}});var j={raw:null,chartValues:[]};return"total"==b?(j.chartValues=this.getTotals(i),j.chartValues.push({label:Controller.getMapping("inbound"),percent:this.getPercent(i.total.inbound,i.total.total)}),j.chartValues.push({label:Controller.getMapping("outbound"),percent:this.getPercent(i.total.outbound,i.total.total)})):(j.chartValues.push({label:Controller.getMapping("inbound"),percent:this.getPercent(i[b].inbound,i[b].total)}),j.chartValues.push({label:Controller.getMapping("outbound"),percent:this.getPercent(i[b].outbound,i[b].total)})),j.raw=i,j}},{key:"getPercent",value:function(a,b){var c=a/(b/100);return Math.round(100*c)/100}},{key:"getTotals",value:function(a){var b,c=[];for(var d in a)b={label:Controller.getMapping(d),percent:this.getPercent(a[d].total,a.total.total)},c.push(b);return c}},{key:"updateTrafficCount",value:function(a){a=a>1e9?this.format(a/this.GB)+" GB":a>1e6?this.format(a/this.MB)+" MB":this.format(a/this.KB)+" KB",$(".countTrafficTotal").html(a)}},{key:"updatePresenceCount",value:function(a){var b="Niemand";1==_.sum(a)?b="1 Person":2==_.sum(a)&&(b="2 Personen"),$("#presenceCount").html(b)}},{key:"format",value:function(a){var b=Math.round(100*a)/100;return b=""+b,b=b.replace(".",",")}}]),a}(),Controller=function(){function a(b,c,d){_classCallCheck(this,a),this.currentDay=b,this.currentTimespan=d,this.currentType=c,this.detailChart=null,this.timeChart=null,this.calendar=null,this.mapping=null,this.windowWidth=$(window).width();var e=this,f=$("body");Config.bodyWidth=f.outerWidth();var g=function(){if($(window).width()!=e.windowWidth){Config.bodyWidth=f.outerWidth();var a;a=Config.bodyWidth<400?"mobile":Config.bodyWidth<600?"small":"medium",f.removeClass("mobile small medium").addClass(a),e.updateView()}};$(window).on("resize",g),g()}return _createClass(a,[{key:"registerTimeChart",value:function(a){this.timeChart=a}},{key:"registerDetailChart",value:function(a){this.detailChart=a}},{key:"registerCalendar",value:function(a){this.calendar=a}},{key:"run",value:function(){$("body").addClass("loaded"),this.updateView()}},{key:"triggerTrafficByType",value:function(a){Logger.debug("show by type",a),this.currentType=a,this.updateView()}},{key:"triggerTrafficByDay",value:function(a){Logger.debug("show by day",a),this.currentDay=a;var b=moment(a).startOf("day"),c=moment(a).endOf("day");this.currentTimespan=[b,c],this.updateView()}},{key:"triggerTrafficByTimespan",value:function(a,b){Logger.debug("show by timespan",a,b),moment.isMoment(a)||(a=moment(a)),moment.isMoment(b)||(b=moment(b)),this.currentTimespan=[a,b],this.updateView(!1,!0)}},{key:"updateView",value:function(){var a=arguments.length<=0||void 0===arguments[0]?!0:arguments[0],b=arguments.length<=1||void 0===arguments[1]?!0:arguments[1];null!=this.timeChart&&a&&this.timeChart.draw(this.currentDay,this.currentType,this.currentTimespan),null!=this.detailChart&&b&&this.detailChart.draw(this.currentDay,this.currentType,this.currentTimespan),null!=this.calendar&&this.calendar.markCurrent(this.currentDay),"total"==this.currentType?$("#presence").hide():$("#presence").show(),$(".timeChartWidget .currentDay").html(moment(this.currentDay).format("DD.MM.YYYY"));var c=this.currentTimespan[0].format("HH:mm")+" - "+this.currentTimespan[1].format("HH:mm");$(".timeChartWidget .currentTimespan").html(c),$(".detailChartWidget .currentDay").html(moment(this.currentDay).format("DD.MM.YYYY")),$(".detailChartWidget .currentTimespan").html(c),$("#detailTypeLabel").html(this.getMapping(this.currentType)),Config.countPixel()}},{key:"addMapping",value:function(a){this.mapping=a}},{key:"getMapping",value:function(a){return null==this.mapping||"undefined"==typeof this.mapping[a]?a:this.mapping[a]}},{key:"replaceText",value:function(a){for(var b in a)$("#"+b).text(a[b])}}]),a}(),Configuration=function a(){_classCallCheck(this,a),this.timeChartYScalePrecision=0,this.loglevel="debug",this.version="0.0.1",this.functionCount=function(){console.log("count - should be overriden")},this.functionResize=function(){console.log("resize - should be overriden")},this.appDataPath="./data/",this.appDataFileName="data.json"},Main=function(){function a(){_classCallCheck(this,a),this.dataloader=new DataLoader,this.datastore=null,this.settings=null}return _createClass(a,[{key:"initApp",value:function(){var a=Config.appDataPath+Config.appDataFileName;this.dataloader.load(a,this).done(this.loadHandler).fail(this.loadErrorHandler)}},{key:"loadHandler",value:function(a){this.settings=a.app,this.menuData=a.app.menu,Controller.addMapping(a.app.mapping),this.calendarData=a.app.calendar,Controller.replaceText(a.app.text);var b=[];this.settings.completeData.forEach(function(a){var c=Config.appDataPath+a.path;b.push(this.dataloader.load(c,this))},this);var c=this;Promise.all(b).then(function(a){var b=_.flatten(a);c.dataLoadHandler(b)})["catch"](function(a){c.loadErrorHandler(a)})}},{key:"dataLoadHandler",value:function(a){this.datastore=new DataStore(a),this.calendar=new Calendar(this.calendarData.start,this.calendarData.end,this.datastore,$(".calendarWidget")),this.calendar.build(),Controller.registerCalendar(this.calendar),this.dropdown=new Dropdown(this.menuData,$(".dropdown")),this.dropdown.build();var b=new TimeChart(this.datastore,$("#time-chart-container"));Controller.registerTimeChart(b);var c=new DetailChart(this.datastore,$("#detail-chart-container"));Controller.registerDetailChart(c),Controller.run()}},{key:"loadErrorHandler",value:function(a){Logger.error(a)}}],[{key:"version",value:function(){return Config.version}}]),a}();$(document).ready(function(){moment.locale("de");var a=moment().format("YYYY-MM-DD"),b="total",c=moment(a).startOf("day"),d=moment(a).endOf("day"),e=[c,d];window.Config=new Configuration,window.Logger=new Logger(Config.loglevel),Config.countPixel=function(){},Config.resize=function(){};var f=window.parent.$(window.frameElement).data("appData");"undefined"!=typeof f&&(Config.appDataPath=f.json,Config.resize=f.function_resize,Config.countPixel=f.function_count,"undefined"!=typeof f.day&&(a=moment(f.day).format("YYYY-MM-DD"),c=moment(a).startOf("day"),d=moment(a).endOf("day"),e=[c,d]),"undefined"!=typeof f.type&&(b=f.type)),window.Controller=new Controller(a,b,e);var g=new Main;g.initApp()});