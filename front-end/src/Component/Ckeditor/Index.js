import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyEditor = () => {
    const [editorData, setEditorData] = useState('');

    // Hàm xử lý khi tải lên hình ảnh
    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgElement = `<img src="${reader.result}" alt="Image" style="max-width: 100%; height: auto;" />`;
                resolve(imgElement); // Trả về thẻ img khi đã đọc xong
            };
            reader.onerror = () => {
                reject('Có lỗi xảy ra khi tải hình ảnh.');
            };
            reader.readAsDataURL(file); // Đọc file hình ảnh
        });
    };

    return (
        <div>
            <h2>CKEditor với Hình ảnh</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
                config={{
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        '|',
                        'insertImage',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'undo',
                        'redo',
                    ],
                    // Tùy chỉnh cho upload hình ảnh
                    image: {
                        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
                        upload: {
                            types: ['jpeg', 'png', 'gif', 'bmp', 'webp'], // Các loại hình ảnh được phép
                            // Tùy chỉnh để xử lý tải lên hình ảnh
                            handler: (file) => {
                                return handleImageUpload(file).then((imgElement) => {
                                    const editor = this.editor; // Lấy editor
                                    editor.model.change((writer) => {
                                        // Thêm hình ảnh vào nội dung
                                        editor.model.insertContent(
                                            writer.createText(imgElement),
                                            editor.model.document.selection,
                                        );
                                    });
                                });
                            },
                        },
                    },
                }}
            />
            <h3>Nội dung đã soạn thảo:</h3>
            <div dangerouslySetInnerHTML={{ __html: editorData }} />
        </div>
    );
};

export default MyEditor;
