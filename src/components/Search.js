import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import Link from './Link'
import './Search.css'

const FEED_SEARCH_QUERY=gql`
    query FeedSearchQuery($filter:String!){
         feed(filter:$filter){
            id
            links{
                id
                url
                description
                createdAt 
                postedBy{
                    id
                    name
                }
                votes{
                    id
                    user{
                      id
                    }
                }
            }
         }
    }
`

const Search =()=>{
    const [SearchFilter, setSearchFilter] = useState('')
    const [executeSearch, {data}] = useLazyQuery(FEED_SEARCH_QUERY)
    return(
        <>
        <div className='search-container'>
            
            <input type='text' className='input-css' onChange={(e) => setSearchFilter(e.target.value)} placeholder="Search"/><br/>
            <button  className='button-one' onClick={()=> executeSearch({
                variables:{filter:SearchFilter}
            })}>Ok</button>
        </div>
        {data && 
            data.feed.links.map((link, index)=>(
                <Link key={link.id} link={link} index={index}/>
            ))
        }
        </>
    )
}
export default Search