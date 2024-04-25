import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
   reducerPath : "userApi",
   baseQuery : fetchBaseQuery({baseUrl: "http://localhost:3000/"}),
   endpoints : (builder) => ({
       userSignUp : builder.mutation({
                        query : (user) => ({
                            url : 'signup',
                            method : 'POST',
                            mode : 'no-cors',
                            body : user,
                            headers : {
                                'Content-Type' : 'application/json',
                            }
                        })
                   }),
       userLogin : builder.mutation({
                        query : (user) => ({
                            url : 'login',
                            method : 'POST',
                            body : user,
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        })
                   }),
        countPosts : builder.mutation({
                        query : (user) => ({
                            url : 'postscount',
                            method : 'POST',
                            body : user,
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        })
                   }),
        deletePost : builder.mutation({
                        query : (post) => ({
                            url : 'deletepost',
                            method : 'POST',
                            body : post,
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        })
                   }),
        addPost : builder.mutation({
                        query : (postDetails) => ({
                            url : 'add',
                            method : 'POST',
                            body : postDetails,
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        })
                     }),
        getPosts : builder.mutation({
                        query : (user) => ({
                            url : 'feed',
                            method : 'POST',
                            body : user,
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        })
                    }),
                })
});

export const {
    useUserLoginMutation,
    useUserSignUpMutation,
    useCountPostsMutation,
    useDeletePostMutation,
    useAddPostMutation,
    useGetPostsMutation,
} = userApi; // Add a comma after each line

