import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        
    return req;
});


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchDonations = () => API.get('/donations');
export const createDonation = (newDonation) => API.post('/donations', newDonation);
export const likeDonation = (id) => API.patch(`/donations/${id}/likeDonation`);
export const updateDonation = (id, updatedDonation) => API.patch(`/donations/${id}`, updatedDonation);
export const deleteDonation = (id) => API.delete(`/donations/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData );
export const signUp = (formData) => API.post('/user/signup', formData );
// Error coming from formData? Route back. .  
// Error found. . server -> controllers -> users.js
// assigned wrong variable to check if user exists. stuck in unknown condition. . 