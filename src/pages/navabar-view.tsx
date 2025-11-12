import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router"; // added useNavigate
import { Brain, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isExpand, setExpand] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setExpand(!isExpand);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <div className="z-20 relative flex justify-between items-center p-2 w-full">
      
      <div className="flex items-center gap-1">
        <Link to="/" className="flex gap-1 items-center">
          <Brain size={24} className="text-primary" />
          <span className="text-xl font-semibold">Orbix</span>
        </Link>
      </div>

    
      <div className="hidden md:flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Link to="/dashbord">
              <Button
                variant="default"
                className="w-full cursor-pointer bg-primary text-white"
              >
                Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-600 text-red-600"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outline"
                className="w-full cursor-pointer border-primary text-foreground"
              >
                Start
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="w-full cursor-pointer">
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>

  
      <div className="md:hidden">
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={toggleMenu}
          size="icon"
        >
          {isExpand ? <X /> : <Menu />}
        </Button>
      </div>

      
      {isExpand && (
        <div className="absolute top-12 left-0 w-full dark:bg-black bg-white shadow-md md:hidden">
          <div className="flex flex-col gap-3 p-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashbord" onClick={() => setExpand(false)}>
                  <Button
                    variant="default"
                    className="w-full cursor-pointer bg-primary/90 hover:bg-primary/60 text-white"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setExpand(false);
                  }}
                  className="w-full cursor-pointer hover:text-red-600 text-red-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setExpand(false)}>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer border-primary text-foreground dark:text-white"
                  >
                    Start
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setExpand(false)}>
                  <Button
                    variant="default"
                    className="w-full cursor-pointer bg-primary text-white"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
