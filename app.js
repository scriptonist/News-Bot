var builder = require('botbuilder');
var restify = require('restify');
var dotenv = require('dotenv');
var api = require('./api.js');
dotenv.load();

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "19f937b8-8b74-49de-9727-29907d0b9714",
    appPassword: "pfzNNpczvAnr6HFSvGig1hT"
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [function (session) {
    builder.Prompts.choice(session, "What Do u Like ??", "Menu|News Search");
},
function(session,results){
    if(results.response){
        if(results.response.entity == "Menu")
            session.beginDialog('/newscategories');
    }

}]);

bot.dialog("/newscategories",[
    function(session){
    builder.Prompts.choice(session,"Sections","General|Sports|Bussiness|Entertaintment|Health");
    },
function(session,results){
   if(results.response){
        if(results.response.entity == "General"){
            
            session.beginDialog("/GeneralNews");
        }
        else if(results.response.entity == "Sports"){
            //Fetch Sports

        }
        else if(results.response.entity == "Bussiness"){
            //Fetch Bussiness News
                
        }
        else if(results.response.entity == "Entertaintment"){
            //Fetch Entertaintment News
                
        }
        else if(results.response.entity == "Health"){
            //Fetch Health News
                
        }
        
         
        
    } 
    
}]
);

bot.dialog('/GeneralNews',[
    function(session){
    builder.Prompts.choice(session,"Sections","Kerala|India|International");
    
    },
    function(session,results){
        if(results.response){
            if(results.response.entity == "Kerala")
            {
                api.getArticles("en","","","news_kerala",function(data){
                    api.getArticleDetails("en",data["articleSummary"][0]['articleID'],function(data2){
                         var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(data2['title'])
                            .subtitle(data2['authorname'])
                            .text(data2["imageDescription"])
                            .images([
                                builder.CardImage.create(session, data2['thumbnail'])
                            ])
                            .tap(builder.CardAction.openUrl(session, data2['articleURL']))
                    ]);

                         session.send(msg);
                    });

                   
                });
            }
        }
        session.endDialog();
    }
]);