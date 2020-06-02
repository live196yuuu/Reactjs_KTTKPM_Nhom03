import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export class Register extends Component {
    displayName = Register.name

    constructor(props) {
        super(props);
        this.state = {
            registerSuccess: false
        };
        this.rlogTk = React.createRef();
        this.rlogMk = React.createRef();
        this.rregTk = React.createRef();
        this.rregMk = React.createRef();
        this.rregEm = React.createRef();

    }
    handleLogin = (e) => {
        e.preventDefault();
        var tk = this.rlogTk.current.value;
        var mk = this.rlogMk.current.value;
        fetch("api/Members/CheckLogin/tk=" + tk + "&mk=" + mk)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    alert("ERROR: Sai thông tin đăng nhập!");
                    return false;
                }
                else {
                    cookies.set('account', tk, { path: '/' });
                    cookies.set('id', data[0].id, { path: '/' });
                    this.props.history.push("/");
                }
            });

    }
    handleRegister = (e) => {
        e.preventDefault();
        var str = this.rregTk.current.value;
        fetch('api/Members/GetByName/' + str)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    alert("ERROR: Tên tài khoản đã tồn tại!");
                    return false;
                }
                else {
                    var datareg = {
                        "Account": this.rregTk.current.value,
                        "Password": this.rregMk.current.value,
                        "Email": this.rregEm.current.value,
                    };
                    fetch('api/Members/Add/tk=' + datareg.Account + '&mk=' + datareg.Password + '&em=' + datareg.Email)
                        .then((response) => {
                            response.json();
                            console.log(response);
                            this.rregTk.current.value = "";
                            this.rregMk.current.value = "";
                            this.rregEm.current.value = "example@forumstudy.com";
                            this.setState({ registerSuccess: true });
                        }
                        );
                }
            }
            );

    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="login" id="tabs" className="flex-column" >
                    <Tab eventKey="login" title={<b>Đăng nhập</b>} >
                        <form onSubmit={this.handleLogin} style={{ paddingLeft: '20px' }}>
                            <br />Tài khoản: <br />
                            <input type='text' ref={this.rlogTk} /><br />
                            Mật khẩu: <br />
                            <input type='password' ref={this.rlogMk} /><br /><br />
                            <button>Đăng nhập</button>
                        </form>
                    </Tab>
                    <Tab eventKey="register" title={<b>Đăng ký</b>} >
                        <form onSubmit={this.handleRegister} style={{ paddingLeft: '20px' }}>
                            <div>
                                <br />Tài khoản: <br />
                                <input type='text' ref={this.rregTk} /><br />
                                Mật khẩu: <br />
                                <input type='password' ref={this.rregMk} /><br />
                                Email: <br />
                                <input type='email' defaultValue='example@forumstudy.com' ref={this.rregEm} /><br /><br />
                                <button>Đăng ký</button><br /><br />
                                {this.state.registerSuccess === true &&
                                    <div className='alert-success'>Đăng ký thành công</div>
                                }
                            </div>
                        </form>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
