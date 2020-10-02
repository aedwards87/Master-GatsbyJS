import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// BUILD A CUSTOM SIDEBAR
export default () =>
  S.list()
    .title(`Slick's Slice`)
    .items([
      // CREATE A NEW SUB ITEM
      S.listItem()
        .title('Home page')
        .icon(() => <strong>🏠</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // add/spread in the rest of the docuement items
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'storeSettings'
      ),
    ]);
