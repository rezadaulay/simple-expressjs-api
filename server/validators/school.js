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
	 	'tagline': {
			    notEmpty: true,
			    isLength: {
		      		options: [{ min: 5 }],
			      	errorMessage: 'Minimal 5 Character',
			    },
				errorMessage: 'Tagline is required',
		},
	 	//'logo': {
		//	    isImage: true,
		//}
	}
};