export const csvToArray = (file, objectIdentifier = '.') => {

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file, "UTF-8");

		reader.onload = (evt) => {

			const lines = evt.target.result.split('\r\n');
			const titles = lines[0].split(',');
			const result = [];

			for (let i = 1; i < lines.length - 1; i++) {

				const line = lines[i].split(',');
				const obj1 = {};

				for (let j = 0; j < titles.length; j++) {

					const objectIdentifierIndex = titles[j].indexOf(objectIdentifier);

					if (objectIdentifierIndex !== -1) {
						const obj2 = {};
						obj2[titles[j].substring(objectIdentifierIndex + 1)] = line[j];

						if (!obj1[titles[j].split(objectIdentifier)[0]]) obj1[titles[j].split(objectIdentifier)[0]] = obj2;
						else if(!obj1[titles[j].split(objectIdentifier)[0]][titles[j].substring(objectIdentifierIndex + 1)]) obj1[titles[j].split(objectIdentifier)[0]] = { ...obj1[titles[j].split(objectIdentifier)[0]], ...obj2 };
						else obj1[titles[j].split(objectIdentifier)[0]][titles[j].substring(objectIdentifierIndex + 1)] = [...obj1[titles[j].split(objectIdentifier)[0]][titles[j].substring(objectIdentifierIndex + 1)], line[j]];
					}
					else if (obj1[titles[j]]) {
						obj1[titles[j]] = [...obj1[titles[j]], line[j]];
					}
					else {
						obj1[titles[j]] = line[j];
					}
				}

				result.push(obj1);
			}

			resolve(result);
		};
		reader.onerror = (evt) => {
			reject(evt.target.error);
		};
	});
}