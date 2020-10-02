import { MdPerson as icon } from 'react-icons/md';

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: `Slicemasters`,
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: `Description`,
      type: 'text',
      description: 'Tell us a bit about the person',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
