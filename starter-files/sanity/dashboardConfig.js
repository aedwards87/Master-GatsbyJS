// export default {
//   widgets: [
//     {
//       name: 'sanity-tutorials',
//     },
//     {
//       name: 'project-info',
//     },
//     {
//       name: 'project-users',
//     },
//   ],
// };

export default {
  widgets: [
    { name: 'structure-menu' },
    // {
    //   name: 'project-info',
    //   options: {
    //     __experimental_before: [
    {
      name: 'netlify',
      options: {
        description:
          'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
        sites: [
          {
            buildHookId: '5f9b428b5dfadb2412756624',
            title: 'Sanity Studio',
            name: 'slicks-slices-sanity-studio',
            apiId: '2a12789b-bc4f-462d-8746-c63060b19136',
          },
          {
            buildHookId: '5f7791d5b9512d009a1673a5',
            title: 'Slicks Slices Website',
            name: 'slicks-slices-adam',
            apiId: '35364aa4-8f3f-466c-a63f-85676e39ff41',
          },
        ],
      },
    },
    //   ],
    //   data: [
    //     {
    //       title: 'Website',
    //       value: 'https://slicks-slices-adam.netlify.app',
    //       category: 'apps',
    //     },
    //   ],
    // },
    // },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Staff',
        order: '_createdAt desc',
        types: ['person'],
      },
      layout: { width: 'medium' },
    },
  ],
};
