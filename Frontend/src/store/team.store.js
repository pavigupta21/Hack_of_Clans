import { create } from 'zustand'; 
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/hackofclans" 
  : "/api/hackofclans";

export const useTeamStore = create((set, get) => ({
  teams: [],
  isLoading: false,
  error: null,
  

  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/teams`);
      set({ teams: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  createTeam: async (teamData) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/teams/createteam`, teamData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // const { userTeams } = useClanStore()
        // console.log(userTeams);
        
        
        set(state => ({
            teams: [...state.teams, response.data.team],
            isLoading: false
        }));
        
        return { success: true, team: response.data.team };
    } catch (error) {
        set({ 
            error: error.response?.data?.message || error.message, 
            isLoading: false 
        });
        return { success: false, error: error.response?.data?.message || error.message };
    }
},

  updateTeamLogo: async (teamId, logoFile) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('logo', logoFile);
      
      const response = await axios.patch(
        `${API_URL}/teams/${teamId}/logo`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      set(state => ({
        teams: state.teams.map(team => 
          team._id === teamId ? response.data.team : team
        ),
        isLoading: false
      }));
      
      return { success: true, team: response.data.team };
    } catch (error) {
      console.error("Error updating team logo:", error);
      set({ 
        error: error.response?.data?.message || error.message, 
        isLoading: false 
      });
      return { success: false };
    }
  },

  joinTeam: async (teamId, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/teams/${teamId}/join`, 
        { userId }
      );
      set(state => ({
        teams: state.teams.map(team => 
          team._id === teamId ? response.data.team : team
        ),
        isLoading: false
      }));
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
      return { success: false };
    }
  },

  inviteMember: async ({userId, teamId}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/teams/send-invitation`, { userId, teamId });
      set({ isLoading: false });
      console.log("response : ",response);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.log("error : ",error);
      
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false
      });
      return { success: false };
    }
  },

  acceptInvitation: async(userId, teamId) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Accept invitation called : ");
      
      const response = await axios.post(`${API_URL}/teams/accept-invitation`, { userId, teamId });
      // console.log("res :", response);
      set({ isLoading: false });
      toast.success("Join the team !")
      return { success: true, data: response.data };
    } catch (error) {
      console.log("error : ",error);
      
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false
      });
      return { success: false };
    }
  },

  sendRequest: async(userId, teamId) => {
    try {
      const response = await axios.post(`${API_URL}/teams/joinreq`, {userId, teamId}); 

      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  },
  
  acceptReq: async(userId, teamId) => {
      try {
        const response = await axios.post(`${API_URL}/teams/acceptreq`, {userId, teamId})
        console.log("Accpt req", response);
        
      } catch (error) {
        console.log(error);
      }
  },

  reset: () => set({ teams: [], isLoading: false, error: null })
}));