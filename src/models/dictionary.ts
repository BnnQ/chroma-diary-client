export class Dictionary<TKey, TValue> {
  private readonly _keys: TKey[] = [];
  private readonly _values: TValue[] = [];

  public get keys(): TKey[] {
    return this._keys;
  }

  public get values(): TValue[] {
    return this._values;
  }

  public get length(): number {
    return this._keys.length;
  }

  public get(key: TKey): TValue | null {
    const index = this._keys.indexOf(key);
    if (index === -1) {
      return null;
    }
    return this._values[index];
  }

  public set(key: TKey, value: TValue): void {
    const index = this._keys.indexOf(key);
    if (index === -1) {
      this._keys.push(key);
      this._values.push(value);
    } else {
      this._values[index] = value;
    }
  }

  public remove(key: TKey): void {
    const index = this._keys.indexOf(key);
    if (index === -1) {
      return;
    }
    this._keys.splice(index, 1);
    this._values.splice(index, 1);
  }

  public clear(): void {
    this._keys.splice(0, this._keys.length);
    this._values.splice(0, this._values.length);
  }

  public containsKey(key: TKey): boolean {
    return this._keys.indexOf(key) !== -1;
  }

  public containsValue(value: TValue): boolean {
    return this._values.indexOf(value) !== -1;
  }

  public forEach(callback: (key: TKey, value: TValue) => void): void {
    for (let i = 0; i < this._keys.length; i++) {
      callback(this._keys[i], this._values[i]);
    }
  }

  public getKeys(): TKey[] {
    return this._keys;
  }

  public getValues(): TValue[] {
    return this._values;
  }

  public toLookup(): Dictionary<TKey, TValue> {
    return this;
  }

}
