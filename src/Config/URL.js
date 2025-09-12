//const REACT_APP_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
// console.log({ REACT_APP_BACKEND_BASE_URL });
// console.log('REACT_APP_BACKEND_BASE_URL', REACT_APP_BACKEND_BASE_URL)

console.log('process.env.REACT_APP_BACKEND_BASE_URL :', process.env.REACT_APP_BACKEND_BASE_URL)
const ADMINURL = process.env.REACT_APP_BACKEND_BASE_URL


const KEY = {
  ADMIN_URL:ADMINURL,
  // USERS_URL: `${REACT_APP_BACKEND_BASE_URL}/api/user`,

};
export default KEY;
