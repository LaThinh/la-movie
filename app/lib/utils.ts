export function convertToSlug(text: string) {
	// return text
	// 	.toLowerCase()
	// 	.replace(/ /g, "-")
	//     .replace(/[^\w-]+/g, "");

	// Bỏ dấu tiếng Việt
	const noAccentTitle = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

	// Chuyển đổi sang chữ thường
	const lowerCaseTitle = noAccentTitle.toLowerCase();

	// Thay thế khoảng trắng bằng dấu gạch nối
	const slug = lowerCaseTitle.replace(/ /g, "-");

	// Loại bỏ các ký tự đặc biệt
	return slug.replace(/[^a-z0-9-]/g, "");
}
