import { Component } from 'react';
import PageLayout from './components/layout/PageLayout';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { updateAuth } from './redux/auth/actions';


class App extends Component {
  componentWillMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime= Math.round(Date.now() / 1000);
      if (currentTime < decoded.exp) {
        const user = JSON.parse(localStorage.getItem("user"));
        this.props.updateAuth(user);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <PageLayout />
      </div>
    );
  }
}

export default connect(null, { updateAuth })(App);
