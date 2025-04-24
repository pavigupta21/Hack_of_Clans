import {create} from 'zustand'; 
import axios from 'axios';import { useClanStore } from './clan.store';
 ;

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/hackofclans" : "/api/hackofclans"; 

axios.defaults.withCredentials = true ;

export const useChatStore =  create((set,get) => ({
  selectedTeam : "" , 
  teamMessages: [], 
  selectedTeamName : "",
  text : "",
  imageUrl : "", 
  isteamLoaing: false,
  teamMembers: [],
  leader: "",
  activeTeamDetails: null, 
  userNotifications: [],
  selectedTeamDet: "",


  setSelectedTeam: (teamId) => {
    set(() => ({ selectedTeam: teamId }));
    try {


      const socket = useClanStore.getState().socket;

      if (!socket) {
        console.log("No ka socket hi nahi hai.");
        return;
      }
      //Note: socket connect hone se pehle emit nahi karooooo 
      if (!socket.connected) {
        socket.on("connect", () => {
          console.log("Socket connected, now joining room:", teamId);
          socket.emit("join-room", teamId);
        });
      } else {
        console.log("Socket already connected. Joining room:", teamId);
        socket.emit("join-room", teamId);
      }
  
    } catch (error) {
      console.log("Error in setSelectedTeam:", error);
    }
  },

  fetchActiveTeam : async({selectedTeam, userId}) => {
    set({isteamLoaing: true})
    try {
      if(!selectedTeam){
        set({
          isteamLoaing: false , 
        })
        return; 
      }
      const response = await axios.post(`${API_URL}/messages/get-messages`, {userId: userId, teamId: selectedTeam}) 
      // console.log(response.data.Team.teamName)
      const res = await axios.post(`${API_URL}/messages/get-team-users`, {teamId: selectedTeam}); 
      console.log("team users: ",res.data)
      // console.log("Teams members : " , res.data.teamMembers)
      set({
        isteamLoaing: false,
        teamMessages: response.data.Messages,
        selectedTeamName: response.data.Team.teamName,
        teamMembers: res.data.teamMembers, 
        leader: res.data.leader,
        activeTeamDetails: res.data.teamDetails,
        selectedTeamDet: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }, 

  sendMessage: async({userId, teamId, text, image}) => {
    set({isteamLoaing: true})
    try {
      const response = await axios.post(`${API_URL}/messages/send`, {userId, teamId, text, image})
      console.log("send message res :",response)
      set({
        isteamLoaing: false
      })
    } catch (error) {
      console.log(error);
    }
  },

  getLatestMessages: () => {
    const {selectedTeam} = get(); 
    if(!selectedTeam) return ; 

    const socket = useClanStore.getState().socket; 

    socket.off("LatestMessage"); // this is done to prevent duplicate listners 

    socket.on("LatestMessage", (LatestMessage) => {
      const isMessageFromSelectedUser = LatestMessage.receieverId  === selectedTeam;

      if(!isMessageFromSelectedUser){
        // will implement unread message wala part as well 
        // for now i will retunr 
        return ;
      }
      set({
        teamMessages: [...get().teamMessages, LatestMessage]
      })
    })

  },

  getNotification: async({userId}) => {
    try {
      
      const response = await axios.post(`${API_URL}/messages/get-notifications` , {userId})
      console.log("notifications : ",response);

      set({
        userNotifications: response.data.userNotifications
      })

    } catch (error) {
      
    }
  }

}))

