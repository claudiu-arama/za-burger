// HOC wrapps around components to handle errors

import React from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

// use axios as an argument as opposed to importing it from axiosOrders
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    constructor(props) {
      super();

      this.state = {
        error: null,
      };
    }
    componentDidMount() {
      // we use properties for the interceptors so we can remove them
      //  when the component is not used anymore (this.reqInterceptor and this.respInterceptor)
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }
    // clean up the interceptors of the error handler.
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    confirmErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.confirmErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
