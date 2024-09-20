export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours() % 12 || 12)
	const minutes = padZero(date.getMinutes())
	return `${hours}:${minutes} ${date.getHours()>12 ? "PM" : "AM" }`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}