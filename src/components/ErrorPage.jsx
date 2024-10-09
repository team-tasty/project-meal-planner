import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (error.response) {
    if (error.response.status === 401) {
      return (
        <div>
          <h1>Oops!</h1>
          <h2>You must be logged in to do that.</h2>
          <Link to="/">Return to Login Page</Link>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Uh-oh!</h1>
      <h2>Sorry, an unexpected error has occured</h2>
      <h3>
        <i>{error.statusText || error.message}</i>
      </h3>
    </div>
  );
};
export default ErrorPage;
