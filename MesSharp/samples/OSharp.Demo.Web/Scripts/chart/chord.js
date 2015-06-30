define("echarts/chart/chord",["require","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Sector","../util/shape/Ribbon","../util/shape/Icon","zrender/shape/BezierCurve","../config","../util/ecData","zrender/tool/util","zrender/tool/vector","../data/Graph","../layout/Chord","../chart"],function(e){"use strict";function t(e,t,n,a,o){i.call(this,e,t,n,a,o),this.scaleLineLength=4,this.scaleUnitAngle=4,this.refresh(a)}var i=e("./base"),n=e("zrender/shape/Text"),a=e("zrender/shape/Line"),o=e("zrender/shape/Sector"),s=e("../util/shape/Ribbon"),r=e("../util/shape/Icon"),l=e("zrender/shape/BezierCurve"),h=e("../config");h.chord={zlevel:0,z:2,clickable:!0,radius:["65%","75%"],center:["50%","50%"],padding:2,sort:"none",sortSub:"none",startAngle:90,clockWise:!0,ribbonType:!0,minRadius:10,maxRadius:20,symbol:"circle",showScale:!1,showScaleText:!1,itemStyle:{normal:{borderWidth:0,borderColor:"#000",label:{show:!0,rotate:!1,distance:5},chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999",opacity:.5}},emphasis:{borderWidth:0,borderColor:"#000",chordStyle:{width:1,color:"black",borderWidth:1,borderColor:"#999"}}}};var d=e("../util/ecData"),c=e("zrender/tool/util"),m=e("zrender/tool/vector"),p=e("../data/Graph"),u=e("../layout/Chord");return t.prototype={type:h.CHART_TYPE_CHORD,_init:function(){var e=this.series;this.selectedMap={};for(var t={},i={},n=0,a=e.length;a>n;n++)if(e[n].type===this.type){var o=this.isSelected(e[n].name);this.selectedMap[e[n].name]=o,o&&this.buildMark(n),this.reformOption(e[n]),t[e[n].name]=e[n]}for(var n=0,a=e.length;a>n;n++)if(e[n].type===this.type)if(e[n].insertToSerie){var s=t[e[n].insertToSerie];e[n]._referenceSerie=s}else i[e[n].name]=[e[n]];for(var n=0,a=e.length;a>n;n++)if(e[n].type===this.type&&e[n].insertToSerie){for(var r=e[n]._referenceSerie;r&&r._referenceSerie;)r=r._referenceSerie;i[r.name]&&this.selectedMap[e[n].name]&&i[r.name].push(e[n])}for(var l in i)this._buildChords(i[l]);this.addShapeList()},_getNodeCategory:function(e,t){return e.categories&&e.categories[t.category||0]},_getNodeQueryTarget:function(e,t){var i=this._getNodeCategory(e,t);return[t,i,e]},_getEdgeQueryTarget:function(e,t,i){return i=i||"normal",[t.itemStyle&&t.itemStyle[i],e.itemStyle[i].chordStyle]},_buildChords:function(e){for(var t=[],i=e[0],n=function(e){return e.layout.size>0},a=function(e){return function(t){return e.getEdge(t.node2,t.node1)}},o=0;o<e.length;o++){var s=e[o];if(this.selectedMap[s.name]){var r;s.data&&s.matrix?r=this._getSerieGraphFromDataMatrix(s,i):s.nodes&&s.links&&(r=this._getSerieGraphFromNodeLinks(s,i)),r.filterNode(n,this),s.ribbonType&&r.filterEdge(a(r)),t.push(r),r.__serie=s}}if(t.length){var l=t[0];if(!i.ribbonType){var h=i.minRadius,d=i.maxRadius,c=1/0,m=-1/0;l.eachNode(function(e){m=Math.max(e.layout.size,m),c=Math.min(e.layout.size,c)});var p=(d-h)/(m-c);l.eachNode(function(e){var t=this._getNodeQueryTarget(i,e),n=this.query(t,"symbolSize");e.layout.size=m===c?n||c:n||(e.layout.size-c)*p+h},this)}var g=new u;g.clockWise=i.clockWise,g.startAngle=i.startAngle*Math.PI/180,g.clockWise||(g.startAngle=-g.startAngle),g.padding=i.padding*Math.PI/180,g.sort=i.sort,g.sortSub=i.sortSub,g.directed=i.ribbonType,g.run(t);var V=this.query(i,"itemStyle.normal.label.show");if(i.ribbonType){this._buildSectors(i,0,l,i,t),V&&this._buildLabels(i,0,l,i,t);for(var o=0,U=0;o<e.length;o++)this.selectedMap[e[o].name]&&this._buildRibbons(e,o,t[U++],i);i.showScale&&this._buildScales(i,0,l)}else{this._buildNodeIcons(i,0,l,i,t),V&&this._buildLabels(i,0,l,i,t);for(var o=0,U=0;o<e.length;o++)this.selectedMap[e[o].name]&&this._buildEdgeCurves(e,o,t[U++],i,l)}this._initHoverHandler(e,t)}},_getSerieGraphFromDataMatrix:function(e,t){for(var i=[],n=0,a=[],o=0;o<e.matrix.length;o++)a[o]=e.matrix[o].slice();for(var s=e.data||e.nodes,o=0;o<s.length;o++){var r={},l=s[o];l.rawIndex=o;for(var h in l)"name"===h?r.id=l.name:r[h]=l[h];var d=this._getNodeCategory(t,l),c=d?d.name:l.name;if(this.selectedMap[c]=this.isSelected(c),this.selectedMap[c])i.push(r),n++;else{a.splice(n,1);for(var m=0;m<a.length;m++)a[m].splice(n,1)}}var u=p.fromMatrix(i,a,!0);return u.eachNode(function(e){e.layout={size:e.data.outValue},e.rawIndex=e.data.rawIndex}),u.eachEdge(function(e){e.layout={weight:e.data.weight}}),u},_getSerieGraphFromNodeLinks:function(e,t){for(var i=new p(!0),n=e.data||e.nodes,a=0,o=n.length;o>a;a++){var s=n[a];if(s&&!s.ignore){var r=this._getNodeCategory(t,s),l=r?r.name:s.name;if(this.selectedMap[l]=this.isSelected(l),this.selectedMap[l]){var h=i.addNode(s.name,s);h.rawIndex=a}}}for(var a=0,o=e.links.length;o>a;a++){var d=e.links[a],c=d.source,m=d.target;"number"==typeof c&&(c=n[c],c&&(c=c.name)),"number"==typeof m&&(m=n[m],m&&(m=m.name));var u=i.addEdge(c,m,d);u&&(u.rawIndex=a)}return i.eachNode(function(e){var i=e.data.value;if(null==i)if(i=0,t.ribbonType)for(var n=0;n<e.outEdges.length;n++)i+=e.outEdges[n].data.weight||0;else for(var n=0;n<e.edges.length;n++)i+=e.edges[n].data.weight||0;e.layout={size:i}}),i.eachEdge(function(e){e.layout={weight:null==e.data.weight?1:e.data.weight}}),i},_initHoverHandler:function(e,t){var i=e[0],n=t[0],a=this;n.eachNode(function(e){e.shape.onmouseover=function(){n.eachNode(function(e){e.shape.style.opacity=.1,e.labelShape&&(e.labelShape.style.opacity=.1,e.labelShape.modSelf()),e.shape.modSelf()});for(var i=0;i<t.length;i++)for(var o=0;o<t[i].edges.length;o++){var s=t[i].edges[o],r=a._getEdgeQueryTarget(t[i].__serie,s.data);s.shape.style.opacity=.1*a.deepQuery(r,"opacity"),s.shape.modSelf()}e.shape.style.opacity=1,e.labelShape&&(e.labelShape.style.opacity=1);for(var i=0;i<t.length;i++){var l=t[i].getNodeById(e.id);if(l)for(var o=0;o<l.outEdges.length;o++){var s=l.outEdges[o],r=a._getEdgeQueryTarget(t[i].__serie,s.data);s.shape.style.opacity=a.deepQuery(r,"opacity");var h=t[0].getNodeById(s.node2.id);h&&(h.shape&&(h.shape.style.opacity=1),h.labelShape&&(h.labelShape.style.opacity=1))}}a.zr.refreshNextFrame()},e.shape.onmouseout=function(){n.eachNode(function(e){e.shape.style.opacity=1,e.labelShape&&(e.labelShape.style.opacity=1,e.labelShape.modSelf()),e.shape.modSelf()});for(var e=0;e<t.length;e++)for(var o=0;o<t[e].edges.length;o++){var s=t[e].edges[o],r=[s.data,i];s.shape.style.opacity=a.deepQuery(r,"itemStyle.normal.chordStyle.opacity"),s.shape.modSelf()}a.zr.refreshNextFrame()}})},_buildSectors:function(e,t,i,n){var a=this.parseCenter(this.zr,n.center),s=this.parseRadius(this.zr,n.radius),r=n.clockWise,l=r?1:-1;i.eachNode(function(i){var h=this._getNodeCategory(n,i.data),c=this.getColor(h?h.name:i.id),m=i.layout.startAngle/Math.PI*180*l,p=i.layout.endAngle/Math.PI*180*l,u=new o({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:a[0],y:a[1],r0:s[0],r:s[1],startAngle:m,endAngle:p,brushType:"fill",opacity:1,color:c,clockWise:r},clickable:n.clickable,highlightStyle:{brushType:"fill"}});u.style.lineWidth=this.deepQuery([i.data,n],"itemStyle.normal.borderWidth"),u.highlightStyle.lineWidth=this.deepQuery([i.data,n],"itemStyle.emphasis.borderWidth"),u.style.strokeColor=this.deepQuery([i.data,n],"itemStyle.normal.borderColor"),u.highlightStyle.strokeColor=this.deepQuery([i.data,n],"itemStyle.emphasis.borderColor"),u.style.lineWidth>0&&(u.style.brushType="both"),u.highlightStyle.lineWidth>0&&(u.highlightStyle.brushType="both"),d.pack(u,e,t,i.data,i.rawIndex,i.id,i.category),this.shapeList.push(u),i.shape=u},this)},_buildNodeIcons:function(e,t,i,n){var a=this.parseCenter(this.zr,n.center),o=this.parseRadius(this.zr,n.radius),s=o[1];i.eachNode(function(i){var o=i.layout.startAngle,l=i.layout.endAngle,h=(o+l)/2,c=s*Math.cos(h),m=s*Math.sin(h),p=this._getNodeQueryTarget(n,i.data),u=this._getNodeCategory(n,i.data),g=this.deepQuery(p,"itemStyle.normal.color");g||(g=this.getColor(u?u.name:i.id));var V=new r({zlevel:this.getZlevelBase(),z:this.getZBase()+1,style:{x:-i.layout.size,y:-i.layout.size,width:2*i.layout.size,height:2*i.layout.size,iconType:this.deepQuery(p,"symbol"),color:g,brushType:"both",lineWidth:this.deepQuery(p,"itemStyle.normal.borderWidth"),strokeColor:this.deepQuery(p,"itemStyle.normal.borderColor")},highlightStyle:{color:this.deepQuery(p,"itemStyle.emphasis.color"),lineWidth:this.deepQuery(p,"itemStyle.emphasis.borderWidth"),strokeColor:this.deepQuery(p,"itemStyle.emphasis.borderColor")},clickable:n.clickable,position:[c+a[0],m+a[1]]});d.pack(V,e,t,i.data,i.rawIndex,i.id,i.category),this.shapeList.push(V),i.shape=V},this)},_buildLabels:function(e,t,i,a){var o=this.query(a,"itemStyle.normal.label.color"),s=this.query(a,"itemStyle.normal.label.rotate"),r=this.query(a,"itemStyle.normal.label.distance"),l=this.parseCenter(this.zr,a.center),h=this.parseRadius(this.zr,a.radius),d=a.clockWise,c=d?1:-1;i.eachNode(function(e){var t=e.layout.startAngle/Math.PI*180*c,i=e.layout.endAngle/Math.PI*180*c,d=(t*-c+i*-c)/2;d%=360,0>d&&(d+=360);var p=90>=d||d>=270;d=d*Math.PI/180;var u=[Math.cos(d),-Math.sin(d)],g=0;g=a.ribbonType?a.showScaleText?35+r:r:r+e.layout.size;var V=m.scale([],u,h[1]+g);m.add(V,V,l);var U={zlevel:this.getZlevelBase(),z:this.getZBase()+1,hoverable:!1,style:{text:null==e.data.label?e.id:e.data.label,textAlign:p?"left":"right",color:o||"#000000"}};s?(U.rotation=p?d:Math.PI+d,U.style.x=p?h[1]+g:-h[1]-g,U.style.y=0,U.position=l.slice()):(U.style.x=V[0],U.style.y=V[1]),U.style.textColor=this.deepQuery([e.data,a],"itemStyle.normal.label.textStyle.color")||"#fff",U.style.textFont=this.getFont(this.deepQuery([e.data,a],"itemStyle.normal.label.textStyle")),U=new n(U),this.shapeList.push(U),e.labelShape=U},this)},_buildRibbons:function(e,t,i,n){var a=e[t],o=this.parseCenter(this.zr,n.center),r=this.parseRadius(this.zr,n.radius);i.eachEdge(function(l,h){var c,m=i.getEdge(l.node2,l.node1);if(m&&!l.shape){if(m.shape)return void(l.shape=m.shape);var p=l.layout.startAngle/Math.PI*180,u=l.layout.endAngle/Math.PI*180,g=m.layout.startAngle/Math.PI*180,V=m.layout.endAngle/Math.PI*180;c=this.getColor(1===e.length?l.layout.weight<=m.layout.weight?l.node1.id:l.node2.id:a.name);var U,y,f=this._getEdgeQueryTarget(a,l.data),b=this._getEdgeQueryTarget(a,l.data,"emphasis"),_=new s({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{x:o[0],y:o[1],r:r[0],source0:p,source1:u,target0:g,target1:V,brushType:"both",opacity:this.deepQuery(f,"opacity"),color:c,lineWidth:this.deepQuery(f,"borderWidth"),strokeColor:this.deepQuery(f,"borderColor"),clockWise:n.clockWise},clickable:n.clickable,highlightStyle:{brushType:"both",opacity:this.deepQuery(b,"opacity"),lineWidth:this.deepQuery(b,"borderWidth"),strokeColor:this.deepQuery(b,"borderColor")}});l.layout.weight<=m.layout.weight?(U=m.node1,y=m.node2):(U=l.node1,y=l.node2),d.pack(_,a,t,l.data,null==l.rawIndex?h:l.rawIndex,l.data.name||U.id+"-"+y.id,U.id,y.id),this.shapeList.push(_),l.shape=_}},this)},_buildEdgeCurves:function(e,t,i,n,a){var o=e[t],s=this.parseCenter(this.zr,n.center);i.eachEdge(function(e,i){var n=a.getNodeById(e.node1.id),r=a.getNodeById(e.node2.id),h=n.shape,c=r.shape,m=this._getEdgeQueryTarget(o,e.data),p=this._getEdgeQueryTarget(o,e.data,"emphasis"),u=new l({zlevel:this.getZlevelBase(),z:this.getZBase(),style:{xStart:h.position[0],yStart:h.position[1],xEnd:c.position[0],yEnd:c.position[1],cpX1:s[0],cpY1:s[1],lineWidth:this.deepQuery(m,"width"),strokeColor:this.deepQuery(m,"color"),opacity:this.deepQuery(m,"opacity")},highlightStyle:{lineWidth:this.deepQuery(p,"width"),strokeColor:this.deepQuery(p,"color"),opacity:this.deepQuery(p,"opacity")}});d.pack(u,o,t,e.data,null==e.rawIndex?i:e.rawIndex,e.data.name||e.node1.id+"-"+e.node2.id,e.node1.id,e.node2.id),this.shapeList.push(u),e.shape=u},this)},_buildScales:function(e,t,i){var o,s,r=e.clockWise,l=this.parseCenter(this.zr,e.center),h=this.parseRadius(this.zr,e.radius),d=r?1:-1,c=0,p=-1/0;e.showScaleText&&(i.eachNode(function(e){var t=e.data.value;t>p&&(p=t),c+=t}),p>1e10?(o="b",s=1e-9):p>1e7?(o="m",s=1e-6):p>1e4?(o="k",s=.001):(o="",s=1));var u=c/(360-e.padding);i.eachNode(function(t){for(var i=t.layout.startAngle/Math.PI*180,c=t.layout.endAngle/Math.PI*180,p=i;;){if(r&&p>c||!r&&c>p)break;var g=p/180*Math.PI,V=[Math.cos(g),Math.sin(g)],U=m.scale([],V,h[1]+1);m.add(U,U,l);var y=m.scale([],V,h[1]+this.scaleLineLength);m.add(y,y,l);var f=new a({zlevel:this.getZlevelBase(),z:this.getZBase()-1,hoverable:!1,style:{xStart:U[0],yStart:U[1],xEnd:y[0],yEnd:y[1],lineCap:"round",brushType:"stroke",strokeColor:"#666",lineWidth:1}});this.shapeList.push(f),p+=d*this.scaleUnitAngle}if(e.showScaleText)for(var b=i,_=5*u*this.scaleUnitAngle,x=0;;){if(r&&b>c||!r&&c>b)break;var g=b;g%=360,0>g&&(g+=360);var k=90>=g||g>=270,L=new n({zlevel:this.getZlevelBase(),z:this.getZBase()-1,hoverable:!1,style:{x:k?h[1]+this.scaleLineLength+4:-h[1]-this.scaleLineLength-4,y:0,text:Math.round(10*x)/10+o,textAlign:k?"left":"right"},position:l.slice(),rotation:k?[-g/180*Math.PI,0,0]:[-(g+180)/180*Math.PI,0,0]});this.shapeList.push(L),x+=_*s,b+=d*this.scaleUnitAngle*5}},this)},refresh:function(e){if(e&&(this.option=e,this.series=e.series),this.legend=this.component.legend,this.legend)this.getColor=function(e){return this.legend.getColor(e)},this.isSelected=function(e){return this.legend.isSelected(e)};else{var t={},i=0;this.getColor=function(e){return t[e]?t[e]:(t[e]||(t[e]=this.zr.getColor(i++)),t[e])},this.isSelected=function(){return!0}}this.backupShapeList(),this._init()},reformOption:function(e){var t=c.merge;e=t(t(e||{},this.ecTheme.chord),h.chord),e.itemStyle.normal.label.textStyle=this.getTextStyle(e.itemStyle.normal.label.textStyle)}},c.inherits(t,i),e("../chart").define("chord",t),t}),define("echarts/util/shape/Ribbon",["require","zrender/shape/Base","zrender/shape/util/PathProxy","zrender/tool/util","zrender/tool/area"],function(e){function t(e){i.call(this,e),this._pathProxy=new n}var i=e("zrender/shape/Base"),n=e("zrender/shape/util/PathProxy"),a=e("zrender/tool/util"),o=e("zrender/tool/area");return t.prototype={type:"ribbon",buildPath:function(e,t){var i=t.clockWise||!1,n=this._pathProxy;n.begin(e);var a=t.x,o=t.y,s=t.r,r=t.source0/180*Math.PI,l=t.source1/180*Math.PI,h=t.target0/180*Math.PI,d=t.target1/180*Math.PI,c=a+Math.cos(r)*s,m=o+Math.sin(r)*s,p=a+Math.cos(l)*s,u=o+Math.sin(l)*s,g=a+Math.cos(h)*s,V=o+Math.sin(h)*s,U=a+Math.cos(d)*s,y=o+Math.sin(d)*s;n.moveTo(c,m),n.arc(a,o,t.r,r,l,!i),n.bezierCurveTo(.7*(a-p)+p,.7*(o-u)+u,.7*(a-g)+g,.7*(o-V)+V,g,V),(t.source0!==t.target0||t.source1!==t.target1)&&(n.arc(a,o,t.r,h,d,!i),n.bezierCurveTo(.7*(a-U)+U,.7*(o-y)+y,.7*(a-c)+c,.7*(o-m)+m,c,m))},getRect:function(e){return e.__rect?e.__rect:(this._pathProxy.isEmpty()||this.buildPath(null,e),this._pathProxy.fastBoundingRect())},isCover:function(e,t){var i=this.getRect(this.style);return e>=i.x&&e<=i.x+i.width&&t>=i.y&&t<=i.y+i.height?o.isInsidePath(this._pathProxy.pathCommands,0,"fill",e,t):void 0}},a.inherits(t,i),t}),define("zrender/shape/BezierCurve",["require","./Base","../tool/util"],function(e){"use strict";var t=e("./Base"),i=function(e){this.brushTypeOnly="stroke",this.textPosition="end",t.call(this,e)};return i.prototype={type:"bezier-curve",buildPath:function(e,t){e.moveTo(t.xStart,t.yStart),"undefined"!=typeof t.cpX2&&"undefined"!=typeof t.cpY2?e.bezierCurveTo(t.cpX1,t.cpY1,t.cpX2,t.cpY2,t.xEnd,t.yEnd):e.quadraticCurveTo(t.cpX1,t.cpY1,t.xEnd,t.yEnd)},getRect:function(e){if(e.__rect)return e.__rect;var t=Math.min(e.xStart,e.xEnd,e.cpX1),i=Math.min(e.yStart,e.yEnd,e.cpY1),n=Math.max(e.xStart,e.xEnd,e.cpX1),a=Math.max(e.yStart,e.yEnd,e.cpY1),o=e.cpX2,s=e.cpY2;"undefined"!=typeof o&&"undefined"!=typeof s&&(t=Math.min(t,o),i=Math.min(i,s),n=Math.max(n,o),a=Math.max(a,s));var r=e.lineWidth||1;return e.__rect={x:t-r,y:i-r,width:n-t+r,height:a-i+r},e.__rect}},e("../tool/util").inherits(i,t),i}),define("echarts/data/Graph",["require","zrender/tool/util"],function(e){var t=e("zrender/tool/util"),i=function(e){this._directed=e||!1,this.nodes=[],this.edges=[],this._nodesMap={},this._edgesMap={}};i.prototype.isDirected=function(){return this._directed},i.prototype.addNode=function(e,t){if(this._nodesMap[e])return this._nodesMap[e];var n=new i.Node(e,t);return this.nodes.push(n),this._nodesMap[e]=n,n},i.prototype.getNodeById=function(e){return this._nodesMap[e]},i.prototype.addEdge=function(e,t,n){if("string"==typeof e&&(e=this._nodesMap[e]),"string"==typeof t&&(t=this._nodesMap[t]),e&&t){var a=e.id+"-"+t.id;if(this._edgesMap[a])return this._edgesMap[a];var o=new i.Edge(e,t,n);return this._directed&&(e.outEdges.push(o),t.inEdges.push(o)),e.edges.push(o),e!==t&&t.edges.push(o),this.edges.push(o),this._edgesMap[a]=o,o}},i.prototype.removeEdge=function(e){var i=e.node1,n=e.node2,a=i.id+"-"+n.id;this._directed&&(i.outEdges.splice(t.indexOf(i.outEdges,e),1),n.inEdges.splice(t.indexOf(n.inEdges,e),1)),i.edges.splice(t.indexOf(i.edges,e),1),i!==n&&n.edges.splice(t.indexOf(n.edges,e),1),delete this._edgesMap[a],this.edges.splice(t.indexOf(this.edges,e),1)},i.prototype.getEdge=function(e,t){return"string"!=typeof e&&(e=e.id),"string"!=typeof t&&(t=t.id),this._directed?this._edgesMap[e+"-"+t]:this._edgesMap[e+"-"+t]||this._edgesMap[t+"-"+e]},i.prototype.removeNode=function(e){if("string"!=typeof e||(e=this._nodesMap[e])){delete this._nodesMap[e.id],this.nodes.splice(t.indexOf(this.nodes,e),1);for(var i=0;i<this.edges.length;){var n=this.edges[i];n.node1===e||n.node2===e?this.removeEdge(n):i++}}},i.prototype.filterNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;)e.call(t,this.nodes[n],n)?n++:(this.removeNode(this.nodes[n]),i--)},i.prototype.filterEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;)e.call(t,this.edges[n],n)?n++:(this.removeEdge(this.edges[n]),i--)},i.prototype.eachNode=function(e,t){for(var i=this.nodes.length,n=0;i>n;n++)this.nodes[n]&&e.call(t,this.nodes[n],n)},i.prototype.eachEdge=function(e,t){for(var i=this.edges.length,n=0;i>n;n++)this.edges[n]&&e.call(t,this.edges[n],n)},i.prototype.clear=function(){this.nodes.length=0,this.edges.length=0,this._nodesMap={},this._edgesMap={}},i.prototype.breadthFirstTraverse=function(e,t,i,n){if("string"==typeof t&&(t=this._nodesMap[t]),t){var a="edges";"out"===i?a="outEdges":"in"===i&&(a="inEdges");for(var o=0;o<this.nodes.length;o++)this.nodes[o].__visited=!1;if(!e.call(n,t,null))for(var s=[t];s.length;)for(var r=s.shift(),l=r[a],o=0;o<l.length;o++){var h=l[o],d=h.node1===r?h.node2:h.node1;if(!d.__visited){if(e.call(d,d,r))return;s.push(d),d.__visited=!0}}}},i.prototype.clone=function(){for(var e=new i(this._directed),t=0;t<this.nodes.length;t++)e.addNode(this.nodes[t].id,this.nodes[t].data);for(var t=0;t<this.edges.length;t++){var n=this.edges[t];e.addEdge(n.node1.id,n.node2.id,n.data)}return e};var n=function(e,t){this.id=e,this.data=t||null,this.inEdges=[],this.outEdges=[],this.edges=[]};n.prototype.degree=function(){return this.edges.length},n.prototype.inDegree=function(){return this.inEdges.length},n.prototype.outDegree=function(){return this.outEdges.length};var a=function(e,t,i){this.node1=e,this.node2=t,this.data=i||null};return i.Node=n,i.Edge=a,i.fromMatrix=function(e,t,n){if(t&&t.length&&t[0].length===t.length&&e.length===t.length){for(var a=t.length,o=new i(n),s=0;a>s;s++){var r=o.addNode(e[s].id,e[s]);r.data.value=0,n&&(r.data.outValue=r.data.inValue=0)}for(var s=0;a>s;s++)for(var l=0;a>l;l++){var h=t[s][l];n&&(o.nodes[s].data.outValue+=h,o.nodes[l].data.inValue+=h),o.nodes[s].data.value+=h,o.nodes[l].data.value+=h}for(var s=0;a>s;s++)for(var l=s;a>l;l++){var h=t[s][l];if(0!==h){var d=o.nodes[s],c=o.nodes[l],m=o.addEdge(d,c,{});if(m.data.weight=h,s!==l&&n&&t[l][s]){var p=o.addEdge(c,d,{});p.data.weight=t[l][s]}}}return o}},i}),define("echarts/layout/Chord",["require"],function(){var e=function(e){e=e||{},this.sort=e.sort||null,this.sortSub=e.sortSub||null,this.padding=.05,this.startAngle=e.startAngle||0,this.clockWise=null==e.clockWise?!1:e.clockWise,this.center=e.center||[0,0],this.directed=!0};e.prototype.run=function(e){e instanceof Array||(e=[e]);var n=e.length;if(n){for(var a=e[0],o=a.nodes.length,s=[],r=0,l=0;o>l;l++){var h=a.nodes[l],d={size:0,subGroups:[],node:h};s.push(d);for(var c=0,m=0;m<e.length;m++){var p=e[m],u=p.getNodeById(h.id);if(u){d.size+=u.layout.size;for(var g=this.directed?u.outEdges:u.edges,V=0;V<g.length;V++){var U=g[V],y=U.layout.weight;d.subGroups.push({weight:y,edge:U,graph:p}),c+=y}}}r+=d.size;for(var f=d.size/c,V=0;V<d.subGroups.length;V++)d.subGroups[V].weight*=f;"ascending"===this.sortSub?d.subGroups.sort(t):"descending"===this.sort&&(d.subGroups.sort(t),d.subGroups.reverse())}"ascending"===this.sort?s.sort(i):"descending"===this.sort&&(s.sort(i),s.reverse());for(var f=(2*Math.PI-this.padding*o)/r,b=this.startAngle,_=this.clockWise?1:-1,l=0;o>l;l++){var d=s[l];d.node.layout.startAngle=b,d.node.layout.endAngle=b+_*d.size*f,d.node.layout.subGroups=[];for(var V=0;V<d.subGroups.length;V++){var x=d.subGroups[V];x.edge.layout.startAngle=b,b+=_*x.weight*f,x.edge.layout.endAngle=b}b=d.node.layout.endAngle+_*this.padding}}};var t=function(e,t){return e.weight-t.weight},i=function(e,t){return e.size-t.size};return e});