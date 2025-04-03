import {create} from 'zustand'; 
import axios from 'axios'; ;

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/hackofclans" : "/api/hackofclans"; 

axios.defaults.withCredentials = true ;

export const useChatStore =  create((set) => ({
  selectedTeam : "" , 
  teamMessages: [], 
  selectedTeamName : "",
  text : "",
  imageUrl : "", 
  isteamLoaing: false,
  teamMembers: [],
  leader: "",

  setSelectedTeam: (teamId) => {
    set(() => ({ selectedTeam: teamId }));
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
      // console.log("team users: ",res.data)
      // console.log("Teams members : " , res.data.teamMembers)
      set({
        isteamLoaing: false,
        teamMessages: response.data.Messages,
        selectedTeamName: response.data.Team.teamName,
        teamMembers: res.data.teamMembers, 
        leader: res.data.leader
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
  }

}))