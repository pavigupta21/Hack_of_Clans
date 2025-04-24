import {create} from 'zustand'; 
import axios from 'axios'; 
import {io} from 'socket.io-client'
import toast from 'react-hot-toast';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/hackofclans" : "/api/hackofclans"; 

axios.defaults.withCredentials = true ;

export const useClanStore = create((set, get) => ({
    user : null, 
    isAuthenticated:false, 
    error:null, 
    isLoading:false, 
    isCheckingAuth:true, 
    message: null,
    profilePic: "",
    skills: [],
    personal_Info: {bio: null, college: null},
    personal_links: {github_link: null, linkdin_link: null, portfolio_link: null},
    userTeams: [],
    socket: null, 

    signup: async(email, password, name) => {
        set({isLoading:true, error:null}); 
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name});
            get().connectSocket();
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
            console.log("check auth ke andar hu mein..");
            get().connectSocket();

            console.log(response , "res in check auth ")

            set({user: response.data.user,
                isAuthenticated: true,
                skills: response.data.user.skills,
                personal_Info: {bio: response.data.user.personal_info.bio, college: response.data.user.personal_info.college},
                personal_links: {github_link: response.data.user.personal_links.github_link,
                                 linkdin_link: response.data.user.personal_links.linkdin_link, 
                                 portfolio_link: response.data.user.personal_links.portfolio_link},
                profilePic: response.data.user.profilePic,
                isCheckingAuth: false});
        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false});
        }
    },

    logout: async() => {
        set({isLoading: true, error: null}); 
        try {
            await axios.post(`${API_URL}/logout`); 
            get().disconnectSocket();
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
            console.log("login ke andar huu...");
            get().connectSocket(); 
            set({
                isAuthenticated: true,
                user: response.data.user,
                skills: response.data.user.skills, 
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
          get().connectSocket();
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

            const response = await axios.post(`${API_URL}/startup-page`, {user, skills, personal_info:personal_Info, personal_links, password});
            console.log("responser is :", response);
            console.log("response user is :", response.data.update_user);
            set({
                isLoading:false,
                user: response.data.update_user,
                error: null,
                skills: response.data.update_user.skills,
                personal_Info: {bio: response.data.update_user.personal_info.bio, college: response.data.update_user.personal_info.college},
                personal_links: {github_link: response.data.update_user.personal_links.github_link,
                                 linkdin_link: response.data.update_user.personal_links.linkdin_link, 
                                 portfolio_link: response.data.update_user.personal_links.portfolio_link},
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
            console.log("getUserTeams called : ",response);
            set({
                isLoading: false,
                userTeams: response.data.teams, 
                error: null
            })
        } catch (error) {
            set({error: error.response?.data?.message || "Error getting your teams ", isLoading: false}); 
            throw error;
        }
    },

    connectSocket: () => {

        const {isAuthenticated} = get(); 
        if(!isAuthenticated || get().socket?.connected) return ;
        console.log("connect socket ke andar hu mein ...")

        const socket = io("http://localhost:5000", {
        withCredentials: true,
        });
        socket.connect()

        set({
            socket: socket 
        })
    }, 

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },

    updateProfile: async(user, skills, personal_Info, personal_links, profilePic ) => {
        // console.log("in update profile recieved the followign data" ); 
        // console.log(user);
        // console.log(skills);
        // console.log("p_links",personal_links);
        // console.log("P_INFO",personal_Info);
        // console.log(profilePic); 
        set({
            isLoading:true
        })

        const response = await axios.post(`${API_URL}/update-profile`, {user, skills, personal_Info, personal_links, profilePic}); 

        // console.log("update pfodile : ",response)
        // console.log("update pfodile 22 : ",response.data.imageUrl)
        
        set({
            user : response.data.user,
            skills: response.data.user.skills,
            personal_Info: {bio: response.data.user.personal_info.bio, college: response.data.user.personal_info.college},
            personal_links: {github_link: response.data.personal_links.github_link,
                             linkdin_link: response.data.personal_links.linkdin_link, 
                             portfolio_link: response.data.personal_links.portfolio_link},
            profilePic: response.data.imageUrl,
            isLoading:false
        })

        toast.success("Profile updated")
    }

}));