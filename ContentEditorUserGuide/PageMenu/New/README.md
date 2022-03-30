# Add a Blank Page

From the [_Page_ menu](../), click the **New** button to create a new page for your site.

![New Page icon](./assets/PageNewIcon.jpg ':size=60')

When you click the **New** button, the _Add a Blank Page_ form will open, and you will be prompted
to enter the URL you wish to use for the new page.

Above the _URL_ field, you will see a read-only _Template_ field. In BodilessJS, pages utilize
[templates](/Development/Guides/BuildingSites/Templates/). Developers use templates to define page
layouts in order to maintain uniformity and consistency across content types and sections.

A page is added to the section in which it was created, and the newly created page will use the
[template](/Development/Guides/BuildingSites/Templates/) associated with that section.

To create a new page:

01. From the [Toolbar](../../#toolbar), click **Page > New** to open the _Add a Blank Page_ form.  
    ![Add a Blank Page form](./assets/PageAddABlankPage.jpg ':size=50%')
01. In the _URL_ field, enter the URL you wish to use for the new page, and click the checkmark to
    confirm.
    * **Note:** There are [restrictions](#restrictions) on the URL provided.
    * A spinner will appear while your new page is being created.  
      ![Creating Page spinner](./assets/PageCreatingPage.jpg ':size=50%')
01. Once your page is created, you will see an "Operation Complete" confirmation, along with a link
    to the new page.  
    ![Operation Complete](./assets/PageNewOperationComplete.jpg ':size=50%')

## Restrictions

When providing a path/URL for the new page, there are some restrictions to be aware of:

* You cannot create or clone a page using a path/URL with uppercase letters.
  * For SEO reasons, BodilessJS enforces lowercase URLs.
* You cannot create/clone pages beginning or ending with `-` or `_`, as pages named with these
  patterns are considered special pages by Gatsby.
  * If either of these cases are needed for a page on your site, a developer will need to create the
    page via code.

Triggering any of these restrictions will result in a warning message, and you will need to enter a
new value into the _URL_ field.
