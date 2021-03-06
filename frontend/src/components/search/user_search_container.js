import { connect } from "react-redux";
import UserSearch from "./user_search";
import { updateFilter } from "../../actions/filter_actions";
import { clearSearch } from "../../actions/user_actions";

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users.search,
        currentUserId: state.session.user.id,
        handleAddAttendee: ownProps.handleAddAttendee,
        attendees: ownProps.attendees
    });
};

const mDTP = dispatch => {
    return({
        fetchUsers: (value) => dispatch(updateFilter("bounds", value)),
        clearSearch: () => dispatch(clearSearch())
    });
};

export default connect(mSTP, mDTP)(UserSearch);