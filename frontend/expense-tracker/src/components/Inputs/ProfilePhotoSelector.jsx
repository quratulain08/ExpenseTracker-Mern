import React, { useRef, useState } from 'react';
import { LuUpload, LuUser, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    inputRef.current.value = null;
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleImageChange}
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-teal-200 rounded-full relative ">
          <LuUser className="text-4xl text-teal-500" />
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-teal-500 text-white rounded-full absolute -bottom-1 -right-1 "
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 "
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;






/*
ProfilePhotoSelector Component - Detailed Concepts

1. Functional React Component:
   - This component is written as a functional component using React Hooks.
   - It is reusable and can be controlled by the parent component via props: `image` and `setImage`.

2. Props:
   - `image`: holds the current selected file from the parent component.
   - `setImage`: function provided by the parent to update the selected image in the parent state.

3. useState Hook:
   - `previewUrl` stores a temporary URL of the selected image for instant preview.
   - `setPreviewUrl` updates the preview URL whenever a new image is selected.
   - Unlike parent state (`image`), this is local to the component and only affects preview.

4. useRef Hook:
   - `inputRef` creates a reference to the hidden file input element.
   - `useRef` allows us to directly interact with the DOM element without causing re-renders.
   - Used here to **programmatically open the hidden file input** when the upload button is clicked.

5. Hidden File Input:
   - `<input type="file" accept="image/*" className="hidden" />`
   - `hidden` class (Tailwind) sets `display: none` to hide the input.
   - We cannot click this input directly, so `inputRef.current.click()` is used to simulate a click.

6. handleImageChange Function:
   - Triggered when the user selects a file.
   - `event.target.files[0]` extracts the first selected file (single file upload).
   - `URL.createObjectURL(file)` generates a temporary local URL to display the image preview.
   - Updates both `image` (parent state) and `previewUrl` (local preview).

7. handleRemoveImage Function:
   - Clears the selected image and the preview.
   - Resets the file input value so the same file can be selected again.
   - Ensures both parent state (`image`) and local state (`previewUrl`) are cleared.

8. onChooseFile Function:
   - Programmatically triggers the click on the hidden input.
   - This allows a **custom styled button** to open the file dialog instead of the default browser input.

9. Conditional Rendering:
   - The component uses a ternary operator to show different UI based on whether an image is selected.
     - If no image (`!image`): show placeholder avatar (`LuUser`) and upload button (`LuUpload`).
     - If image is selected: show image preview (`<img>`) and remove button (`LuTrash`).

10. Tailwind CSS:
    - `w-20 h-20` → sets width and height (80px)
    - `rounded-full` → makes the element circular
    - `relative` → parent container positioning for absolute child positioning
    - `absolute -bottom-1 -right-1` → positions buttons over the avatar (upload or remove)
    - `bg-teal-200`, `bg-teal-500`, `bg-red-500` → background colors for placeholder, upload button, and remove button
    - `text-white`, `text-teal-500` → icon/text colors

11. React-Icons:
    - `LuUser` → default avatar placeholder
    - `LuUpload` → upload button icon
    - `LuTrash` → remove button icon

12. UX Flow:
    1. User sees a circular placeholder if no image is selected.
    2. Clicking the upload button opens the file selection dialog.
    3. Selected image is stored in parent state and previewed locally.
    4. User can remove the image using the trash button, which resets both preview and parent state.

13. Controlled Component Concept:
    - The selected file (`image`) is controlled by the parent component.
    - This allows other forms or API calls to access the selected image easily.

14. Summary:
    - Combines React Hooks, conditional rendering, Tailwind CSS, and react-icons.
    - Provides a clean and interactive UX for profile photo selection and preview.
    - Demonstrates handling of file inputs, refs, and temporary image previews.
*/
