import React, { useEffect, useRef } from "react";
import { drawStroke, clearCanvas, setCanvasSize } from "./utils/canvasUtils";
import { useSelector, useDispatch } from "react-redux";
import { beginStroke, endStroke, updateStroke } from "./actions";
import "./App.css";
import { ColorPanel } from "./shared/ColorPanel";
import { currentStrokeSelector } from "./store/rootReducer";

const HEIGHT = 768;
const WIDTH = 1024;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const isDrawing = useSelector<RootState>(
  //   (state) => !!state.currentStroke.points.length
  // );

  const currentStroke = useSelector(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;
  const dispatch = useDispatch();

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return {
      canvas,
      context: canvas?.getContext("2d"),
    };
  };

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke(offsetX, offsetY));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke(offsetX, offsetY));
  };

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }
    requestAnimationFrame(() =>
      drawStroke(context, currentStroke.points, currentStroke.color)
    );
  }, [currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, []);

  return (
    <div className='window'>
      <div className='title-bar'>
        <div className='title-bar-text'>Redux Paint</div>
        <div className='title-bar-controls'>
          <button aria-label='Close' />
        </div>
      </div>
      <ColorPanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
