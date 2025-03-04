export const getAllCategories = () => {
	return fetch("http://localhost:8088/categories").then((res) => res.json());
};

export const createCategory = (newCategory) => {
	return fetch("http://localhost:8088/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(newCategory),
	}).then((res) => res);
};
