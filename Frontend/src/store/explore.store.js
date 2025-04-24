import {create} from 'zustand'; 
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/hackofclans" : "/api/hackofclans"; 

export const useExploreStore =  create((set,get) => ({

    hackathons : [], 
    viewAllHackathons: [], 
    hasMore: true,
    users: [],
    viewAllUsers: [],
    top15Teams : [],

    getHackathons : async() => {
        const response = await axios.get(`${API_URL}/explore/get-hackathons`); 

        set({
            hackathons: response.data
        })
    },

    get50Hackathons : async({more, limit}) => {
        try {
            const response = await axios.get(`${API_URL}/explore/get-50-hackathons?more=${more}&limit=${limit}`)

            console.log(response)
            set({
                viewAllHackathons: [...get().viewAllHackathons, ...response.data.hackathons],
                hasMore: response.data.hasMore
            })

            console.log("View all hackathons are : ", get().viewAllHackathons)
            
        } catch (error) {
            console.log(error, "get50hackathons mein error hai")
        }
    },

    resetViewAllHackathons: () => {
        set({ viewAllHackathons: [], hasMore: true });
    },

    getUsers : async () => {
        const response = await axios.get(`${API_URL}/explore/get-users`); 

        set({
            users: response.data
        })
    },

    get50Users : async({more, limit}) => {
        try {
            const response = await axios.get(`${API_URL}/explore/get-50-users?more=${more}&limit=${limit}`)

            console.log(response)
            set({
                viewAllUsers: [...get().viewAllUsers, ...response.data.users],
                hasMore: response.data.hasMore
            })

            console.log("View all hackathons are : ", get().viewAllUsers)
            
        } catch (error) {
            console.log(error, "get50hackathons mein error hai")
        }
    },

    get15Teams: async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hackofclans/explore/get-teams`); 

            set({
                top15Teams: response.data
            })
        } catch (error) {
            console.log(error);
            
        }
    },

    resetViewAllUsers: () => {
        set({ viewAllUsers: [], hasMore: true });
    },


}))