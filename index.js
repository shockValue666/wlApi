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
  console.log("userid: ",userId)
  const guildMemberURL = `https://discord.com/api/guilds/${guildId}/members/${userId}`;
  console.log("guildMemberURL: ",guildMemberURL)
  const mem = await request(guildMemberURL,{method:"GET",headers})
  console.log("mem: ",mem)
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

