import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem } from "react-pro-sidebar";
import { clearCurrentUser } from "../../store/actions/user";
import store from './../../store/index';
import { history } from './../../utils/history';

const SignOut = () => {

    const handleSignOut = () => {
        store.dispatch(clearCurrentUser());
        history.push('/login');
    }

    return (
        <MenuItem
            icon={
                <FontAwesomeIcon
                    icon={faGear}
                    size="lg"
                />
            }
            onClick={handleSignOut}
        >
            Sign Out
        </MenuItem>
    )
}

export default SignOut;