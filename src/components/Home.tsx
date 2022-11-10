import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const { logOut } = useUserAuth();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) return navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        <div>{user?.displayName}</div>
        <div>{user?.email}</div>
      </div>
      <div className="d-grid gap-2">
        <Button variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
