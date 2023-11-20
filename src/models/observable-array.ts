import {BehaviorSubject, map, merge, switchMap} from "rxjs";
import {ObservableItem} from "./observable-item";

export class ObservableArray<T> {
  private items = new BehaviorSubject<ObservableItem<T>[]>([]);
  public readonly items$ = this.items.asObservable();

  constructor(items: T[]) {
    const observableItems = items.map((item, index) => new ObservableItem<T>(index, item));
    this.items.next(observableItems);
  }

  getLength() : number {
    return this.items.getValue().length;
  }

  getItem(id: number): T | undefined {
    const item = this.items.getValue().find(item => item.id === id);
    return item?.getValue();
  }

  findItem(predicate: (item: T | undefined) => boolean): T | undefined {
    const item = this.items.getValue().find(item => predicate(item.getValue()));
    return item?.getValue();
  }


  setItem(id: number, newValue: T) {
    const item = this.items.getValue().find(item => item.id === id);
    if (item) {
      item.updateValue(newValue);
    }
  }

  findAndSetItem(predicate: (item: T | undefined) => boolean, newValue: T) {
    const item = this.items.getValue().find(item => predicate(item.getValue()));
    if (item) {
      item.updateValue(newValue);
    }
  }

  getItemUpdates() {
    return this.items$.pipe(
      switchMap(items => {
        const observables = items.map(item => item.value$.pipe(
          map(value => ({ id: item.id, value }))
        ));

        return merge(...observables);
      })
    );
  }

}
