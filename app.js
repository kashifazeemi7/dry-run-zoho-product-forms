function ZFLead(){
}
ZFLead.utmPValObj = ZFLead.utmPValObj || {};

ZFLead.utmPNameArr = new Array('utm_source','utm_medium','utm_campaign','utm_term','utm_content');

ZFLead.prototype.zfutm_getLeadVal = function(pName){
	var qStr = '';
	try{
		qStr = window.top.location.search.substring(1);
	} catch (e){
		qStr = '';
	}
	var pNameTemp = pName + '=';
	var pValue = '';
	if ( typeof qStr !== "undefined" && qStr !== null && qStr.length > 0 ){
		var begin = qStr.indexOf(pNameTemp);
		if ( begin != -1 ){
			begin = begin + pNameTemp.length;
			end = qStr.indexOf( '&', begin );
			if ( end == -1 ){
				end = qStr.length;
			}
			pValue = qStr.substring( begin, end );
		}
	}
	if (pValue == undefined || pValue == ''){
		pValue = this.zfutm_gC(pName);
	}
	if ( typeof pValue !== "undefined" && pValue !== null ){
		pValue = pValue.replace(/\+/g,' ');
	}
	return pValue;
};

ZFLead.prototype.zfutm_sC = function( paramName,path,domain,secure ){
	var value = ZFLead.utmPValObj[paramName];
	if ( typeof value !== "undefined" && value !== null ){
		var cookieStr = paramName + "=" + escape( value );
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+7);
		cookieStr += "; expires=" + exdate.toGMTString();
		cookieStr += "; path=/";
		if ( domain ) {
			cookieStr += "; domain=" + escape( domain );
		}
		if ( secure ) {
			cookieStr += "; secure";
		}
		document.cookie = cookieStr;
	}
};

ZFLead.prototype.zfutm_ini = function (){
	for (var i = 0; i < ZFLead.utmPNameArr.length ; i ++){
		var zf_pN = ZFLead.utmPNameArr[i];
		var zf_pV = this.zfutm_getLeadVal(zf_pN);
		if ( typeof zf_pV !== "undefined" && zf_pV !== null ) {
			ZFLead.utmPValObj[ zf_pN ] = zf_pV;
		}
	}
	for (var pkey in ZFLead.utmPValObj) {
		this.zfutm_sC(pkey);
	}
};


ZFLead.prototype.zfutm_gC = function( cookieName ){
	var cookieArr = document.cookie.split('; ');
	for ( var i = 0 ; i < cookieArr.length ; i ++ ){
		var cookieVals = cookieArr[i].split('=');
		if ( cookieVals[0] === cookieName && cookieVals[1] ) {
			return unescape(cookieVals[1]);
		}
	}
};
ZFLead.prototype.zfutm_iframeSprt = function () {
	var zf_frame = document.getElementsByTagName("iframe");
	for(var i = 0; i < zf_frame.length; ++i){
		if((zf_frame[i].src).indexOf('formperma') > 0 ){
			var zf_src = zf_frame[i].src;
			for( var prmIdx = 0 ; prmIdx < ZFLead.utmPNameArr.length ; prmIdx ++ ) {
				var utmPm = ZFLead.utmPNameArr[ prmIdx ];
				var utmVal = this.zfutm_gC( ZFLead.utmPNameArr[ prmIdx ] );
				if ( typeof utmVal !== "undefined" ) {
					if(zf_src.indexOf('?') > 0){
	                    zf_src = zf_src+'&'+utmPm+'='+utmVal;
					}else{
					    zf_src = zf_src+'?'+utmPm+'='+utmVal;
					}
				}
			}
			if ( zf_frame[i].src.length < zf_src.length ) {
				zf_frame[i].src = zf_src;
			}
		}
	}
};
ZFLead.prototype.zfutm_DHtmlSprt = function () {
	var zf_formsArr = document.forms;
	for ( var frmInd = 0 ; frmInd < zf_formsArr.length ; frmInd ++ ) {
		var zf_form_act = zf_formsArr[frmInd].action;
		if ( zf_form_act && zf_form_act.indexOf('formperma') > 0 ){
			for( var prmIdx = 0 ; prmIdx < ZFLead.utmPNameArr.length ; prmIdx ++ ) {
				var utmPm = ZFLead.utmPNameArr[ prmIdx ];
				var utmVal = this.zfutm_gC( ZFLead.utmPNameArr[ prmIdx ] );
				if ( typeof utmVal !== "undefined" ) {
					var fieldObj = zf_formsArr[frmInd][utmPm];
					if ( fieldObj ) {
						fieldObj.value = utmVal;
					}
				}
			}
		}
	}
};
ZFLead.prototype.zfutm_jsEmbedSprt = function ( id ) {
	document.getElementById('zforms_iframe_id').removeAttribute("onload"); 
	var jsEmbdFrm = document.getElementById("zforms_iframe_id");
	var embdSrc = jsEmbdFrm.src;
    for( var prmIdx = 0 ; prmIdx < ZFLead.utmPNameArr.length ; prmIdx ++ ) {
		var utmPm = ZFLead.utmPNameArr[ prmIdx ];
		var utmVal = this.zfutm_gC( ZFLead.utmPNameArr[ prmIdx ] );
		if ( typeof utmVal !== "undefined" ) {
			if(embdSrc.indexOf('?') > 0){
	            embdSrc = embdSrc+'&'+utmPm+'='+utmVal;
			}else{
			    embdSrc = embdSrc+'?'+utmPm+'='+utmVal;
			}
		}
	}
	jsEmbdFrm.src = embdSrc;
};
var zfutm_zfLead = new ZFLead();
zfutm_zfLead.zfutm_ini();
window.onload = function () {
	zfutm_zfLead.zfutm_iframeSprt();
	zfutm_zfLead.zfutm_DHtmlSprt();
}

(function() {
try{
var f = document.createElement("iframe");   
f.src = 'https://forms.zohopublic.com/kashifazeemi22/form/ProductOrderform/formperma/bcfc7T14Hx_MF4D_p1rprmaTw0VWL4-fEH7qqSxMlco?zf_rszfm=1';
f.style.border="none";                                           
f.style.height="2125px";
f.style.width="90%";
f.style.transition="all 0.5s ease";
var d = document.getElementById("zf_div_bcfc7T14Hx_MF4D_p1rprmaTw0VWL4-fEH7qqSxMlco");
d.appendChild(f);
window.addEventListener('message', function (){
var evntData = event.data;
if( evntData && evntData.constructor == String ){
var zf_ifrm_data = evntData.split("|");
if ( zf_ifrm_data.length == 2 ) {
var zf_perma = zf_ifrm_data[0];
var zf_ifrm_ht_nw = ( parseInt(zf_ifrm_data[1], 10) + 15 ) + "px";
var iframe = document.getElementById("zf_div_bcfc7T14Hx_MF4D_p1rprmaTw0VWL4-fEH7qqSxMlco").getElementsByTagName("iframe")[0];
if ( (iframe.src).indexOf('formperma') > 0 && (iframe.src).indexOf(zf_perma) > 0 ) {
var prevIframeHeight = iframe.style.height;
if ( prevIframeHeight != zf_ifrm_ht_nw ) {
iframe.style.height = zf_ifrm_ht_nw;
}   
}
}
}
}, false);
}catch(e){}
})()

