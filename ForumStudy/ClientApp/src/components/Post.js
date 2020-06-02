import React from 'react';
import { Glyphicon} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { ShowName } from './More/ShowName';
import { Link } from 'react-router-dom';

const cookies = new Cookies();
export class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post: {},
            comments: []

        }
        this.rMess=React.createRef();
        var x = this.props.location.pathname.split('/');
        this.id = x[x.length - 1];
        this.getPostsById(this.id);
        this.getByIdPost(this.id);
        
    }
    getPostsById(x){
        fetch('api/Posts/GetById/' + x)
            .then(response => response.json())
            .then(data => {
                this.setState({ post: data });
        })
    }
    getByIdPost(x){
        fetch('api/Comments/GetByIdPost/'+x)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({comments: data})
            })
    }
    handlePost=(e)=>{
        e.preventDefault();
        var mess = this.rMess.current.value;
        var idm = cookies.get('id');
        var idp = this.id;

        fetch('api/Comments/Add/mess='+mess+'&idm='+idm+'&idp='+idp)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.rMess.current.value="";
                this.getByIdPost(this.id);
            })
    }
    render(){
        // this.props.history.push('/post');

        return(
            <div>
                <div className='categories'> 
                    <b>{this.state.post.title}</b><br/>
                    <div style={{fontSize: '13px', marginTop: '10px'}}>
                        <Glyphicon glyph='user' /> admin
                        <Glyphicon glyph='time' style={{marginLeft: '15px'}}  /> {this.state.post.createdAt} 
                    </div><br/>
                    <div>
                        {this.state.post.message}
                    </div>
                </div>
                <div style={{minHeight: '200px', padding: '20px'}}>
                    {this.state.comments.map(i => (
                        <div key={i.id}>
                            <p><b><Link to={'/profile/'+i.idMember}><ShowName id={i.idMember} /></Link>: {i.message}</b></p>
                            {i.createdAt}
                            <hr/>
                        </div>
                    ))}
                </div>
                {cookies.get('account') !== undefined &&
                <div className='categories'>
                    <form onSubmit={this.handlePost}>
                        Nhập nội dung:<br/>
                        <input type='text' ref={this.rMess} style={{width: '500px', height: '80px'}} /><br/>
                        <button>Bình luận</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}