const RegisterForm = ({ setShowRegister, setShowLogin }) => {
  return (
    <>
      <form></form>
      <h3>Already have an account?</h3>
      <button
        onClick={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      >
        Login
      </button>
    </>
  );
};

export default RegisterForm;
