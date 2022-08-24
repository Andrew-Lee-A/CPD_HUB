import { useAuthContext } from "./useAuthContext";
import { useCpdEventsContext } from "./useCpdEventsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: cpdEventsDispatch } = useCpdEventsContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        cpdEventsDispatch({type: 'SET_CPDEVENTS', payload: null})
    }

    return {logout}
}