export const dateUSFormat = function(dateInput){
	if(dateInput) {
		let newDate = new Date(dateInput);
	  	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  	let year = newDate.getFullYear();
	  	let month = months[newDate.getMonth()];
	  	let date = newDate.getDate();
	  	return `${month} ${date}, ${year}`;
	}
    return null;
}

export const dateConverter = function(date) {
	if(date){
		let date_millisec = new Date(date);
		let date_formatted = date_millisec.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
	  	return date_formatted;
	}
	return null;
	
}

export const isNOTNullAndEmpty = function(value) {
	return (value !== '' && value !== null);
	
}
