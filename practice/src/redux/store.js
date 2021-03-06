import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tasksReducer from '../components/Tasks/tasksReducer';
import profileReducer from '../components/Profile/profileReducer';
import loginReducer from '../components/Auth/Login/loginReducer';
import signInReducer from '../components/Auth/SignIn/signInReducer';

const reducers = combineReducers({
  form: formReducer,
  tasks: tasksReducer,
  profile: profileReducer,
  login: loginReducer,
  signIn: signInReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
