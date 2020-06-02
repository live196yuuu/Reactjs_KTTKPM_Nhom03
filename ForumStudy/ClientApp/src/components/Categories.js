import React from 'react';
import { Link } from 'react-router-dom';


export default class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Topics: []
        }
        fetch('api/Topics/GetByIdCategory/'+this.props.idx)
            .then(response => response.json())
            .then(data =>{
                this.setState({Topics: data});
            })

    }
    render(){
        return(
            <div>
                <div className='categories'>{this.props.name}</div>
                <div >
                    <ul>
                        {this.state.Topics.map(i => (
                            <Link key={i.id} to={'topic/'+i.id}><li key>{i.name}</li></Link>
                        ))}
                    </ul>
                    
                </div>
            </div>
        )
    }
}