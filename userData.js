const userData = (state = {}, action) => {
	if(action.type === "SAVE_USER_DATA"){
		return action.payload
	}else{
		return state
	}
}

export default userData;