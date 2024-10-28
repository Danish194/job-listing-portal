import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useEffect, useState } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return authenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
