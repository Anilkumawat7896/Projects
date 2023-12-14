import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useSingOutAccountMutation } from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { user } = useUserContext();
  const { mutateAsync: singOut, isSuccess } = useSingOutAccountMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="Home"
            title="Home"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => singOut()}
          >
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              title="Click here to logout"
            />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/images/profile-paceholder.svg"}
              alt="Profile"
              title="Click here to see profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
