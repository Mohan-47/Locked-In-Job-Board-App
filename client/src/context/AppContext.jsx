import { createContext } from 'react';

const Appcontext = createContext();

export const AppProvider = (props) => {
    const value = {

    }
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}