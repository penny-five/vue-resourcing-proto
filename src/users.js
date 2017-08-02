import faker from "faker";

const users = [];

for (let i = 0; i < 300; i += 1) {
  const user = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    title: faker.name.title(),
    avatar: faker.image.avatar(),
    projects: [],
    totalAllocations: []
  };

  for (let k = 0; k < 50; k += 1) {
    user.totalAllocations.push({
      week: k,
      percentage: 0
    });
  }

  for (let j = 0; j < 2; j += 1) {
    const project = {
      id: faker.random.uuid(),
      name: faker.company.companyName(),
      allocations: []
    };

    for (let k = 0; k < 50; k += 1) {
      const allocation = {
        week: k,
        percentage: Math.floor(Math.random() * 10) * 10
      };
      user.totalAllocations[k].percentage += allocation.percentage;
      project.allocations.push(allocation);
    }
    user.projects.push(project);
  }

  users.push(user);
}

export default users;
