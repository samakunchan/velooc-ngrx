import { CanvasActions, CanvasActionTypes } from './canvas.actions';


export const canvasFeatureKey = 'canvas';

export interface MyCanvasState {
  url: string;
  loaded: boolean;
  showButton: boolean;
}

export const initialState: MyCanvasState = {
  url: undefined,
  loaded: false,
  showButton: false
};

export function canvasReducer(state = initialState, action: CanvasActions): MyCanvasState {
  switch (action.type) {
    case CanvasActionTypes.ClearCanvas:
      return initialState;
    case CanvasActionTypes.ShowClearCanvasButton:
      return {
        ...state,
        showButton: true,
      };
    case CanvasActionTypes.StoreCanvas:
      return {
        ...state,
        url: action.payload.url,
        loaded: true
      };
    default:
      return state;
  }
}
