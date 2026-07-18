export default {
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Collection Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
}
