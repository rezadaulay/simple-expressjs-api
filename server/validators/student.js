module.exports = {
    'validationSchema': {
	 	'name': {
			    notEmpty: true,
			    isLength: {
		      		options: [{ min: 3 }],
			      	errorMessage: 'Minimal 3 Character',
			    },
				errorMessage: 'Name is required',
		},
	 	'school': {
			    notEmpty: true,
				errorMessage: 'School is required',
		}
	}
};