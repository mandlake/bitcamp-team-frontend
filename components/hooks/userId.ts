import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode"; // Make sure this is the correct import
import { getUserById } from "@/components/_service/user/user.service";

const UserId = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.id);
        dispatch(getUserById(decoded.id));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Token is missing");
    }
  }, [dispatch]);

  return userId;
};

export default UserId;
