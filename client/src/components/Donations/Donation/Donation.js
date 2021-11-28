import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likeDonation, deleteDonation } from '../../../actions/donations';
import useStyles from './styles';

const Donation = ({ donation, setCurrentID }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parsel(localStorage.getItem('profile'));

    const Likes = () => {
        if(donation.likes.lenght > 0){
            return donation.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{donation.likes.length > 2 ? `You and ${donation.likes.length - 1} others` : `${donation.likes.length} like${donation.likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSIze="small" />&nbsp;{donation.likes.length} {donation.likes.length === 1 ? 'Like' : 'Likes'} </>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    };

    return (
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={donation.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={donation.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{donation.name}</Typography>
            <Typography variant="body2">{moment(donation.createdAt).fromNow()}</Typography>
          </div>
          {(user?.result?.googleId === donation?.creator || user?.result?._id === donation?.creator) &&(
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentID(donation._id)}><MoreHorizIcon fontSize="default" /></Button>
          </div>
          )}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">{donation.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{donation.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{donation.message}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeDonation(donation._id))}>
              <Likes />
              </Button>
              {(user?.result?.googleId === donation?.creator || user?.result?._id === donation?.creator) &&(
                <Button size="small" color="primary" onClick={() => dispatch(deleteDonation(donation._id))}>
                  <DeleteIcon fontSize="small" /> Delete 
                  </Button>
              )}
          </CardActions>
        </Card>
      );

};

export default Donation;