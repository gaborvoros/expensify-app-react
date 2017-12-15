export default (state = {}, action) => {
	switch (action.type){
		case 'LOGIN':
			//if user is logged in set id
			return {
				uid: action.uid
			}
		case 'LOGOUT':
			//if user is logged out, wipe the object
			return {}
		default:
			return state
	}
}