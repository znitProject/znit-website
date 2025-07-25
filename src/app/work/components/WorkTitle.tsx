import { useEffect, useRef } from 'react';

const WorkTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url(https://fonts.googleapis.com/css?family=Righteous);

      .the-goods {
        font-size: 100px;
        text-align: left;
        margin: 0px auto 0px 0px;
        text-transform: uppercase;
        font-weight: 700;
        font-family: Righteous;
        color:rgb(255, 255, 255);
        max-width: 1150px;
      }

      .the-goods span {
        text-shadow: -1px 0 0px #87CEEB, 0 1px 0px #6495ED, -2px 1px 0px #87CEEB, -1px 2px 0px #6495ED, -3px 2px 0px #87CEEB, -2px 3px 0px #6495ED, -4px 3px 0px #87CEEB, -3px 4px 0px #6495ED, -5px 4px 0px #87CEEB, -4px 5px 0px #6495ED, -6px 5px 15px #000000;
        display: inline-block;
        position: relative;
        padding: 0px 6px;
        transition: 0.8s;
        transform: rotateX( 0deg ) rotateY( 0deg ) rotateZ( 0deg );
      }

      .the-goods:hover {
        cursor: pointer;
      }

      .the-goods:hover span:nth-child(odd) {
        transform: rotateX( 10deg ) rotateY( 10deg ) rotateZ( -370deg );
      }

      .the-goods:hover span:nth-child(even) {
        transform: rotateX( 10deg ) rotateY( 10deg ) rotateZ( 370deg );
      }

      @media screen and (max-width: 1300px) {
        .the-goods {
          font-size: 140px;
        }
      }
      @media screen and (max-width: 1100px) {
        .the-goods {
          font-size: 120px;
        }
      }
      @media screen and (max-width: 900px) {
        .the-goods {
          font-size: 100px;
        }
      }
      @media screen and (max-width: 749px) {
        .the-goods {
          font-size: 76px;
        }
      }
      @media screen and (max-width: 600px) {
        .the-goods {
          font-size: 58px;
        }
      }
      @media screen and (max-width: 500px) {
        .the-goods {
          font-size: 42px;
        }
      }
    `;
    document.head.appendChild(style);

    const spanLetters = (element: HTMLElement) => {
      const words = element.innerText.split('');
      element.innerHTML = words.map((word, i) => `<span class="sl${i + 1} span-letter">${word}</span>`).join('');
    };

    if (titleRef.current) {
      spanLetters(titleRef.current);
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="the-goods" ref={titleRef}>WORKS</div>
  );
};

export default WorkTitle;