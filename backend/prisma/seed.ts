import { PrismaClient } from '@prisma/client';
const fs = require('fs');
const csv = require('csv-parser');

export const prisma = new PrismaClient()

async function insertIntoPrisma(data) {
	for (const row of data) {
		const theme = await prisma.theme.upsert({
			where: { title: row.theme },
			update: {},
			create: { title: row.theme },
		});

		const subTheme = await prisma.subTheme.upsert({
			where: { title: row.subtheme },
			update: {},
			create: { title: row.subtheme },
		});

		const guideline = await prisma.guideline.upsert({
			where: { internal_id: row.id },
			update: {},
			create: {
				indicator: row.indicator,
				description: row.description,
				internal_id: row.id,
			},
		});

		const existingQuestion = await prisma.question.findUnique({
		where: {
			themeId_subThemeId_guidelineId: {
				themeId: theme.id,
				subThemeId: subTheme.id,
				guidelineId: guideline.id,
			},
		},
		});

		if (!existingQuestion) {
			await prisma.question.create({
				data: {
					theme: { connect: { id: theme.id } },
					subtheme: { connect: { id: subTheme.id } },
					guideline: { connect: { id: guideline.id } },
					result: { value: row.value, unit: row.unit },
				},
			});
		}
	}
}

async function main() {
	try {
		const data = [];

		fs.createReadStream('/usr/src/app/prisma/UserData.csv')
		.pipe(csv({ separator: ';' }))
		.on('data', (row) => {
			data.push(row);
		})
		.on('end', () => {
			insertIntoPrisma(data);
		});
	} catch(e) {
		console.log(e)
	}

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
