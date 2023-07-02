import { useEffect, useCallback, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from '@/Common/Input';
import { getImgLink } from '@/Apis/uploadImg';

const formats = [
  'font',
  'size',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

interface Props {
  setInfo: (key: Info) => void;
  res?: Info;
}

export default function SetProductInfo({ setInfo, res }: Props) {
  const info = useRef({} as Info);
  const reactQuill = useRef<ReactQuill>(null);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      if (!input.files) {
        return;
      }
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await getImgLink(formData);

      if (reactQuill.current instanceof ReactQuill) {
        const editor = reactQuill.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', res?.data.data.link);
        }
      }
    });
  }

  useEffect(() => {
    if (res) {
      info.current = res;
      setInfo(res);
      //console.log(res, info.current);
      const editor = reactQuill.current?.getEditor();
      if (res.description) {
        editor?.pasteHTML(1, res.description);
      }
    }
  }, [res]);
  useEffect(() => {
    setInfo(info.current);
  }, [info]);

  const contents = useCallback((content: string) => {
    info.current['description'] = content;
  }, []);

  return (
    <tbody
      className="info"
      onBlur={(e) => {
        if (e.target instanceof HTMLInputElement) {
          info.current[e.target.id] = e.target.value;
        } else if (e.target instanceof HTMLTextAreaElement) {
          if (e.target.id === 'summary_description') {
            info.current[e.target.id] = e.target.value;
          } else {
            info.current[e.target.id] = e.target.value
              .replace(/\s/gi, '')
              .split(',');
          }
        }
      }}
    >
      <tr>
        <th>
          상품명<span className="required">필수</span>
        </th>
        <td>
          <Input
            defaultValue={res?.product_name}
            maxLength={250}
            id="product_name"
          />
        </td>
      </tr>

      <tr>
        <th>상품명(관리용)</th>
        <td>
          <Input
            defaultValue={res?.internal_product_name}
            maxLength={50}
            id="internal_product_name"
          />
        </td>
      </tr>

      <tr>
        <th>공급사 상품명</th>
        <td>
          <Input
            defaultValue={res?.supply_product_name}
            maxLength={250}
            id="supply_product_name"
          />
        </td>
      </tr>

      <tr>
        <th>상품 요약설명</th>
        <td>
          <Input
            defaultValue={res?.summary_description}
            maxLength={255}
            id="summary_description"
          />
        </td>
      </tr>

      <tr>
        <th>상품 간략설명</th>
        <td>
          <textarea
            id="simple_description"
            cols={20}
            rows={3}
            defaultValue={res?.simple_description}
          />
        </td>
      </tr>

      <tr>
        <th>상품 상세설명</th>
        <td>
          <ReactQuill
            ref={reactQuill}
            onChange={contents}
            modules={modules}
            formats={formats}
            style={{ width: '1000px', height: '500px', paddingBottom: '50px' }}
          />
        </td>
      </tr>

      <tr>
        <th>검색어 설정</th>
        <td>
          <textarea
            id="Product_tag"
            cols={20}
            rows={3}
            defaultValue={res?.product_tag}
          />
        </td>
      </tr>
    </tbody>
  );
}
