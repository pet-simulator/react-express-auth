

import { createContext, useContext } from 'react';

const CurrentUserContext = createContext();

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};

export default CurrentUserContext;

