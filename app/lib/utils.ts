export function convertToSlug(text: string) {
	// return text
	// 	.toLowerCase()
	// 	.replace(/ /g, "-")
	//     .replace(/[^\w-]+/g, "");

	try {
		// Bỏ dấu tiếng Việt
		const noAccentTitle = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

		// Chuyển đổi sang chữ thường
		const lowerCaseTitle = noAccentTitle.toLowerCase();

		// Thay thế khoảng trắng bằng dấu gạch nối
		const slug = lowerCaseTitle.replace(/ /g, "-");

		// Loại bỏ các ký tự đặc biệt
		return slug.replace(/[^a-z0-9-]/g, "");
	} catch (error) {
		return "Error";
	}
}

export function minutesToHoursMinutes(minutes: number): string {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${hours}h ${remainingMinutes}m`;
}

export function formatNumberCurrency(amount: number): string {
	return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
