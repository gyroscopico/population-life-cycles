import * as C from '../constants';

// A Storage uses a masterKey to persist more than one
// localStorage key value pairs.
export default class Storage {
  constructor(input) {
    if (!input) {
      ga('send', 'event', 'Error', 'storage.js', C.ERROR.INVALID_INPUT);
      throw new Error(C.ERROR.INVALID_INPUT);
    }

    if (!window || !window.localStorage) {
      ga('send', 'event', 'Error', 'storage.js',
        C.ERROR.LOCAL_STORAGE_NOT_SUPPORTED);
      throw new Error(C.LOCAL_STORAGE_NOT_SUPPORTED);
    }

    const {
      masterKey,
    } = input;

    this.masterKey = masterKey;

    this.existsKey = `${masterKey}_exists`;
    this.lengthKey = `${masterKey}_length`;

    this.exists = this._doesExist();
    this.length = this._getLength();
  }

  // Has the master key ever been used to store data, even
  // if now it may no longer have any pairs using its master key.
  _doesExist() {
    return window.localStorage.getItem(this.existsKey) !== null;
  }

  _getLength() {
    if (this.exists) {
      return parseInt(window.localStorage.getItem(this.lengthKey), 10);
    }

    return 0;
  }

  // Append a new member to the storage array.
  setItem(value) {
    // The currently available index is equal to the length (starts with 0).
    const key = `${this.masterKey}${this.length}`;
    window.localStorage.setItem(
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    );

    // Increment the length now that a new array member has been added.
    this.length = this.length + 1;
    window.localStorage.setItem(this.lengthKey, this.length);

    // Update the exists property.
    this.exists = true;
    window.localStorage.setItem(this.existsKey, this.exists);
  }

  // Return localStorage total size in Kilobytes.
  totalSize() {
    return Math.round(JSON.stringify(window.localStorage).length / 1024);
  }
}
