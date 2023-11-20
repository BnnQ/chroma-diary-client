import {BehaviorSubject} from "rxjs";

export class ObservableItem<T> {
  private value = new BehaviorSubject<T | undefined>(undefined);
  public readonly value$ = this.value.asObservable();

  constructor(public id: number, value: T) {
    this.value.next(value);
  }

  getValue(): T | undefined {
    return this.value.getValue();
  }

  updateValue(newValue: T) {
    this.value.next(newValue);
  }

}
