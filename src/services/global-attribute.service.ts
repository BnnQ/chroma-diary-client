import {HtmlAttribute} from "../models/html-attribute";
import {Inject, Injectable} from "@angular/core";
import {ObservableArray} from "../models/observable-array";
import {Dictionary} from "../models/abstractions/dictionary";
import {SERVICE_IDENTIFIERS} from "../app/app.config";

export type AttributeUpdateHandler = (attribute : HtmlAttribute) => void;

@Injectable({providedIn: 'root'})
export class GlobalAttributeService {
  private readonly attributeUpdateHandlers : AttributeUpdateHandler[] = [];
  private readonly attributes : ObservableArray<HtmlAttribute>;

  constructor(@Inject(SERVICE_IDENTIFIERS.AttributeDefinition) attributeDefinition : Dictionary<string, boolean>) {
    this.attributeUpdateHandlers = [];

    this.attributes = new ObservableArray(Object.entries(attributeDefinition).map(([name, value], index) => {
      const attribute = new HtmlAttribute(name, value);
      this.notifyAttributeUpdateHandlers(attribute);
      return attribute;
    }));

    this.attributes.getItemUpdates().subscribe(attribute => {
      if (attribute.value)
        this.notifyAttributeUpdateHandlers(attribute.value);
    });

  }

  getAttribute(name : string) : HtmlAttribute | undefined {
    return this.attributes.findItem(item => item?.name === name);
  }

  setAttribute(name : string, value : boolean) {
    this.attributes.findAndSetItem(item => item?.name === name, new HtmlAttribute(name, value));
  }

  toggleAttribute(name : string) {
    const attribute = this.getAttribute(name);
    if (attribute) {
      this.setAttribute(name, !attribute.value);
    }
  }

  registerAttributeUpdateHandler(handler : AttributeUpdateHandler) {
    this.attributeUpdateHandlers.push(handler);

    for (let i = 0; i < this.attributes.getLength(); i++) {
      const attribute = this.attributes.getItem(i);
      handler(attribute!);
    }
  }

  unregisterAttributeUpdateHandler(handler : AttributeUpdateHandler) {
    const index = this.attributeUpdateHandlers.indexOf(handler);
    if (index > -1) {
      this.attributeUpdateHandlers.splice(index, 1);
    }
  }

  notifyAttributeUpdateHandlers(attribute : HtmlAttribute) {
    this.attributeUpdateHandlers.forEach(handler => {
      handler(attribute);
    });
  }

}
