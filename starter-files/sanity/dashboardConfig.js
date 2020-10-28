// import dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

export default {
  widgets: [
    {
      name: 'sanity-tutorials',
    },
    {
      name: 'project-info',
    },
    {
      name: 'project-users',
    },
    {
      name: 'netlify',
      options: {
        title: 'My website deploy',
        sites: [
          {
            title: `Slick's Slices`,
            apiId: process.env.SANITY_NETLIFY_API,
            buildHookId: process.env.SANITY_BUILD_HOOK,
            name: 'slicks-slices-adam',
          },
          // {
          //   title: 'Website',
          //   apiId: 'yyyyy-xxxxx-zzzz-xxxx-yyyyyyyy',
          //   buildHookId: 'yyyyxxxxxyyyxxdxxx',
          //   name: 'sanity-gatsby-blog-20-web'
          // }
        ],
      },
    },
  ],
};
