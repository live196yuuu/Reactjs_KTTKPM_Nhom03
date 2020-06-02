import React from 'react';

export class ShowName extends React.Component{
    constructor(props){
        super(props);
        var id = this.props.id;
        this.state={
            name: ""
        };
        fetch('api/Members/GetById/'+id)
            .then(response => response.json())
            .then(data =>{
                console.log(data[0].account)
                this.setState({name: data[0].account})
            })
    }
    render(){
        return(
            <span>
                {this.state.name}
            </span>
        )
    }
}