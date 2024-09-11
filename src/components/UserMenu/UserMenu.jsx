import css from './UserMenu.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';


const UserMenu = () => {

  const dispatch = useDispatch()
  const user = useSelector(selectAuthUser);
  // console.log(user.name);

  const handleClick = () => {
    dispatch(logout());   
  }

  return (
    <div className={css.menu}>
      <p className={css.userInfo}>{user.email}</p>
      <button onClick={handleClick} className={css.button}>Log Out</button>
    </div>
  );
};

export default UserMenu;