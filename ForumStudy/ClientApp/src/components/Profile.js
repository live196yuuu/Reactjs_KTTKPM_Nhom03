import React from 'react';

export class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            member: {}
        }
        var x = this.props.location.pathname.split('/');
        this.id = x[x.length - 1];
        this.getById(this.id);
    }
    getById=(x)=>{
        fetch('api/Members/GetById/'+x)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({member: data[0]});
            })
    }
    render(){
        return(
            <div>
                <div className='categories'>Profile of <span style={{color: 'green'}}>{this.state.member.account}</span></div>
                <div style={{padding: '0px 20px'}}>
                    <p>ID: {this.state.member.id}</p>
                    <p>Email: {this.state.member.email}</p>
                    <p>Level: 
                        {this.state.member.type === 0 && "Khách"}
                        {this.state.member.type === 1 && "Thành viên"}
                        {this.state.member.type === 2 && "Kiểm duyệt viên"}
                        {this.state.member.type === 3 && "Quản trị viên"}
                    </p>
                </div>
            </div>
        )
    }
}