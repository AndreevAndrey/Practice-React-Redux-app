import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import style from './profile.module.scss';
import uploadFile from '../Utils/uploadFile/FileReader';

const propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  userUpdate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

class Profile extends React.Component {
  state = {
    avatarFile: '',
    avatar: '',
    name: '',
    _id: null,
    isToggle: true,
    isSubmit: false
  };

  componentDidMount() {
    this.props.fetchProfile().then(() => this.setState({ isSubmit: true }));
  }

  componentWillReceiveProps({ isFetching, profile }) {
    return !isFetching && this.setState(() => profile);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.userUpdate(this.state);
    this.setState({ isSubmit: true });
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value, isSubmit: false });
  };

  toggleForm = () => {
    this.setState(({ isToggle }) => ({ isToggle: !isToggle }));
  };

  handleChange = e => {
    e.preventDefault();
    const avatarFile = e.target.files[0];
    uploadFile(avatarFile).then(
      avatar => {
        this.setState({ avatarFile, avatar, isSubmit: false });
      },
      () => {
        this.setState({ avatarFile: '', avatar: '' });
      }
    );
  };

  render() {
    const { avatar } = this.state;
    const image = avatar ? (
      <img alt='avatar' className={style.avatar} src={avatar} />
    ) : this.props.profile.avatar ? (
      <img
        alt='avatar'
        className={style.avatar}
        src={this.props.profile.avatar}
      />
    ) : (
      <div className={style.defaultField}>Please add a photo</div>
    );

    return (
      <div className={style.profile}>
        <div className={style.photo}>
          {image}
          <form onSubmit={this.handleSubmit}>
            <label className={style.inputPhoto}>
              <input
                type='file'
                name='image__uploads'
                accept='image/jpeg,image/png'
                onChange={this.handleChange}
              />
            </label>
            {this.state.isToggle ? (
              <>
                <div className={style.name} onClick={this.toggleForm}>
                  {this.state.name}
                </div>
                <Button
                  type='submit'
                  variant='contained'
                  color={this.state.isSubmit ? 'default' : 'secondary'}
                >
                  Save
                </Button>
              </>
            ) : (
              <TextField
                onBlur={this.toggleForm}
                autoFocus
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.handleChangeName}
                label='Name'
              />
            )}
          </form>
        </div>
        <div>{this.props.isFetching && <CircularProgress />}</div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;
export default Profile;
