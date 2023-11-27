import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class Editor extends ClassicEditor
{
  public static override defaultConfig = {
    toolbar: {
      items: [
        'undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList', 'heading'
      ]
    },
    language: 'en',
    image: {
      toolbar: []
    },
    table: {
      contentToolbar: []
    }
  };
}
