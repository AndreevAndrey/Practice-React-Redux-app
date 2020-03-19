import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import style from './profile.module.scss';
import error from '../utils/error/error.module.scss';
import uploadFile from '../utils/uploadFile/fileReader';

const propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  userUpdate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

const Profile = ({
  fetchProfile,
  profile,
  userUpdate,
  isFetching,
  errorMessage
}) => {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    _id: ''
  });
  const [isToggle, setIsToggle] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await fetchProfile().then(() => setIsSubmit(true));
    }

    fetchData();
  }, [fetchProfile]);

  useEffect(() => {
    async function setStateUser() {
      await setUser(profile);
    }

    setStateUser();
  }, [profile]);

  const handleSubmit = e => {
    e.preventDefault();
    userUpdate(user);
    setIsSubmit(true);
  };

  const handleChangeName = event => {
    event.persist();
    setUser(user => ({ ...user, name: event.target.value }));
    setIsSubmit(false);
  };

  const toggleForm = () => {
    setIsToggle(!isToggle);
  };

  const handleChange = e => {
    e.preventDefault();
    const avatarFile = e.target.files[0];
    uploadFile(avatarFile).then(
      avatar => {
        setUser(user => ({ ...user, avatar }));
        setIsSubmit(false);
      },
      () => {
        setUser(user => ({ ...user, avatar: '' }));
      }
    );
  };

  const { avatar, name } = user;
  const image = avatar ? (
    <img alt='avatar' className={style.avatar} src={avatar} />
  ) : profile.avatar ? (
    <img alt='avatar' className={style.avatar} src={profile.avatar} />
  ) : (
    <div className={style.defaultField}>Please add a photo</div>
  );
  return (
    <div className={style.profile}>
      <div className={style.photo}>
        {image}
        <form onSubmit={handleSubmit}>
          <label className={style.inputPhoto}>
            <input
              type='file'
              name='image__uploads'
              accept='image/jpeg,image/png'
              onChange={handleChange}
            />
          </label>
          {isToggle ? (
            <>
              <div className={style.name} onClick={toggleForm}>
                {name ? <p>{name}</p> : <p>Add name</p>}
              </div>
              <Button
                type='submit'
                variant='contained'
                startIcon={<SaveIcon />}
                color={isSubmit ? 'default' : 'secondary'}
                disabled={!name}
              >
                Save
              </Button>
            </>
          ) : (
            <TextField
              onBlur={toggleForm}
              autoFocus
              type='text'
              name='name'
              value={name}
              onChange={handleChangeName}
              label='Name'
            />
          )}
        </form>
      </div>
      <div>{isFetching && <CircularProgress />}</div>
      <div className={error.error}>{errorMessage}</div>
    </div>
  );
};

Profile.propTypes = propTypes;
export default Profile;
