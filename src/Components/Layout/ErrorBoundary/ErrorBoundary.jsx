import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(info);
    let erc = window.localStorage.getItem('erc');
    if (!erc) erc = 0;
    if (erc < 15) {
      erc = Number(erc) + 1;
      window.localStorage.setItem('erc', erc);
    } else if (erc && erc >= 15) {
      window.localStorage.removeItem('erc');
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // window.location.assign(contextPath() + '/index.html');
      window.location.assign(`http://localhost:5173/` + '#/login');
      // return <Page500></Page500>
      // return <></>;
    }
    return this.props.children;
  }
}
