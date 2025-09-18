import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckAuth = (Component) => {
  const token = JSON.parse(localStorage.getItem("userToken"));

  function Wrapper(props) {
    const navigate = useNavigate();

    useEffect(() => {
      //Check one more time if the token added or not
      const token = JSON.parse(localStorage.getItem("userToken"));
      if (!token) {
        toast('👨🏻‍💻Please login for further access',
            {style:{
                borderRadius: '10px',
                background: 'rgba(244, 244, 250, 0.5)',
                fontWeight:'400',
                color: '#111',
              }},
            {position:'top-center'})
        navigate("/login");
      }
    }, [token]);

    return <Component {...props} />;
  }
  return Wrapper;
};

export default CheckAuth;
