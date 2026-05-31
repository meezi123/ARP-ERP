import { useContext } from 'react';
import AuthContext from '../contexts/authContextDef';

const useAuth = () => useContext(AuthContext);

export default useAuth;
