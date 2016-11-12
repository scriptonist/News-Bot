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
    builder.Prompts.choice(session, "Hi I'm the Manorama Bot!.These are the things i can do!", "Menu|Search");
},
function(session,results){
    if(results.response){
        if(results.response.entity == "Menu")
            session.beginDialog('/newscategories');
        if(results.response.entity == "Search")
            session.beginDialog('/newssearch');
    }

}]);

bot.dialog("/newssearch",[
    function(session){
        builder.Prompts.text(session, "What should i search for ?");
    },
    function(session,results){
        session.userData.query = results.response;
        api.search("en","all",session.userData.query,"","","",function(data2){
            for(var i=0;i<3;i++){
                     var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(data2['articles'][i]['title'])
                            .subtitle(data2['articles'][i]['lastmodified'])
                            .text(data2['articles'][i]["imageDescription"])
                            .images([
                                builder.CardImage.create(session, data2['articles'][i]['thumbnail'])
                            ])
                            .tap(builder.CardAction.openUrl(session, data2['articles'][i]['articleURL']))
                    ]);

                 session.send(msg);
            }
        });
       
       session.endConversation(); 
    }
]);


bot.dialog("/newscategories",[
    function(session){
    builder.Prompts.choice(session,"What would you like to read about ?","General|Sports|Bussiness|Entertaintment|Health");
    },
function(session,results){
   if(results.response){
        if(results.response.entity == "General"){
            
            session.beginDialog("/GeneralNews");
        }
        else if(results.response.entity == "Sports"){
            session.beginDialog("/SportsNews");

        }
        else if(results.response.entity == "Bussiness"){
            session.beginDialog("/Bussiness");
                
        }
        else if(results.response.entity == "Entertaintment"){
            //Fetch Entertaintment News
            session.beginDialog("/EntertaintmentNews");
                
        }
        else if(results.response.entity == "Health"){
            //Fetch Health News
            session.beginDialog("/HealthNews");
                
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
            if(results.response.entity == "India")
            {
                api.getArticles("en","","","news_nation",function(data){
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
            if(results.response.entity == "International")
            {
                api.getArticles("en","","","news_world",function(data){
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

bot.dialog('/SportsNews',[
    function(session){
    builder.Prompts.choice(session,"Sections","Cricket|Football|Others");
    
    },
    function(session,results){
        if(results.response){
            if(results.response.entity == "Cricket")
            {
                api.getArticles("en","","","sports_cricket",function(data){
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
            if(results.response.entity == "Football")
            {
                api.getArticles("en","","","sports_football",function(data){
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
            if(results.response.entity == "Others")
            {
                api.getArticles("en","","","sports_other-sports",function(data){
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


bot.dialog('/Bussiness',[
    function(session){
    builder.Prompts.choice(session,"Sections","General|Gadgets|Autos|Companies");
    
    },
    function(session,results){
        if(results.response){
            if(results.response.entity == "General")
            {
                api.getArticles("en","","","business_news",function(data){
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
            if(results.response.entity == "Gadgets")
            {
                api.getArticles("en","","","business_gadgets",function(data){
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
            if(results.response.entity == "Autos")
            {
                api.getArticles("en","","","business_autos",function(data){
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
            if(results.response.entity == "Companies")
            {
                api.getArticles("en","","","business_companies",function(data){
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

bot.dialog('/EntertaintmentNews',[
    function(session){
    builder.Prompts.choice(session,"Sections","General|Music|Movies|Art");
    
    },
    function(session,results){
        if(results.response){
            if(results.response.entity == "General")
            {
                api.getArticles("en","","","entertainment_entertainment-news",function(data){
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
            if(results.response.entity == "Music")
            {
                api.getArticles("en","","","entertainment_music",function(data){
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
            if(results.response.entity == "Movies")
            {
                api.getArticles("en","","","entertainment_movie-review",function(data){
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
            if(results.response.entity == "Art")
            {
                api.getArticles("en","","","entertainment_art-and-culture",function(data){
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

bot.dialog('/HealthNews',[
    function(session){
    builder.Prompts.choice(session,"Sections","MentalHealth|Ayurveda|Nutrition|Fitness");
    
    },
    function(session,results){
        if(results.response){
            if(results.response.entity == "MentalHealth")
            {
                api.getArticles("en","","","wellness_mental-health",function(data){
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
            if(results.response.entity == "Ayurveda")
            {
                api.getArticles("en","","","wellness_ayurveda",function(data){
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
            if(results.response.entity == "Nutrition")
            {
                api.getArticles("en","","","wellness_diet-\u0026-nutrition",function(data){
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
            if(results.response.entity == "Fitness")
            {
                api.getArticles("en","","","wellness_fitness",function(data){
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
