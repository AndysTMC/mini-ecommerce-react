import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return <Component {...props} navigate={navigate} location={location} params={params} />;
  };

  return Wrapper;
};

export default withRouter;