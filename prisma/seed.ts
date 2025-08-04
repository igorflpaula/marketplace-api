import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  console.log('Start seeding...');

  const categoriesData = [
    { name: 'Eletrônicos' },
    { name: 'Vestuário e Moda' },
    { name: 'Casa e Decoração' },
    { name: 'Esportes e Lazer' },
    { name: 'Saúde e Beleza' },
    { name: 'Livros e Mídia' },
    { name: 'Brinquedos e Jogos' },
    { name: 'Veículos e Acessórios' },
  ];

  const categoriesToCreate = categoriesData.map((category) => ({
    name: category.name,
    slug: generateSlug(category.name),
  }));

  await prisma.category.deleteMany({});
  console.log('Deleted existing categories.');

  await prisma.category.createMany({
    data: categoriesToCreate,
    skipDuplicates: true,
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
