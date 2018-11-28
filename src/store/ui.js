/* eslint-disable quote-props */
import {
  action,
  useStrict,
  extendObservable,
  toJS,
} from 'mobx';

useStrict(true);

const initialState = {
  showFileDialog: false,
};

/**
 * Keeps the result from simulation to update different result views
 */
class Ui {
  constructor() {
    extendObservable(this, initialState);
  }

  showUiComponent = action((name, show) => {
    this[name] = show;
  });
}

export default Ui;
