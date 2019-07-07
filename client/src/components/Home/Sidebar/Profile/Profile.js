import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from "@material-ui/styles";

import ProfileModal from './ProfileModal';

import styles from '../../../../styles/Home/Sidebar/ProfileStyles';

const Profile = props => {
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  return (
    <Grid
      item
      container
      spacing={3}
      alignItems='center'
      className={props.classes.root}
    >
      <Modal 
        open={open} 
        onClose={closeModal} 
        className={props.classes.modal}
      >
        <ProfileModal
          profile={props.profile} 
          editProfile={props.editProfile}
          closeModal={closeModal}
        />
      </Modal>
      <Grid item>
        <Avatar 
          alt='avatar'
          onClick={openModal} 
          className={props.classes.avatar}
        >
          <Icon className='fas fa-user' style={{textAlign: "center", fontSize: '2rem'}}/>
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant='h5'>{props.username}</Typography>
      </Grid>
    </Grid>
  )
};

export default withStyles(styles)(Profile);