import * as dotenv from 'dotenv'
dotenv.config();


import { request } from 'undici'
import express from 'express'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;


// const userId = "957874443433160765";
const guildId = process.env.guildId;
const bot_token =
  process.env.botToken;

// const guildMemberURL = `https://discord.com/api/guilds/${guildId}/members/${userId}`;
const guidlRolesURL = `https://discord.com/api/guilds/${guildId}/roles`;

const headers = {
  authorization: `Bot ${bot_token}`,
};

app.use(cors({
    origin: '*'
}));

app.get("/:id",async (req,res)=>{
  // res.send("Hello world");
  // let wlId = "1034140284935749693"
  let wlId = process.env.wlId
  let hasRole=false;
  // const result = await request(guidlRolesURL,{method:"GET",headers})
  // const body = await result.body.json()
  // console.log("results: ",body)

  const userId = req.params.id;
  // console.log("userid: ",userId)
  const guildMemberURL = `https://discord.com/api/guilds/${guildId}/members/${userId}`;
  // console.log("guildMemberURL: ",guildMemberURL)
  const mem = await request(guildMemberURL,{method:"GET",headers})
  // console.log("mem: ",mem)
  const members = await mem.body.json()
  console.log("members: ",members)
  if(members.roles){
    members.roles.map(memberRole=>{
      console.log("memberRole: ",memberRole, " wlId: ", wlId)
      if(memberRole==wlId){
        hasRole=true;
        // res.json(hasRole)
      }
    })
  }

  res.json(hasRole)
})


app.get("/isInServer/:id",async (req,res)=>{
  let isInServer=false;
  const userId = req.params.id;
  const specimenId = process.env.specimenId;
  const guildMemberURL = `https://discord.com/api/guilds/${guildId}/members/${userId}`;
  // console.log("guildMemberURL: ",guildMemberURL)
  const mem = await request(guildMemberURL,{method:"GET",headers})
  // console.log("mem: ",mem)
  const members = await mem.body.json()
  console.log("members: ",members)

  if(members.roles){
    members.roles.map(memberRole=>{
      console.log("memberRole: ",memberRole, " specimenId: ", specimenId)
      if(memberRole==specimenId){
        isInServer=true;
        // res.json(hasRole)
      }
    })
  }

  res.json(isInServer)


})


app.get("/addRole/:id",async (req,res)=>{
  let wlId = process.env.wlId
  let hasRole;


  const moreHeaders = {
    authorization: `Bot ${bot_token}`,
     "Content-Type": "application/json",
  };


  //wl id = id of lablisted

  //id of test role = 1054914485464350740
  const userId = req.params.id;
  console.log("userid: ",userId)
  const url = `https://discord.com/api/guilds/978311819384987688/members/${userId}/roles/${wlId}`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${bot_token}`,
        'Content-Type': 'application/json',
      }
    };

    request(url, options)
      .then((_res) => {
        if (_res.statusCode == 204) {
          console.log(`${userId}: ✔`);
          res.json(true)
          return true;
        } else {
          console.log(`${userId}: ✘`);
          console.log("res: ",res.body)
          res.json(false)
          return false;
        }
      })
      .catch((error) => {
        console.log(`${userId}: ✘`);
        console.error("error: ",error);
        res.json(false)
        return false;
      });

      console.log("hasrole: ",hasRole)
})



app.get("/",(req,res)=>{
  res.json(false);
})




app.listen(port,()=>{
  console.log("listening on port: ",port)
})


// console.log('response received', body)
// // Get Server Roles
// fetch(guidlRolesURL, {
//   method: "GET",
//   headers,
// })
//   .then((res) => res.json())
//   .then((roles) => {
//     // Get User
//     fetch(guildMemberURL, {
//       method: "GET",
//       headers,
//     })
//       .then((res) => res.json())
//       .then((user) => {
//         // Map Server Roles to User Roles
//         const userRoles = roles
//           .filter((r) => user.roles.includes(r.id)) // Match roles with user roles
//           .map((r) => r.name); // Get only names

//         console.log(userRoles);
//       });
//   });

