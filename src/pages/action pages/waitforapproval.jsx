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
import arrowlef  from '../../resources/arrowleft.jpg';

const WaitForApproval = ()=> {
    useEffect(()=>{document.title='Cheretanet | Wait For Approval'})
    
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


    return (
      <div className='d-flex justify-content-center' style={{marginBottom:'20rem',maxWidth:'80%',margin:'0 auto 10rem auto'}}>
            <Card className='container'style={{minHeight:'20rem',marginTop:'2rem'}}>
            <CardMedia>
            <svg className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32">
            <circle class="circle"
                cx="16"
                cy="16"
                r="16"
                fill="#0c3"/>
                
                <path class="check"
        d="M9 16l5 5 9-9"
        fill="none"
        stroke="#fff"
        stroke-width="2.5"
        stroke-linecap="round"/>
            </svg>
            </CardMedia>
      <CardContent>
        <Typography className="d-flex justify-content-center check text-info" gutterBottom variant="h4" component="div">
          Approval Delay
        </Typography>
        <Typography style={{textAlign:'center'}} variant="body2" color="text.secondary">
            We understand that you need to access the system right away. Unfortunately, the system should take time to process your credentiallity 
            so we follow certain approval processes. In the meantime, you could use the system to get tenders and know the system better.
        </Typography>
        <Typography style={{textAlign:'center',marginTop:'1rem'}} variant="body2" color="text.secondary">
            You will receive an email immediately after approval.
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
    </div>
    )
}
export default WaitForApproval;