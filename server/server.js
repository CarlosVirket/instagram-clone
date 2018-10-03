// server/server.js

let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");

let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);

    let userslist = {
        a: {
          id: "a",
          nickname: "Carlos",
          avatar: "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/25398931_10155239626776134_1765079753927372504_n.jpg?_nc_cat=107&oh=aaad33917d23bac3992e991b4f83b60e&oe=5C54602A"
        },

        b: {
            id: "b",
            nickname: "Luis",
            avatar:
              "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/24296836_10155198628571134_2937016967775949336_n.jpg?_nc_cat=109&oh=49c42307df97e0a55d17902fdfab1cf3&oe=5C509060"
          }
        
      };
      let postslist = {
        a: {
          a: {
            id: "a",
            user: userslist["a"],
            caption: "Estadio Akron",
            image: "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29027215_10155457778216134_3096437606691373056_n.jpg?_nc_cat=107&oh=4c566ace81f409c3b6bd1b309980e8f1&oe=5C62E377"
          },
          b: {
            id: "b",
            user: userslist["a"],
            caption: "Estadio Akron 2",
            image:
              "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29027215_10155457778216134_3096437606691373056_n.jpg?_nc_cat=107&oh=4c566ace81f409c3b6bd1b309980e8f1&oe=5C62E377"
          },
          c: {
            id: "c",
            user: userslist["a"],
            caption: "Estadio Akron pof fuera",
            image: "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29066998_10155457778491134_5325375360999620608_n.jpg?_nc_cat=110&oh=df26d77dbb15929c853228424823d833&oe=5C4E6C90"
          },
          d: {
            id: "d",
            user: userslist["a"],
            caption: "Evento",
            image: "https://scontent.fmex6-1.fna.fbcdn.net/v/t1.0-9/29062958_10155457778066134_4494707924081311744_n.jpg?_nc_cat=101&oh=e76b972a6b067285aed81e28fd141bd5&oe=5C517370"
          }
        }
      };

      let root = {
        user: function({ id }) {
          return userslist[id];
        },
        post: function({ user_id, post_id }) {
          return postslist[user_id][post_id];
        },
        posts: function({ user_id }) {
          return Object.values(postslist[user_id]);
        }
      };
      
      // Configure Pusher client
      let pusher = new Pusher({
        appId: "PUSHER_APP_ID",
        key: "PUSHER_APP_KEY",
        secret: "PUSHER_APP_SECRET",
        cluster: "PUSHER_APP_CLUSTER",
        encrypted: true
      });
      
      // create express app
      let app = express();
      app.use(cors());
      app.use(bodyParser.json());
      
      let multipartMiddleware = new Multipart();
      
      app.use(
        "/graphql",
        graphqlHTTP({
          schema: schema,
          rootValue: root,
          graphiql: true
        })
      );
      
      // trigger add a new post 
      app.post('/newpost', multipartMiddleware, (req,res) => {
        // create a sample post
        let post = {
          user : {
            nickname : req.body.name,
            avatar : req.body.avatar
          },
          image : req.body.image,
          caption : req.body.caption
        }
        
        // trigger pusher event 
        pusher.trigger("posts-channel", "new-post", { 
          post 
        });
      
        return res.json({status : "Post created"});
      });
      
      
      app.listen(4000);
      console.log("Running a GraphQL API server at localhost:4000/graphql");