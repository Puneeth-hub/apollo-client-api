import { useMutation, gql } from '@apollo/client';
import React from 'react';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { timeDifferenceForDate } from '../utils';
import {FEED_QUERY} from './LinkList'

import './Link.css'

const VOTE_MUTATION=gql`
    mutation VoteMutation($linkId: ID!){
        vote(linkId: $linkId){
            id 
            link{
              id
              votes{
                id 
                user{
                  id
                }
              }
            }
            user{
              id
            }
        }
    }
`




const Link = (props)=>{
    const {link} = props
    const authToken = localStorage.getItem(AUTH_TOKEN)

    const take = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = { createdAt: 'desc' };



    const [vote] = useMutation(VOTE_MUTATION, {
        variables:{
            linkId:link.id 
        },
        update:(cache, {data:{vote}})=>{
            const {feed} =cache.readQuery({
                query: FEED_QUERY,
                variables:{
                    take,
                    skip,
                    orderBy
                }
            });
        const updatedLinks = feed.links.map((feedLink) => {
            if(feedLink.id === link.id){
                return{
                    ...feedLink,
                    votes:[...feedLink.votes, vote]
                }
            };
            return feedLink
        });
        cache.writeQuery({
            query:FEED_QUERY,
            data:{
                feed:{
                    links:updatedLinks
                }
            },
            variables:{
                take, 
                skip,
                orderBy
            }
        })
        }
    })
    return(
        <div className='box-container-content'>
            <div>
                <span>{props.index + 1}.</span>
                {authToken && (
                    <div className='icon-pas' 
                        style={{cursor:'pointer'}}
                        onClick={vote}
                    >
                    ▲(Click Here icon)    
                    </div>
                )}
            </div>
        
        
        <div>
           <div className='mid-box-content'>
            {link.description} ({link.url})
            </div> 
            {(
                <div className='votes-comtainer'>
                    {link.votes.length} votes | by{' '}
                {link.postedBy ? link.postedBy.name : 'Unknown'} {' '}
                {timeDifferenceForDate(link.createdAt)}
                </div>
            )}
           
        </div>
        </div>
    )
}
export default Link