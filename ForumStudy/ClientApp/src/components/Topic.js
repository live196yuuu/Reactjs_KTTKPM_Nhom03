import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';
import Cookies from 'universal-cookie';
//import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//import { RelativeLink } from 'react-router-relative-links'
/*import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";*/
const cookies = new Cookies();
export class Topic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            nameCategory: 'NULL',
            name: 'NULL'
        }
        this.rtitle=React.createRef();
        this.rconttent=React.createRef();

        var x = this.props.location.pathname.split('/');
        this.id = x[x.length - 1];
        
        this.getPostsByIdTopic(this.id);

        fetch('api/Topics/GetById/' + this.id)
            .then(response => response.json())
            .then(data => {
                this.setState({name: data.name});
                fetch('api/Categories/GetById/' + data.idCategory)
                    .then(response => response.json())
                    .then(datax => {
                        this.setState({ nameCategory: datax.name });
                })
        })
    }
    getPostsByIdTopic(dt){
        fetch('api/Posts/GetByIdTopic/' + dt)
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: data });
        })
    }

    handlePost=(e)=>{
        e.preventDefault();
        var obj={
            tit: this.rtitle.current.value,
            idt: this.id,
            mess: this.rconttent.current.value,
            idm: cookies.get('id')
        }
        //api/Posts/Add/tit={tit}&mess={mess}&idm={idm}&idt={idt}
        fetch("api/Posts/Add/tit="+obj.tit+"&mess="+obj.mess+"&idm="+obj.idm+"&idt="+obj.idt)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.rtitle.current.value="";
                this.rconttent.current.value="";
                this.getPostsByIdTopic(this.id);
                document.getElementById('alert-su').style.display='block';
            })
    }
    render() {
        
        return (
            <div>
                <div className='categories'><b>HOME</b> >> <b>{this.state.nameCategory}</b> >> <b>{this.state.name}</b></div>
                
                    <Row>
                    <Col sm={7}>
                    <ul>
                   
                        {this.state.posts.map(i => (
                            // <a href={"post/"+i.id} key={i.id}>
                            //     <li>{i.title}</li>
                            // </a>
                            <Link to={'/post/'+ i.id} key={i.id}>
                                <li>{i.title}</li>
                            </Link>
                            // <RelativeLink to={'post'+ i.id} key={i.id}>
                            //     <li>{i.title}</li>
                            // </RelativeLink>
                        ))}
                        
                    </ul>
                    </Col>
                    {cookies.get('account') !== undefined &&
                    <Col sm={5} style={{background: '#f3f3f3'}}>
                        <form onSubmit={this.handlePost}>
                        <div id='alert-su' style={{display: 'none', color: 'green', fontWeight: 'bold'}}><br/>Đăng bài viết thành công!</div>
                        <br/>Tiêu đề:<br/>
                        <textarea rows='2' style={{width: '85%'}} ref={this.rtitle} ></textarea><br/>
                        Nội dung:<br/>
                        <textarea rows='10' style={{width: '95%'}} ref={this.rconttent} ></textarea><br/>
                        {/* <div style={{paddingRight: '35px'}}>
                            <CKEditor editor={ ClassicEditor } ref={this.rconttent} data="<p>Hello from CKEditor 5!</p>"/>
                        </div> */}
                        <br/><button>Đăng bài viết</button><br/><br/>
                        </form>
                    </Col>
                    }
                    </Row>
                
            </div>
        )
    }
}