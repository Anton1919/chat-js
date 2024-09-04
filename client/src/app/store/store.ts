import { makeAutoObservable } from 'mobx';

export class MainStore {
  constructor() {
    makeAutoObservable(this);
  }
}
