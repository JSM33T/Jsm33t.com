
export const HTML_UTIL_setBodyBg = (bg: string) => {
	document.body.classList.remove('bg-light', 'bg-dark', 'bg-secondary');
	document.body.classList.add(bg);
};


