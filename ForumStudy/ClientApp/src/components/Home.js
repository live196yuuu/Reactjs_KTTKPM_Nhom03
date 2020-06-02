import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Categories from './Categories';
import { Head } from './More/Head';
import { Col, Grid, Row } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cookies = new Cookies();
export class Home extends Component {
  displayName = Home.name
  constructor(props) {
    super(props);
    this.state = {
      Categories: [],
      posts: [],
      myPosts: []
    }
    fetch('api/Categories/GetAll')
      .then(response => response.json())
      .then(data => {
        this.setState({ Categories: data });
      })
    
    fetch('api/Posts/GetAll')
      .then(response => response.json())
      .then(data => {
        var myid = cookies.get('id');
        var temp = new Array();
        for(var i=0; i<data.length; i++){
          if(data[i].idMember == myid) temp.push(data[i]);
        }
        this.setState({ posts: data, myPosts: temp });
      })
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col sm={8}>
              <Tabs defaultActiveKey='new' id="tabs-idx">
                <Tab eventKey='new' title={<b>Bài viết mới</b>}>
                  <br/>
                  <ul>
                  {this.state.posts.map(i => (
                    <Link key={i.id} to={'/post/'+i.id}>
                      <li>{i.title}</li>
                    </Link>
                  ))}
                  </ul>
                </Tab>

                <Tab eventKey='hot' title={<b>Bài viết nổi bật</b>}>
                  <br/>
                  <ul>
                  {this.state.posts.map(i => (
                    <Link key={i.id} to={'/post/'+i.id}>
                      <li>{i.title}</li>
                    </Link>
                  ))}
                  </ul>
                </Tab>
                
                {cookies.get('account') !== undefined &&
                    <Tab eventKey='my' title={<b>Bài viết của tôi</b>}>
                    <br/>
                    <ul>
                    {this.state.myPosts.map(i => (
                      <Link key={i.id} to={'/post/'+i.id}>
                        <li>{i.title}</li>
                      </Link>
                    ))}
                    </ul>
                  </Tab>
                }
              </Tabs>
            </Col>
            <Col sm={4} style={{ padding: '0px', background: '#f3f3f3' }}>
              {
                this.state.Categories.map(i => (
                  <Categories key={i.id} idx={i.id} name={i.name} />
                ))
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
