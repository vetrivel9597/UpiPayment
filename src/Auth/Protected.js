import { Navigate } from "react-router-dom"

function Protected({children}) {
     const Authenticate = localStorage.getItem("token")
    //  console.log('children', children)
    if(!Authenticate){
        return <Navigate to={"/"} />
    }else{
        return children
    }
}

export default Protected





