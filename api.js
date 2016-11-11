// Export Modules
/*-----------------------------------------------------------------*/

var nodeRestClient = require('node-rest-client').Client;

/*-----------------------------------------------------------------*/
var restClient = new nodeRestClient();
var authKey = "9d605cdb-0913-5809-8eea-78e789eaec41";
/*------------------------------------------------------------------*/

var makeApiCall = function(restUrl,callback){
    var  args  =  {
                     headers:  {
                         Accept: "application/json",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US, en-IN; q=0.7, en; q=0.3",
                            Authorization:authKey,
                            Cookie: "_ga=GA1.2.1995141337.1476460835; __auc=b318a360157c3eca17dde1b253e; _em_vt=8da088292fdeb990fb9bfcd10f8c580101355783c2-29727135581df14b; s_fid=50066D2F3D2FAD33-08B3643C39A74E23; s_nr=1478357773880-Repeat; s_lv=1478357773885; s_vnum=1507996859013%26vn%3D3; AWSALB=rnS49BKKyPnf26Z9e2gY7D0s3DTzAwC/9F/uWDQqqw8KMGzyvcv98tf0t6idQkQ95Of3Lj3/xNzyfit8PCix6OPfFtKKY67TjJ7+qA+hrQMYoMKJwK4GqQAmIOOR",
                            Host: "developer.manoramaonline.com",
                            Referer: "https://developer.manoramaonline.com/doc/",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393",
                         } // request headers 
    };
    restClient.get("https://developer.manoramaonline.com/"+restUrl,args,
    function (data, response) {
        data = JSON.parse(data.toString());
        callback(data);
    });
}


module.exports={
    getEditions:function(callback){
        var restUrl = "api/editions";
        makeApiCall(restUrl,callback);
    },
    getEditionDetails:function(editionCode,callback){
        editionCode = editionCode || "";
        console.log(editionCode);
        var restUrl = "api/editions/"+editionCode;
        makeApiCall(restUrl,callback);
    },
    getSections:function(editionCode,callback){
        editionCode = editionCode || "";
        var restUrl = "api/editions/"+editionCode+"/sections";
        makeApiCall(restUrl,callback);
    },
    getArticles:function(editionCode,page,size,sectionCode,callback){
        editionCode = editionCode || "";
        page = page || "";
        size = size || "";
        if(page != "" && size != "")
            var restUrl =  "api/editions/"+editionCode+"/sections/"+sectionCode+"/articles?"+"page="+page+"&size="+size;
        else if(page !="")
            var restUrl =  "api/editions/"+editionCode+"/sections/"+sectionCode+"/articles?"+"page="+page;
        else if(size !="")
            var restUrl =  "api/editions/"+editionCode+"/sections/"+sectionCode+"/articles?"+"size="+size;
        else
            var restUrl =  "api/editions/"+editionCode+"/sections/"+sectionCode+"/articles";
        console.log(restUrl);
        makeApiCall(restUrl,callback);
    },
     getArticleDetails:function(editionCode,articleId,callback){
        var restUrl = "api/editions/"+editionCode+"/articles/"+articleId; 
        makeApiCall(restUrl,callback);
    },
    search:function(editionCode,type,term,section,page,size,callback){
        
        if(type != "all" && term != "" && section != "" && page != "" && size != ""){
            restUrl = "api/editions/en/search?type="+type+"&term="+term+"&section="+section+"&page="+page+"&size="+size;
        }
        else if(term != ""){
            restUrl = "api/editions/en/search?type="+type+"&term="+term;
        }
        else if(section != ""){
            restUrl = "api/editions/en/search?type="+type+"&section="+section;
        }
        else if(page != ""){
            restUrl = "api/editions/en/search?type="+type+"&page="+page;
        }
        else if(size != ""){
            restUrl = "api/editions/en/search?type="+type+"&size="+size;
        }
         else if(term != ""  && section != "" ){
            restUrl = "api/editions/en/search?type="+type+"&term="+term+"&section="+section;
        }
        else if(term != ""  && page != "" ){
            restUrl = "api/editions/en/search?type="+type+"&term="+term+"&page="+page;
        }
        else if(term != ""  && size != "" ){
            restUrl = "api/editions/en/search?type="+type+"&term="+term+"&size="+page;
        }
        else if(section != ""  && page != "" ){
            restUrl = "api/editions/en/search?type="+type+"&section="+section+"&page="+page;
        }
        else if(section != ""  && size != "" ){
            restUrl = "api/editions/en/search?type="+type+"&section="+section+"&size="+size;
        }
         else if(page != "" && size != ""){
            restUrl = "api/editions/en/search?page="+type+"&size="+page;
        }
        else{
            var restUrl = "/api/editions/"+editionCode+"/search?type=all";
        }
         makeApiCall(restUrl,callback);
    }

}