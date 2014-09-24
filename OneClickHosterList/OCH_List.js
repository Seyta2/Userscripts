﻿/*
A list of One-Click-Hosters that are supported by nopremium.pl and unrestrict.li
*/

function OCH_ByFindingString(link,s,cb,thisArg) {
  // Offline if one of the strings [s] is found in the responseText
  if(typeof s == "string") {
    s = [s];
  }
  rq.add({
    method: "GET",
    url: link.url,
    onload: function (response){
      for(var i = 0; i < s.length; i++) {
        if(response.responseText.indexOf(s[i]) != -1) {
          cb.call(thisArg,link,0); // Offline
          return;
        }
      }
      cb.call(thisArg,link,1); // Online
    }
  });
}
function OCH_ByNotFindingString(link,s,cb,thisArg) {
  // Offline if none of the strings [s] is found in the responseText
  if(typeof s == "string") {
    s = [s];
  }
  rq.add({
    method: "GET",
    url: link.url,
    onload: function (response){
      for(var i = 0; i < s.length; i++) {
        if(response.responseText.indexOf(s[i]) != -1) {
          cb.call(thisArg,link,1); // Online
          return;
        }
      }
      cb.call(thisArg,link,0); // Offline
    }
  });
}
function OCH_ByMatchingFinalUrl(link,re,cb,thisArg) {
  // Offline if one of the RegEx [re] matches the finalUrl
  if(!Array.isArray(re)) {
    re = [re];
  }

  rq.add({
    method: "GET",
    url: link.url,
    onload: function (response){
      for(var i = 0; i < re.length; i++) {
        if(re[i].test(response.finalUrl)) { 
          // Link is offline
          cb.call(thisArg,link,0);
          return;
        }
      }
      cb.call(thisArg,link,1); // Online
    }
  });
}

var OCH = {

/*

pattern: A single RegExp or an array of RegExp
multi: An array of multihost-services that support this hoster
title: String
homepage: String/URL
check: void check(link, cb, thisArg)
  link : { url: "http://example.com/example.file", [...]  }
  cb : void thisArg.cb(link, result, errorstring)
       link : the original link object
       result: 1 -> online, 0 -> offline, -1 -> error
       errorstring: may contain error details e.g. the request result, only set if result == -1
  thisArg : The value of this provided for the call to cb. 
*/


'180upload' : {
  'pattern' : /^http:\/\/180upload\.com\/\w+$/m,
  'multi' : ['nopremium.pl'],
  'title' : '180upload',
  'homepage' : 'http://180upload.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found",cb,thisArg);
  }
},
'1fichier' : {
  'pattern' : /^https?:\/\/\w+\.1fichier\.com\/?$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : '1fichier',
  'homepage' : 'http://1fichier.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"The requested file could not be found", cb, thisArg);
  }
},
'2shared' : {
  'pattern' : /^http:\/\/www\.2shared\.com\/[a-z]+\/\w+\/?(.+\.html)?$/, 
  'multi' : ['unrestrict.li'],
  'title' : '2Shared',
  'homepage' : 'http://www.2shared.com/',
  'check' : new Function // TODO
},
'4shared' : {
  'pattern' : /^http:\/\/www\.4shared\.com\/[a-z]+\/\w+\/?(.+\.html)?$/, 
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : '2shared.com',
  'homepage' : 'http://www.4shared.com/',
  'check' : new Function // TODO
},
'4downfiles' : {
  'pattern' :/^http:\/\/4downfiles\.com\/\w+\.html$/m,
  'multi' : [],
  'title' : '4 Down Files',
  'homepage' : 'http://4downfiles.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'bayfiles' : {
  'pattern' : /^https?:\/\/(www\.)?bayfiles\.(net|com)\/file\/\w+\/.+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'BayFiles',
  'homepage' : 'http://bayfiles.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"Please check your link", cb, thisArg);
  },
},
'billionuploads' : {
  'pattern' : /^http:\/\/billionuploads\.com\/\w+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Billion Uploads',
  'homepage' : 'http://billionuploads.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not found", cb, thisArg);
  },
},
'bitshare' : {
  'pattern' : /^http:\/\/bitshare\.com\/files\/\w+\/.+\.html$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'BitShare.com',
  'homepage' : 'http://bitshare.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,["Error - File not available","Fehler - Datei nicht verfügbar"], cb, thisArg);
  },
},
'cwtv' : {
  'pattern' : /^https?:\/\/www\.cwtv\.com\/cw-video\/.+$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'CW Television Shows',
  'homepage' : 'http://www.cwtv.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,/\/cw-video\/$/, cb, thisArg);
  },
},
'dailymotion' : {
  'pattern' : /^https?:\/\/www\.dailymotion\.com\/video\/\w+.*$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'Dailymotion',
  'homepage' : 'http://www.dailymotion.com/',
  'check' :function(link,cb,thisArg) {
    OCH_ByFindingString(link,"You will be redirected to the homepage", cb, thisArg);
  },
},
'datafile' : {
  'pattern' : /^http:\/\/www\.datafile\.com\/d\/\w+.*$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'DataFile.com',
  'homepage' : 'http://www.datafile.com/',
  'check' :function(link,cb,thisArg) {
    OCH_ByFindingString(link,"ErrorCode", cb, thisArg);
  },
},
'depositfiles' : {
  'pattern' : [/^http:\/\/dfiles\.eu\/files\/\w+\/?$/m,/^http:\/\/depositfiles\.com\/files\/\w+\/?$/m],
  'multi' : [],
  'title' : 'DepositFiles',
  'homepage' : 'http://dfiles.eu',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"no_download_message", cb, thisArg);
  },
},
'expressleech' : {
  'pattern' : /^https?:\/\/(www\.)?expressleech\.com\/\w+\.html$/m,
  'multi' : [],
  'title' : 'ExpressLeech',
  'homepage' : 'http://expressleech.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'filecloud' : {
  'pattern' : /^http:\/\/filecloud\.io\/\w+(\/.*)?$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'filecloud.io',
  'homepage' : 'http://filecloud.io/',
  'check' : function(link,cb,thisArg) {
    // Ask filecloud API.
    // https://code.google.com/p/filecloud/wiki/CheckFile
    rq.add({
      method: "POST",
      url: "http://api.filecloud.io/api-check_file.api",
      data: "ukey="+encodeURIComponent(link.url.match(/filecloud\.io\/(\w+)(\/.*)?/)[1]),
      onload: function (response){
        var result = JSON.parse(response.responseText);
        if(result.status == "ok") {
          if(result.name) { 
            // Link is online
            cb.call(thisArg,link,1);
          } else {
            // Link is offline
            cb.call(thisArg,link,0);
          }
        } else {
          cb.call(thisArg,link,-1,"Strange reply from filecloud API:\n"+response.responseText);
        }
      }
    });
  },
},
'filefactory' : {
  'pattern' : /^http:\/\/www\.filefactory\.com\/file\/.+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'FileFactory',
  'homepage' : 'http://www.filefactory.com',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,/error\.php\?code\=/, cb, thisArg);
  },
},
'filemonkey' : {
  'pattern' : /^https?:\/\/www.filemonkey.in\/file\/.+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Filemonkey.in',
  'homepage' : 'https://www.filemonkey.in/',
  'check' : new Function // TODO
},
'fileom' : {
  'pattern' : /^https?:\/\/fileom\.com\/\w+.*$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'FileOM',
  'homepage' : 'http://fileom.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'fileparadox' : {
  'pattern' : /^https\:\/\/(www\.)?fileparadox\.in\/\w+.*$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'FileParadox',
  'homepage' : 'http://fileparadox.in/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'firedrive' : {
  'pattern' : /^http:\/\/www\.firedrive\.com\/file\/\w+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Firedrive',
  'homepage' : 'http://www.firedrive.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"removed_file_image", cb, thisArg);
  },
},
'freakshare' : {
  'pattern' : /^http:\/\/freakshare\.com\/files\/\w+\/.+\.html$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'FreakShare',
  'homepage' : 'http://freakshare.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,["This file does not exist","Dieser Download existiert nicht"], cb, thisArg);
  },
},
'free' : {
  'pattern' : /^http:\/\/dl\.free\.fr\/\w+$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'Free',
  'homepage' : 'http://dl.free.fr/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,["ERREUR","erreur","inexistant"], cb, thisArg);
  },
},
'gboxes' : {
  'pattern' : /^http:\/\/www\.gboxes\.com\/\w+.*$/m,
  'multi' : [],
  'title' : 'Green Boxes',
  'homepage' : 'http://www.gboxes.com/',
  'check' : function(link,cb,thisArg) { // TODO http://www.gboxes.com/?op=checkfiles
    OCH_ByFindingString(link,"The file you were looking for could not be found, sorry for any inconvenience", cb, thisArg);
  },
},
'hugefiles' : {
  'pattern' : /^http:\/\/hugefiles\.net\/\w+\/?$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'HugeFiles.net',
  'homepage' : 'http://hugefiles.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"http://www.hugefiles.net/404.html", cb, thisArg);
  },
},
'kingfiles' : {
  'pattern' : /^https?:\/\/www\.kingfiles\.net\/\w+.*$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'KingFiles.net',
  'homepage' : 'http://www.kingfiles.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"The file you were looking for could not be found, sorry for any inconvenience", cb, thisArg);
  },
},
'letitbit' : {
  'pattern' : /^https?:\/\/(\w+\.)?letitbit\.net\/download\/(\w|\.)+\/.*$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Letitbit.net',
  'homepage' : 'http://letitbit.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File not found", cb, thisArg);
  },
},
'mediafire' : {
  'pattern' : [/^https?:\/\/www\.mediafire\.com\/?\?.+$/m,/^https?:\/\/www\.mediafire\.com\/download\/.+$/m],
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'MediaFire',
  'homepage' : 'https://www.mediafire.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,/error\.php/, cb, thisArg);
  },
},
'mega' : {
  'pattern' : /^https:\/\/mega\.co\.nz\/\#\!\w+!*(\w|-)*$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'MEGA',
  'homepage' : 'https://mega.co.nz/',
  'check' : function(link,cb,thisArg) {
    // Ask mega.co.nz API
    rq.add({
      method: "POST",
      url: "https://eu.api.mega.co.nz/cs?id=0",
      data: '[{"a":"g","p":"' + link.url.match(/\#\!(\w+)\!/)[1] + '"}]',
      headers: {"Content-Type": "application/json"},
      onload: function (response){
        if(typeof JSON.parse(response.responseText)[0] == 'number') { 
          // Link is offline
          cb.call(thisArg,link,0);
        } else {
          // Link is online
          cb.call(thisArg,link,1);
        }
      }
    });
  },
},
'netload' : {
  'pattern' : [/^https?:\/\/netload.in\/\w+\/(\w|-|\.)+$/m,/^https?:\/\/netload.in\/(\w|-|\.)+\.htm$/m],
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Netload',
  'homepage' : 'https://netload.in/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"Possible causes", cb, thisArg);
  },
},
'oboom' : {
  'pattern' : /^https?:\/\/www\.oboom\.com\/\w+.*$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'OBOOM.com',
  'homepage' : 'https://www.oboom.com/',
  'check' : function(link,cb,thisArg) {
    // Ask oboom API.
    rq.add({
      method: "GET",
      url: "https://api.oboom.com/1/info?items="+encodeURIComponent(link.url.match(/oboom\.com\/(\w+)/)[1]),
      onload: function (response){
        var result = JSON.parse(response.responseText);
        if(result[0] == 200) {
          if(result[1][0].state != "online") { 
            // Link is offline
            cb.call(thisArg,link,0);
          } else {
            // Link is online
            cb.call(thisArg,link,1);
          }
        } else {
          cb.call(thisArg,link,-1,"Strange reply from oboom API:\n"+response.responseText)
        }
      }
    });
  },
},
'potload' : {
  'pattern' :/^http:\/\/potload\.com\/\w+$/m,
  'multi' : [],
  'title' : 'Potload',
  'homepage' : 'http://potload.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'rapidgator' : {
  'pattern' : [/^http:\/\/rapidgator\.net\/file\/\w+\/.+\.html$/m,/^http:\/\/rg\.to\/file\/\w+\/.+\.html$/m],
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Rapidgator.net',
  'homepage' : 'http://rapidgator.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,/article\/premium/, cb, thisArg);
  }
},
'rioupload' : {
  'pattern' : /^http:\/\/(www\.)?rioupload\.com\/\w+$/m,
  'multi' : [],
  'title' : 'RioUpload',
  'homepage' : 'http://rioupload.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'rusfolder' : {
  'pattern' : /^http:\/\/rusfolder\.com\/\d+$/m,
  'multi' : [],
  'title' : 'Rusfolder.com',
  'homepage' : 'http://rusfolder.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File not found.", cb, thisArg);
  },
},
'share-online' : {
  'pattern' : /^http:\/\/www\.share-online\.biz\/dl\/\w+$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'Share-Online',
  'homepage' : 'http://www.share-online.biz/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,["The requested file is not available","Die angeforderte Datei konnte nicht gefunden werden"], cb, thisArg);
  },
},
'sockshare' : {
  'pattern' : /^http:\/\/www\.sockshare\.com\/file\/\w+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'SockShare',
  'homepage' : 'http://www.sockshare.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,[/\?404$/,/\/deleted\.php/], cb, thisArg);
  },
},

'soundcloud' : {
  'pattern' : /^https?:\/\/soundcloud.com\/(\w|-)+\/(\w|-)+$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'SoundCloud',
  'homepage' : 'https://soundcloud.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"We can't find that track.", cb, thisArg);
  },
},

'streamcloud' : {
  'pattern' : /^http:\/\/streamcloud\.eu\/\w+$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'Streamcloud',
  'homepage' : 'http://streamcloud.org/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"Not Found", cb, thisArg);
  },
},
'turbobit' : {
  'pattern' : /^http:\/\/turbobit\.net\/\w+.*\.html$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'turbobit.net',
  'homepage' : 'http://turbobit.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File not found", cb, thisArg);
  },
},
'tusfiles' : {
  'pattern' : /^http:\/\/www\.tusfiles\.net\/\w+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'TusFiles',
  'homepage' : 'http://tusfiles.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"The file you are trying to download is no longer available", cb, thisArg);
  },
},
'ultrafile' : { 
  'pattern' : /^http:\/\/ultrafile\.me\/\w+\/(\w|-|\.)+\.html$/m,
  'multi' : [],
  'title' : 'Ultrafile.me',
  'homepage' : 'http://ultrafile.me/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"The file was removed by administrator", cb, thisArg);
  },
},
'unlimitzone' : {
  'pattern' : /^http:\/\/unlimitzone\.com\/\w+.*$/m,
  'multi' : [],
  'title' : 'Unlimit Zone',
  'homepage' : 'http://unlimitzone.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'uploadable' : {
  'pattern' : /^http:\/\/www\.uploadable\.ch\/file\/\w+\/(\w|-|\.)+$/m,
  'multi' : [],
  'title' : 'Uploadable.ch',
  'homepage' : 'http://www.uploadable.ch/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"This file is no longer available", cb, thisArg);
  },
},
'uploadboy' : {
  'pattern' : /^http:\/\/(www\.)?uploadboy\.com\/\w+\.html$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Uploadboy.com',
  'homepage' : 'http://uploadboy.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"File Not Found", cb, thisArg);
  },
},
'uploaded' : {
  'pattern' : [/^https?:\/\/uploaded\.(net|to)\/file\/.+$/m,/^http:\/\/ul\.to\/.+$/m],
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'uploaded.net',
  'homepage' : 'http://uploaded.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByMatchingFinalUrl(link,[/uploaded\.net\/404/,/uploaded\.net\/410/], cb, thisArg);
  },
},
'uploading' : {
  'pattern' : new RegExp("abc"), // TODO ,
  'multi' : ['nopremium.pl'],
  'title' : 'Uploading.com',
  'homepage' : 'http://uploading.com/',
  'check' : new Function // TODO
},
'uploadrocket' : {
  'pattern' : /^http:\/\/uploadrocket\.net\/\w+\/(\w|-|\.)+\.html$/m,
  'multi' : [],
  'title' : 'UploadRocket.net',
  'homepage' : 'http://uploadrocket.net/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"The file was removed by administrator", cb, thisArg);
  },
},
'uppit' : {
  'pattern' : /^http:\/\/uppit\.com\/\w+(\/.*)?$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'UppIT',
  'homepage' : 'http://uppit.com/',
  'check' : new Function // TODO
},
'uptobox' : {
  'pattern' : /^http:\/\/uptobox.com\/\w+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'Uptobox',
  'homepage' : 'http://uptobox.com/',
  'check' : new Function // TODO
},
'vevo' : { 
  'pattern' : /^https?:\/\/www\.vevo\.com\/watch\/.+$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'VEVO',
  'homepage' : 'https://www.vevo.com/',
  'check' : function(link,cb,thisArg) {
    // At the moment there seems to be no straightforward way to get the online/offline status
    cb.call(thisArg,link,1); // Online
  }
},
'vimeo' : { 
  'pattern' : /^https?:\/\/vimeo\.com\/(.+\/)?\d+\/?$/m,
  'multi' : ['unrestrict.li'],
  'title' : 'Vimeo',
  'homepage' : 'https://vimeo.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"Page not found", cb, thisArg);
  },
},
'vipfile' : {  // TODO: nopremium.pl lists this hoster as "vip-file"
  'pattern' : /^http:\/\/\w+.vip-file.com\/downloadlib\/.*$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'VIP-file',
  'homepage' : 'http://vip-file.com/',
  'check' : new Function // TODO
},
'youtube' : {
  'pattern' : /^https?:\/\/www\.youtube\.com\/watch(\?v=|\/).+$/m,
  'multi' : ['nopremium.pl','unrestrict.li'],
  'title' : 'YouTube',
  'homepage' : 'https://www.youtube.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"<title>YouTube</title>", cb, thisArg);
  },
},
'xerver' : {
  'pattern' : /^http:\/\/xerver\.co\/\w+.*$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'XERVER',
  'homepage' : 'http://xerver.co/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"If you believe that this is an error", cb, thisArg);
  },
},
'zippyshare' : {
  'pattern' : /^http:\/\/www\d*\.zippyshare\.com\/v\/\d+\/file\.html$/m,
  'multi' : ['nopremium.pl'],
  'title' : 'Zippyshare.com',
  'homepage' : 'http://www.zippyshare.com/',
  'check' : function(link,cb,thisArg) {
    OCH_ByFindingString(link,"does not exist", cb, thisArg);
  }
}


}