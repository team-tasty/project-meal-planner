const LoginForm = ({ setShowRegister, setShowLogin }) => {
  return (
    <>
      <form></form>
      <h3>Not a member?</h3>
      <button
        onClick={() => {
          setShowRegister(true);
          setShowLogin(false);
        }}
      >
        Join us
      </button>
    </>
  );
};

export default LoginForm;
