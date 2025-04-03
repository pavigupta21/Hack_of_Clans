import {create} from 'zustand'; 
import axios from 'axios'; 

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/hackofclans" : "/api/hackofclans"; 

axios.defaults.withCredentials = true ;

export const useClanStore = create((set) => ({
    user : null, 
    isAuthenticated:false, 
    error:null, 
    isLoading:false, 
    isCheckingAuth:true, 
    message: null,
    skills: [],
    personal_Info: {bio: null, college: null},
    personal_links: {github_link: null, linkdin_link: null, portfolio_link: null},
    userTeams: [], 

    signup: async(email, password, name) => {
        set({isLoading:true, error:null}); 
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name});
            set ({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading: false}); 
            throw error; 
        }
    },

    verifyEmail: async(code) => {
        set({isLoading:true, error: null}); 
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code }); 
            set({user : response.data.user, isAuthenticated : true, isLoading : false}); 
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading: false}); 
            throw error ;
        }
    },

    checkAuth: async() => {
        set({isCheckingAuth: true, error: null}); 
        try {
            const response = await axios.get(`${API_URL}/check-auth`); 
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false});
        }
    },

    logout: async() => {
        set({isLoading: true, error: null}); 
        try {
            await axios.post(`${API_URL}/logout`); 
            set({user: null, isAuthenticated: false, error: null, isLoading: false});
        } catch (error) {
            set({error: "Error logging out", isLoading: false}) 
            throw error; 
        }
    },

    login: async(email, password) => {
        set({isLoading: true, error: null}); 
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password}); 
            set({
                isAuthenticated: true,
                user: response.data.user, 
                error: null , 
                isLoading: false,
            })
        } catch (error) {
            set({error: error.response?.data?.message || "Error logging in", isLoading: false}); 
            throw error; 
        }
    },

    ForgotPassword: async(email) => {
        set({isLoading: true, error: false}); 
        try {
          const response = await axios.post(`${API_URL}/forgot-password`, {email}); 
          set({message: response.data.message, isLoading: false});   
        } catch (error) {
            set({
                isLoading: false, 
                error: error.message.data.message || "Error sending reset password email",
            }); 
            throw error; 
        }
    },

    resetPassword: async(token, password) => {
        set({isLoading: true, error : null})
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {password})
            set({isLoading: false, message: response.data.message})
        } catch (error) {
            set({
                isLoading: false, 
                error: error.response.data.message || "Error resetting password"
            });
            throw error;
        }
    },

    googleLogin: async (code) => {
        set({ isLoading: true, error: null });
        try {
            console.log("Code is : ",code)
          const response = await axios.get(`${API_URL}/google?code=${code}`);
          console.log("Response from sever is :: ", response);
          console.log(response.data);
          set({  
            isAuthenticated: true,
            user: response.data,
            error: null,
            isLoading: false });
        } catch (error) {
          set({ error: error.response?.data?.message || "Google login failed", isLoading: false });
          throw error;
        }
    },

    removeskill: ({ skillname }) => {
        set((state) => ({
            skills: state.skills.filter(skill => skill.skillname !== skillname)
        }));
    },

    addskill: ({ skillname, level }) => {
        set((state) => ({
            skills: [...state.skills, { skillname, level }] 
        }));
    },

    update_personal_info: (bio, college) => {
        set({
            personal_Info: {bio: bio, college: college}
        })
    },

    update_personal_links: (github, linkdin, webstite) => {
        set({personal_links: {github_link: github, linkdin_link: linkdin, portfolio_link: webstite}})
    },

    startupSubmit: async(user, skills, personal_Info, personal_links, password ) =>{
        set({isLoading: true, error: null})
        try {
            console.log("Backend will recieve: ",
                user,
                skills,
                personal_Info,
                personal_links,
                password 
            )

            const response = await axios.post(`${API_URL}/startup-page`, {user, skills, personal_Info, personal_links, password});
            // console.log("responser is :", response);
            // console.log("response user is :", response.data.update_user);
            set({
                isLoading:false,
                user: response.data.update_user,
                error: null,
            })
        } catch (error) {
            set({error: error.response?.data?.message || "Error logging in", isLoading: false}); 
            throw error; 
        }
    },

    getUserTeams: async(userId) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/teams/getteams`, {userId}) ;
            console.log(response);
            set({
                isLoading: false,
                userTeams: response.data.teams, 
                error: null
            })
        } catch (error) {
            set({error: error.response?.data?.message || "Error getting your teams ", isLoading: false}); 
            throw error;
        }
    }



}));