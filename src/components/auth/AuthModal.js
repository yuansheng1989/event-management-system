import React, { Component } from 'react';
import { Modal, Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { connect } from 'react-redux';
import { signUpUser, loginUser, loginGoogleUser, toggleAuthModal } from '../../redux/auth/actions';

const mapStateToProps = (state) => {
    return {
        ...state.AuthReducer
    };
};

class AuthModal extends Component {
    formRef = React.createRef();

    handleCancel = () => {
        this.props.toggleAuthModal({isAuthModalVisible: false, authModalType: ""});
        this.formRef.current.resetFields();
    }

    GoogleLoginButtonClick = async (e) => {
        await this.props.loginGoogleUser();
        if (!this.props.isGoogleLoginError) {
            this.props.toggleAuthModal({isAuthModalVisible: false, authModalType: ""});
            this.formRef.current.resetFields();
        }
    }

    onLoginFinish = async (values) => {
        await this.props.loginUser(values.email, values.password);
        if (!this.props.isLoginError) {
            this.props.toggleAuthModal({isAuthModalVisible: false, authModalType: ""});
            this.formRef.current.resetFields();
        }
    }

    onSignUpFinish = async (values) => {
        await this.props.signUpUser(values.email, values.password, values.username);
        if (!this.props.isSignUpError) {
            this.props.toggleAuthModal({isAuthModalVisible: false, authModalType: ""});
            this.formRef.current.resetFields();
        }
    }

    render() {
        const { authModalType, isAuthModalVisible } = this.props;

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!'
            }
        };
        
        let title = "";
        let authForm = "";

        const loginForm = (
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={this.onLoginFinish}
                validateMessages={validateMessages}
                ref={this.formRef}
                className={styles.auth_form}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email', label: 'Email' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, label: 'Password' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className={styles.login_form_forgot} href="">
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={this.props.isLoggingIn} htmlType="submit" className={styles.login_button}>
                        Log in
                    </Button>
                    <Divider>OR</Divider>
                    <Button type="primary" loading={this.props.isGoolgeLoggingIn} htmlType="button" className={styles.login_google_button} danger onClick={this.GoogleLoginButtonClick}>
                        <GoogleOutlined />Login with Google
                    </Button>
                </Form.Item>
            </Form>
        );

        const signUpForm = (
            <Form
                name="signUp"
                initialValues={{ remember: true }}
                onFinish={this.onSignUpFinish}
                validateMessages={validateMessages}
                ref={this.formRef}
                className={styles.auth_form}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, label:"Name" }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email', label: 'Email' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, label: 'Password' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmedPassword"
                    rules={[
                        { required: true, label: 'Password' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" loading={this.props.isSigningUp} htmlType="submit" className={styles.register_button}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        );

        if (authModalType === "login") {
            title = "Login";
            authForm = loginForm;
        } else if (authModalType === "signUp") {
            title = "Sign Up";
            authForm = signUpForm;
        }

        return (
            <Modal
                title={title}
                footer={null}
                visible={isAuthModalVisible}
                onCancel={this.handleCancel}
                centered={true}
                className={styles.auth_modal}
                maskClosable={false}
            >
                {authForm}
            </Modal>
        );
    }
}

export default connect(mapStateToProps, { signUpUser, loginUser, loginGoogleUser, toggleAuthModal })(AuthModal);