import RequestServiceContextProvider from "./RequestServiceContextProvider";

const withRequestServiceContext = (WrappedComponent) => {
  return (props) => (
    <RequestServiceContextProvider>
      <WrappedComponent {...props} />
    </RequestServiceContextProvider>
  );
};

export default withRequestServiceContext;
