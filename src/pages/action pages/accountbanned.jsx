import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import anime from 'animejs';
import {Link} from "react-router-dom";
import logo6 from "../../resources/logo.ico";

const AccountBanned = ()=> {
    useEffect(()=>{document.title='Cheretanet | Account Banned'})
    
    var logoTimeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: true });

    logoTimeline
      .add({
      targets: '.checkmark',
      scale: [
        { value: [0, 1], duration: 600, easing: 'easeOutQuad' }
      ]
    })
      .add({
      targets: '.check',
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 700,
        delay: 200,
        easing: 'easeOutQuart'
      },
      translateX: {
        value: [6, 0],
        duration: 700,
        delay: 200,
        easing: 'easeOutQuart'
      },
      translateY: {
        value: [-2, 0],
        duration: 700,
        delay: 200,
        easing: 'easeOutQuart'
      },
      offset: 0
    });

    var checkTimeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: true });
checkTimeline
  .add({
    targets: '.checkmark',
    scale: [
      { value: [0, 1], duration: 600, easing: 'easeOutQuad' }
    ]
  })


    return (<>
      <div className="mt-2 mx-auto d-flex justify-content-center align-items-center mx-auto" style={{width:'3.2rem',height:'3.2rem',borderRadius:'2rem',outline:'1px solid darkslategray'}}>
<a href="/">
   <img src={logo6} style={{width:'3rem',height:'3rem'}} alt="cheretanet"/>
</a>
</div>
      <div className='d-flex justify-content-center' style={{marginBottom:'20rem',maxWidth:'80%',margin:'0 auto 10rem auto'}}>
          
            <Card className='container mt-2 border'style={{minHeight:'20rem'}}>
      <CardContent>
        <Typography className="d-flex text-danger justify-content-center check text-info" gutterBottom variant="h4" component="div">
          Account Banned
        </Typography>
        <Typography style={{textAlign:'center'}} variant="body2" color="text.secondary">
            Your Account Is Banned By The System Administrator.
        </Typography>
        <Typography style={{textAlign:'center',marginTop:'3rem',fontSize:'0.8rem'}} variant="body2" color="text.secondary">
            You will receive an email if your account is released.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' variant='outlined' style={{display:'block !important',maxWidth:'20rem',margin:'2rem auto'}}>
        <Link to='/' style={{textDecoration:'none'}}>
          Go Back to Home 
        </Link>
        </Button>
      </CardActions>
    </Card>
    </div></>
    )
}
export default AccountBanned;