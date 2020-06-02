import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export class Head extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='head'>
                {cookies.get('account') === undefined 
                ?
                <span>Welcome to ForumStudy</span>
                :
                <span>Xin chào {cookies.get('account')}!</span>
                }
            </div>
        )
    }
}