const allRoles = {
  user: ['getQuestions'],
  admin: ['getUsers', 'manageUsers', 'getListQuestions', 'manageQuestions'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
