import { useDispatch } from "react-redux";
import { setStrokeColor } from "../actions";

const COLORS = [
  "#000000",
  "#808080",
  "#c0c0c0",
  "#ffffff",
  "#eb3434",
  "#eb5f34",
  "#eb9c34",
  "#ebdc34",
  "#b4eb34",
  "#5feb34",
  "#34ebb7",
  "#34ebd9",
  "#34c0eb",
  "#3456eb",
  "#8c34eb",
  "#c334eb",
  "#eb34d3",
  "#eb34a2",
  "#eb3474",
];

export const ColorPanel = () => {
  const dispatch = useDispatch();

  const onColorChange = (color: string) => {
    dispatch(setStrokeColor(color));
  };

  return (
    <div className='window colors-panel'>
      <div className='title-bar'>
        <div className='title-bar-text'>Colors</div>
      </div>
      <div className='window-body colors'>
        {COLORS.map((color: string) => (
          <div
            key={color}
            onClick={() => {
              onColorChange(color);
            }}
            className='color'
            style={{
              backgroundColor: color,
            }}></div>
        ))}
      </div>
    </div>
  );
};
