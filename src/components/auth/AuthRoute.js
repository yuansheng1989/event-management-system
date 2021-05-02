import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated
    };
};

const AuthRoute = (props) => {
    const { isAuthenticated, children, ...rest } = props;

    return (
        <Route
            {...rest}
            render={({location}) => 
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    ); 
};

export default connect(mapStateToProps)(AuthRoute);