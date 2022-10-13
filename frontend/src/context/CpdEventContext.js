import {createContext, useReducer} from 'react'

export const CpdEventsContext = createContext()

export const cpdEventsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CPDEVENTS':
            return{
                cpdEvents: action.payload
            }
        case 'CREATE_CPDEVENT':
            return {
                cpdEvents: [action.payload, ...state.cpdEvents]
            }
        case 'DELETE_CPDEVENT':
            console.log('DELETE!')
            return {
                cpdEvents: state.cpdEvents.filter(w => w._id !== action.payload._id),
            }
        default:
            return state
    }
}

export const CpdEventsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(cpdEventsReducer, {
        cpdEvents: null
    })

    return (
        <CpdEventsContext.Provider value={{...state, dispatch}}>
            {children}
        </CpdEventsContext.Provider>
    )
}

