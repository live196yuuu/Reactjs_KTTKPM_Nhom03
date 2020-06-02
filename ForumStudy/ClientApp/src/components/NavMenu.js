import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import './NavMenu.css';

const cookies = new Cookies();
export class NavMenu extends Component {
  displayName = NavMenu.name

  Logout(){
    cookies.remove('account');
    window.location="https://localhost:44334/";
    //window.location.reload();
    //this.props.history.push("/");
  }

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}><b>ForumStudy</b></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>

            {cookies.get('account') === undefined &&
              <LinkContainer to={'/register'}>
                <NavItem>
                  <Glyphicon glyph='log-in' /> Đăng nhập
                </NavItem>
              </LinkContainer>
            }

            {cookies.get('account') !== undefined &&
            <React.Fragment>
              {/* <LinkContainer to={'/message'}>
                <NavItem>
                  <Glyphicon glyph='log-in' /> Tin nhắn (x)
                </NavItem>
              </LinkContainer> */}

              <LinkContainer to={'/profile/'+cookies.get('id')}>
                <NavItem>
                  <Glyphicon glyph='log-in' /> Trang cá nhân
                </NavItem>
              </LinkContainer>

              <LinkContainer to={'/member'}>
                <NavItem>
                  <Glyphicon glyph='log-in' /> Thành Viên
                </NavItem>
              </LinkContainer>

              <NavItem onClick={this.Logout} style={{marginTop: '20px'}}>
                <Glyphicon glyph='log-out' /> Đăng xuất
              </NavItem>
            </React.Fragment>
            }
{/* 
            <LinkContainer to={'/counter'}> 
              <NavItem>
                <Glyphicon glyph='education' /> Counter
              </NavItem>
            </LinkContainer>

            <LinkContainer to={'/fetchdata'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch data
              </NavItem>
            </LinkContainer> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
