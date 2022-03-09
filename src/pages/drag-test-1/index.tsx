// @ts-nocheck
import React from 'react';

import { imageTShirt, image1, image2, image3, image4 } from './assest';
import styles from './index.less';

type dragFunc = (e: DragEvent) => void;

let name = '';

export default function () {

  const emptyRef = React.useRef(null);
  const h1Ref = React.useRef(null);
  const cloneRef = React.useRef(null);

    React.useEffect(() => {
    const emptyDom = emptyRef.current;
    const h1Dom = h1Ref.current;

    const drag:dragFunc = (e) => {
      if(!e.target || !emptyDom) return;
      e.target.style.border = '5px dashed red';
      (emptyDom as EventTarget).style.border = '5px dashed red';
    }

    const dragstart:dragFunc = (e) => {
      // e.target.style.border = '5px dashed red';
      name = e.target.alt;
      const cloneNode = e.target.cloneNode();
      cloneRef.current = cloneNode;
    }

    const dragend:dragFunc = (e) => {
      e.target.style.border = 'none';
      emptyDom.style.border = 'none';
      h1Dom.innerHTML = '拖动你喜欢的图片到衣服上吧';
      h1Dom.style.color = 'black';
    }

    document.addEventListener('drag', drag);
    document.addEventListener('dragstart', dragstart);
    document.addEventListener('dragend', dragend);

    emptyDom.addEventListener('dragenter', () => {
      if(emptyDom.firstChild) {
        emptyDom.removeChild(emptyDom.firstChild)
      }
      h1Dom.innerHTML = name;
      h1Dom.style.color = 'red';
    });

    emptyDom.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
    })

    emptyDom.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault();
      e.target.appendChild(cloneRef.current);
    })

    return () => {
      document.removeEventListener('drag', drag);
      document.removeEventListener('dragstart', dragstart);
      document.removeEventListener('dragend', dragend);
    }
  }, []);

  return (
    <>
      <div className={styles['content-box']}>
        <section className={styles['show']}>
          <h1 ref={h1Ref}>拖动你喜欢的图片到衣服上吧</h1>
          <div className={styles['tshirt']}>
            <img src={imageTShirt} alt="t-shirt" />
            <div className={styles['empty']} ref={emptyRef}/>
          </div>
        </section>
        <section className={styles['list']}>
          {[image1, image2, image3, image4].map((item, index) => (
            <img src={item} alt={`image-${index}`} draggable={true} key={`image-${index}`}/>
          ))}
        </section>
      </div>
    </>
  );
}
