'use client';

import { Editor } from '@tiptap/react';
import { useRef } from 'react';
import { FaBold, FaItalic, FaListUl, FaRemoveFormat } from 'react-icons/fa';
import { FaImage, FaListOl } from 'react-icons/fa6';
import { IoIosRedo, IoIosUndo } from 'react-icons/io';

// type Level = 1 | 2 | 3 | 4 | 5 | 6;

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  if (!editor) {
    return null;
  }

  const buttonClass = `
    border border-white/20 rounded px-2 py-1 m-1 text-sm 
    text-white/60 hover:text-primary-100 hover:border-primary-100
    focus:outline-none focus:ring-2 focus:ring-primary-100 
    transition-colors duration-200 bg-transparent
  `;
  const activeButtonClass = '!bg-primary-10 !text-primary-100 !border-primary-100';
  // const headingButtonClass = `${buttonClass} font-bold`;

  // const headingLevels: Level[] = [1, 2, 3, 4, 5];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="control-group p-2 rounded shadow">
      <div className="button-group flex flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${editor.isActive('bold') ? activeButtonClass : ''}`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${editor.isActive('italic') ? activeButtonClass : ''}`}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${editor.isActive('bulletList') ? activeButtonClass : ''}`}
          title="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${editor.isActive('orderedList') ? activeButtonClass : ''}`}
          title="Ordered List"
        >
          <FaListOl />
        </button>

        <button onClick={() => imageInputRef.current?.click()} className={`${buttonClass}`} title="Add Image">
          <FaImage />
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className={`${buttonClass}`}
          title="Clear Formatting"
        >
          <FaRemoveFormat />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${buttonClass}`}
          title="Undo"
        >
          <IoIosUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${buttonClass}`}
          title="Redo"
        >
          <IoIosRedo />
        </button>

        <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

        {/* {headingLevels.map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`${headingButtonClass} ${editor.isActive('heading', { level }) ? activeButtonClass : ''}`}
            title={`Heading ${level}`}
          >
            H<span className="text-[12px]">{level}</span>
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default MenuBar;
