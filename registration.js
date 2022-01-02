const saveNewRegistration = (state = [], action) => {
	if(action.type === "SAVE_NEW_REGISTER"){
		return action.payload
	}else{
		return state
	}
}

export default saveNewRegistration;