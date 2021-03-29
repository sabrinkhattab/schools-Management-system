
// import { getToken, setToken, isLoggedIn, subscribe, unsubscribe } from './TokenProvider'

// export const createAuthProvider = () => {

//     const login = (newTokens) => {
//         setToken(newTokens);
//     };

//     const logout = () => {
//         setToken(null);
//     };

//     const authFetch = async () => {
//         const token = await getToken();

//         return token
//     };

//     const useAuth = () => {
//         const [isLogged, setIsLogged] = useState(isLoggedIn());

//         useEffect(() => {
//             const listener = (newIsLogged) => {
//                 setIsLogged(newIsLogged);
//             };

//             subscribe(listener);
//             return () => {
//                 unsubscribe(listener);
//             };
//         }, []);

//         return [isLogged];
//     };

//     return {
//         useAuth,
//         authFetch,
//         login,
//         logout
//     }
// };