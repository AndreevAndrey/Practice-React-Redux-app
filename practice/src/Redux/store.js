import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import tasksReducer from '../Tasks/tasksReducer';
import profileReducer from '../Profile/profileReducer';

const reducers = combineReducers({
  form: formReducer,
  tasks: tasksReducer,
  profile: profileReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
window.store = store;
export default store;
