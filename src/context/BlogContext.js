import React, {useReducer} from 'react'

export default (reducer, actions, initialState) => {
    const Context = React.createContext()

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, initialState)

        const boundActions = {}
        for(let key in actions){
            boundActions[key] = actions[key](dispatch)
        }

        return <Context.Provider value={{state, ...boundActions}}>
            {children}
        </Context.Provider>
    }

    return {Context, Provider}
}

import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'delete_blogpost':
            return state.filter((blogPost)=> blogPost.id !== action.payload )
        case 'add_blogpost':
            return [...state, {
                id: Math.floor(Math.random() * 9999),  
                title: action.payload.title,
                content: action.payload.content
            }
        ]
        default:
            return state
        }
}

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({type: 'add_blogpost', payload: {title, content}})
        callback()
    }
}
const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({type: 'delete_blogpost', payload: id})
    }
}

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost}, [])