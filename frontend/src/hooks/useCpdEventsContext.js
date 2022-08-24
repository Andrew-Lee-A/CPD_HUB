import { CpdEventsContext } from "../context/CpdEventContext";

import { useContext } from "react";

export const useCpdEventsContext = () => {
    const context = useContext(CpdEventsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used insisde an WorkoutContextProvider')
    }

    return context
}

