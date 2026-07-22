export interface Polaroid {
id : number;
src : string;
top : string;
left : string;
rotate : number;
zIndex : number;
}

export interface Sparks {
	id : number;
	top : string;
	left : string;
	size : number;
	duration : number;
	delay : number;
}

export const SparkContent: Sparks[] = [
	{ 
		id: 1, 
		top: "20%", 
		left: "10%", 
		size: 6, 
		duration: 3, 
		delay: 0 
	},
	{ 
		id: 2, 
		top: "70%", 
		left: "15%", 
		size: 4, 
		duration: 4, 
		delay: 1 
	},
	{ 
		id: 3, 
		top: "25%", 
		left: "85%", 
		size: 5, 
		duration: 2.5, 
		delay: 0.5 
	},
	{ 
		id: 4, 
		top: "80%", 
		left: "80%", 
		size: 7, 
		duration: 3.5, 
		delay: 1.5 
	},
	{ 
		id: 5, 
		top: "45%", 
		left: "5%", 
		size: 4, 
		duration: 3, 
		delay: 2 
	},
	{ 
		id: 6, 
		top: "50%", 
		left: "92%", 
		size: 5, 
		duration: 4.5, 
		delay: 0.2 
	},
	{ 
		id: 7, 
		top: "10%", 
		left: "50%", 
		size: 6, 
		duration: 3.2, 
		delay: 0.8 
	},
	{ 
		id: 8, 
		top: "95%", 
		left: "45%", 
		size: 4, 
		duration: 3.8, 
		delay: 1.2 
	},
];

export const PolaroidPhotos: Polaroid[] = [
	{ 
		id: 1, 
		src: "/1.jpeg", 
		top: "22%", 
		left: "25%", 
		rotate: -20, 
		zIndex: 2 
	},
	{ 
		
		id: 2, 
		src: "/8.jpeg", 
		top: "15%", 
		left: "38%", 
		rotate: -10, 
		zIndex: 3 
	},
	{ 
		id: 3, 
		src: "/5.jpeg", 
		top: "15%", 
		left: "62%", 
		rotate: 10, 
		zIndex: 3 
	},
	{ 
		id: 4, 
		src: "/4.jpeg", 
		top: "22%", 
		left: "75%", 
		rotate: 20, 
		zIndex: 2 
	},
	{ 
		id: 5, 
		src: "/12.jpeg", 
		top: "28%", 
		left: "50%", 
		rotate: 0, 
		zIndex: 1 
	},
	{ 
		id: 6, 
		src: "/9.jpeg", 
		top: "42%", 
		left: "15%", 
		rotate: -25, 
		zIndex: 4 
	},
	{ 
		id: 7, 
		src: "/15.jpeg", 
		top: "62%", 
		left: "25%", 
		rotate: -15, 
		zIndex: 5 
	},
	{ 
		id: 8, 
		src: "/3.jpeg", 
		top: "42%", 
		left: "85%", 
		rotate: 25, 
		zIndex: 4 
	},
	{ 
		id: 9, 
		src: "/4.jpeg", 
		top: "62%", 
		left: "75%", 
		rotate: 15, 
		zIndex: 5 
	},
	{ 
		id: 10,
		 src: "/7.jpeg"
		 , top: "45%", 
		 left: "35%", 
		 rotate: -5, 
		 zIndex: 6 
	},
	{ 
		id: 11,
		 src: "/7.jpeg"
		 , top: "45%", 
		 left: "65%", 
		 rotate: 5, 
		 zIndex: 6 
	},
	{ 
		id: 12,
		 src: "/7.jpeg"
		 , top: "58%", 
		 left: "50%", 
		 rotate: 0, 
		 zIndex: 7 
	},
	{ 
		id: 13,
		 src: "/7.jpeg"
		 , top: "72%", 
		 left: "35%", 
		 rotate: -10, 
		 zIndex: 8 
	},
	{ 
		id: 14,
		 src: "/7.jpeg"
		 , top: "72%", 
		 left: "65%", 
		 rotate: 10, 
		 zIndex: 8 
	},
	{ 
		id: 15,
		 src: "/7.jpeg"
		 , top: "88%", 
		 left: "50%", 
		 rotate: 0, 
		 zIndex: 10 
	},
]