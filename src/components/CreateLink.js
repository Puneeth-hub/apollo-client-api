import React, {useState} from 'react';
import { useMutation, gql } from '@apollo/client';
import { LINKS_PER_PAGE } from '../constants';
import {  useNavigate } from 'react-router-dom';
import {FEED_QUERY} from './LinkList'
import './CreateLink.css'

const CREATE_LINK_MUTATION = gql`
    mutation PostMutation(
        $description: String!
        $url: String! 
    ){
    post(description: $description, url:$url){
            id
            createdAt
            url
            description
    }
    }

`;








const CreateLink = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    })

const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables:{
        description:formState.description,
        url:formState.url
    },
    update:(cache, {data:{post}})=> {
        const take = LINKS_PER_PAGE;
        const skip = 0;
        const orderBy = {createdAt: 'desc'};
        const data = cache.readQuery({
            query:FEED_QUERY,
            variables: {
                take,
                skip,
                orderBy
              }
        });
        cache.writeQuery({
            query:FEED_QUERY,
            data:{
                feed:{
                    links:[post, ...data.feed.links]
                }
            },
            variables: {
                take,
                skip,
                orderBy
              }
        })
    },
    onCompleted: () => navigate('/')
})



    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                createLink();
                setFormState({description:'',url:''});
                
            }}>
                <div className='create-link '>
                    <input className='input-description' value={formState.description} type='text' 
                    placeholder='A description for the link' onChange={(e) => setFormState({
                        ...formState,
                        description: e.target.value
                    })}/><br/>
                    <input className='input-description' value={formState.url} type='text' 
                    placeholder='The URL  for the link' onChange={(e) => setFormState({
                        ...formState,
                        url: e.target.value
                    })}/>
                    <button type='submit' className='button'>Submit</button>
                </div>
                
            </form>
        </div>
    );
}
export default CreateLink;