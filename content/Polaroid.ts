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
		src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop", 
		top: "22%", 
		left: "25%", 
		rotate: -20, 
		zIndex: 2 
	},
	{ 
		
		id: 2, 
		src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop", 
		top: "15%", 
		left: "38%", 
		rotate: -10, 
		zIndex: 3 
	},
	{ 
		id: 3, 
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop", 
		top: "15%", 
		left: "62%", 
		rotate: 10, 
		zIndex: 3 
	},
	{ 
		id: 4, 
		src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop", 
		top: "22%", 
		left: "75%", 
		rotate: 20, 
		zIndex: 2 
	},
	{ 
		id: 5, 
		src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop", 
		top: "28%", 
		left: "50%", 
		rotate: 0, 
		zIndex: 1 
	},
	{ 
		id: 6, 
		src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop", 
		top: "42%", 
		left: "15%", 
		rotate: -25, 
		zIndex: 4 
	},
	{ 
		id: 7, 
		src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop", 
		top: "62%", 
		left: "25%", 
		rotate: -15, 
		zIndex: 5 
	},
	{ 
		id: 8, 
		src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop", 
		top: "42%", 
		left: "85%", 
		rotate: 25, 
		zIndex: 4 
	},
	{ 
		id: 9, 
		src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900&auto=format&fit=crop", 
		top: "62%", 
		left: "75%", 
		rotate: 15, 
		zIndex: 5 
	},
	{ 
		id: 10,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "45%", 
		 left: "35%", 
		 rotate: -5, 
		 zIndex: 6 
	},
	{ 
		id: 11,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "45%", 
		 left: "65%", 
		 rotate: 5, 
		 zIndex: 6 
	},
	{ 
		id: 12,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "58%", 
		 left: "50%", 
		 rotate: 0, 
		 zIndex: 7 
	},
	{ 
		id: 13,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "72%", 
		 left: "35%", 
		 rotate: -10, 
		 zIndex: 8 
	},
	{ 
		id: 14,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "72%", 
		 left: "65%", 
		 rotate: 10, 
		 zIndex: 8 
	},
	{ 
		id: 15,
		 src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop"
		 , top: "88%", 
		 left: "50%", 
		 rotate: 0, 
		 zIndex: 10 
	},
]