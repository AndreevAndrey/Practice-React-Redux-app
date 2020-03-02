import React from 'react';
import PropTypes from 'prop-types';
import style from './profile.module.scss';
import uploadFile from '../Utils/uploadFile/FileReader';
import Preloader from '../Common/Preloader/Preloader';

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
    isToggle: true
  };

  componentDidMount() {
    this.props.fetchProfile();
  }

  componentWillReceiveProps({ isFetching, profile }) {
    return !isFetching && this.setState(() => profile);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.userUpdate(this.state);
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  toggleForm = () => {
    this.setState(({ isToggle }) => ({ isToggle: !isToggle }));
  };

  handleChange = e => {
    e.preventDefault();
    const avatarFile = e.target.files[0];
    uploadFile(avatarFile).then(
      avatar => {
        this.setState({ avatarFile, avatar });
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
              <div className={style.name} onClick={this.toggleForm}>
                {this.state.name}
              </div>
            ) : (
              <input
                onBlur={this.toggleForm}
                autoFocus
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.handleChangeName}
                placeholder='Name'
              />
            )}
            <button type='submit'>Save</button>
          </form>
        </div>
        <div>{this.props.isFetching && <Preloader />}</div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;
export default Profile;
