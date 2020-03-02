import React from 'react';
import { connect } from 'react-redux/es/alternate-renderers';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { fetchProfile, updateProfile } from './profileAction';

const propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  updateProfile: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const ProfileContainer = props => {
  const userUpdate = ({ name, avatar, _id }) => {
    props.updateProfile({ name, avatar, _id });
  };
  return (
    <>
      <Profile
        profile={props.user}
        userUpdate={userUpdate}
        fetchProfile={props.fetchProfile}
        isFetching={props.isFetching}
      />
    </>
  );
};
const mapStateToProps = ({ profile: { user, isFetching } }) => ({
  user,
  isFetching
});

ProfileContainer.propTypes = propTypes;
export default connect(mapStateToProps, { updateProfile, fetchProfile })(
  ProfileContainer
);
