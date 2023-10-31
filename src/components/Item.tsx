import { getLetter, getRandomColor, showFormattedDate } from '../utils/helper';

interface ItemProps {
  title: string;
  body: string;
  createdAt: string;
}

const Item = ({ title, body, createdAt }: ItemProps) => {
  const color = getRandomColor();
  const letter = getLetter(title);

  return (
    <div className="item">
      <div className="item__img">
        <div className="default" style={{ backgroundColor: color }}>
          <span style={{ color }} className="mini-box">
            {letter}
          </span>
        </div>
      </div>
      <div className="item__text">
        <h3>{title}</h3>
        <span>{showFormattedDate(createdAt)}</span>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Item;
