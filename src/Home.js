import React from 'react';
import Edit from './Edit';
import {CardTitle, CardActions, Button, Card, CardText } from 'react-mdl';
import './style/Home.css';


class Home extends React.Component {


  render() {
    return (
<div className="welcome">

<Card shadow={0} style={{width: '512px', margin: 'auto'}}>
    <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>
    <CardText>
        Please add a new task to review.
    </CardText>

    <Edit />


</Card>


</div>
    );



  }

}

export default Home;
