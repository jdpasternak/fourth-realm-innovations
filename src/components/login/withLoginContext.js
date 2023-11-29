import LoginContextProvider from "./LoginContextProvider";

const withLoginContext = (WrappedComponent) => {
  return (props) => (
    <LoginContextProvider>
      <WrappedComponent {...props} />
    </LoginContextProvider>
  );
};

export default withLoginContext;
