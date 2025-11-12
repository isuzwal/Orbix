import { Outlet } from "react-router";
export default function Screen(){
    return(
        <div className="min-h-screen bg-white ">
          <main>
            <Outlet />
          </main>
        </div>
     
    )
}