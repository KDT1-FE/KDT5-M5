import RadioGroup from '@/Common/RadioGroup';
import Radio from '@/Common/Radio';
import { useEffect, useRef, useState } from 'react';

interface Props {
  setMark: (key: Mark) => void;
  res?: {
    display: string;
    selling: string;
    exposure: string;
    category: string;
    recommand: string;
    newProduct: string;
  };
}

export default function SetMark({ setMark, res }: Props) {
  const [display, setDisplay] = useState('F');
  const [selling, setSelling] = useState('F');
  const [exposure, setExposure] = useState('A');
  const mark = useRef({} as Mark);

  useEffect(() => {
    if (res) {
      mark.current = res;
      setMark(mark.current);
      setDisplay(res.display);
      setSelling(res.selling);
      setExposure(res.exposure);
      const li = document.querySelectorAll('li');
      li.forEach((v) => {
        v.value === +res.category ? v.classList.add('selected') : '';
      });
    }
  }, [res]);

  useEffect(() => {
    setMark(mark.current);
  }, [mark]);

  return (
    <>
      <tbody
        onChange={(e) => {
          if (e.target instanceof HTMLInputElement) {
            const type = e.target.getAttribute('type');
            if (type === 'radio') {
              mark.current[e.target.getAttribute('name') as string] =
                e.target.value;
            } else if (type === 'checkbox') {
              mark.current[e.target.id] = e.target.checked ? 'T' : 'F';
            }
          }
        }}
      >
        <tr>
          <th>진열상태</th>
          <td>
            <RadioGroup value={display} onChange={setDisplay}>
              <Radio name="display" value="T">
                진열함
              </Radio>
              <Radio name="display" value="F">
                진열안함
              </Radio>
            </RadioGroup>
          </td>
        </tr>

        <tr>
          <th>판매상태</th>
          <td>
            <RadioGroup value={selling} onChange={setSelling}>
              <Radio name="selling" value="T">
                판매함
              </Radio>
              <Radio name="selling" value="F">
                판매안함
              </Radio>
            </RadioGroup>
          </td>
        </tr>

        <tr>
          <th>
            상품분류 선택<span className="required">필수</span>
          </th>
          <td>
            <ul
              id="category"
              onClick={(e: React.MouseEvent) => {
                if (e.target instanceof HTMLLIElement) {
                  mark.current[e.currentTarget.id] = e.target.value + '';
                  for (let i = 0; i < e.currentTarget.children.length; i++) {
                    e.currentTarget.children[i].classList.remove('selected');
                  }
                  e.target.classList.add('selected');
                }
              }}
            >
              <li value={45}>예술</li>
              <li value={46}>아동</li>
              <li value={47}>자기계발</li>
              <li value={48}>비문학</li>
              <li value={49}>소설/시/희극</li>
              <li value={50}>경제경영</li>
            </ul>
          </td>
        </tr>

        <tr>
          <th>메인 진열</th>
          <td>
            <table>
              <tbody>
                <tr>
                  <th>추천상품</th>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        id="recommand"
                        defaultChecked={
                          res ? (res.recommand === 'T' ? true : false) : false
                        }
                      />
                      진열함
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>신상품</th>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        id="newProduct"
                        defaultChecked={
                          res ? (res.newProduct === 'T' ? true : false) : false
                        }
                      />
                      진열함
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr>
          <th>표시제한</th>
          <td>
            <RadioGroup value={exposure} onChange={setExposure}>
              <Radio name="exposure" value="A">
                모두에게 표시
              </Radio>
              <Radio name="exposure" value="M">
                회원에게만 표시
              </Radio>
            </RadioGroup>
          </td>
        </tr>
      </tbody>
    </>
  );
}
